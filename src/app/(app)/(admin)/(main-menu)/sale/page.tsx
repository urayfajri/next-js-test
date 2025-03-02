'use client';

import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import AddSaleModal from '@/app/(app)/(admin)/(main-menu)/sale/components/AddModal';
import DetailSaleModal from '@/app/(app)/(admin)/(main-menu)/sale/components/DetailModal';
import Alert from '@/app/components/alert/Alert';
import ComponentCard from '@/app/components/common/ComponentCard';
import PageBreadcrumb from '@/app/components/common/PageBreadCrumb';
import CustomTable from '@/app/components/tables/CustomTable';
import Button from '@/app/components/ui/button/Button';
import SpinnerLoading from '@/app/components/ui/loading/SpinnerLoading';
import { CUSTOMER_API } from '@/app/constants/enums/customer/enum';
import { ITEM_API } from '@/app/constants/enums/item/enum';
import { SALE_API, SALE_TOAST } from '@/app/constants/enums/sale/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import withAuth from '@/app/hooks/withAuth';
import axiosClient from '@/app/services/axios';
import { ApiReturnPagination } from '@/app/types/common/type';
import { DataTableColumn } from '@/app/types/data-table/type';
import { Customer } from '@/app/types/model/customer/type';
import { Item } from '@/app/types/model/item/type';
import { Sale } from '@/app/types/model/sale/type';

function MainMenuSale() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] =
    React.useState<boolean>(false);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] =
    React.useState<boolean>(false);
  const [selectedSale, setSelectedSale] = React.useState<Sale | undefined>(
    undefined
  );

  const {
    data: apiResponse,
    isLoading,
    mutate,
  } = useSWR<ApiReturnPagination<Sale[]>>(SALE_API.BASE);

  const { data: apiCustomerResponse } = useSWR<ApiReturnPagination<Customer[]>>(
    CUSTOMER_API.BASE
  );
  const { data: apiItemResponse } = useSWR<ApiReturnPagination<Item[]>>(
    ITEM_API.BASE
  );

  const customerEntities = apiCustomerResponse?.data?.data ?? [];
  const itemEntities = apiItemResponse?.data?.data ?? [];

  const handleRefetch = async () => {
    await mutate(); // Revalidate data
  };

  const sale = apiResponse?.data;

  // Define table columns
  const columns: DataTableColumn<Sale>[] = [
    {
      key: 'docdate',
      header: 'Doc Date',
      render: (row: Sale) => (
        <div className='flex items-center gap-3'>
          <span className='font-medium'>
            {moment(row.docdate).format('MMMM D, YYYY')}
          </span>
        </div>
      ),
    },
    {
      key: 'customerid',
      header: 'Customer',
      render: (row: Sale) => (
        <div className='flex items-center gap-3'>
          <span className='font-medium'>
            {row.customer ? row.customer.custname : '-'}
          </span>
        </div>
      ),
    },
    {
      key: 'docno',
      header: 'Action',
      render: (row: Sale) => (
        <div className='flex items-center gap-5'>
          <Button
            size='sm'
            variant='primary'
            startIcon={<EyeIcon />}
            onClick={() => {
              setSelectedSale(row);
              setIsDetailModalOpen(true);
            }}
          >
            Detail
          </Button>
          <Button
            size='sm'
            variant='warning'
            startIcon={<PencilIcon />}
            onClick={() => {
              setSelectedSale(row);
              setIsAddModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size='sm'
            variant='danger'
            startIcon={<TrashIcon />}
            onClick={() => {
              setSelectedSale(row);
              setIsAlertDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (sale: Sale) => {
    toast.promise(
      axiosClient.delete(`/sales/${sale.docno}`).then(() => {
        setIsAlertDeleteOpen(false);
        handleRefetch();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: SALE_TOAST.DELETE_SUCCESS,
        error: SALE_TOAST.DELETE_ERROR,
      }
    );
  };

  return (
    <>
      {isAddModalOpen && (
        <AddSaleModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          sale={selectedSale}
          customerEntities={customerEntities}
          itemEntitites={itemEntities}
          refetch={handleRefetch}
        />
      )}
      {isDetailModalOpen && selectedSale && (
        <DetailSaleModal
          isOpen={isDetailModalOpen}
          setIsOpen={setIsDetailModalOpen}
          sale={selectedSale}
        />
      )}
      {selectedSale && (
        <Alert
          message='Are you want to delete selected sale?'
          isOpen={isAlertDeleteOpen}
          setIsOpen={setIsAlertDeleteOpen}
          onClickYes={() => handleDelete(selectedSale)}
        />
      )}

      <PageBreadcrumb pageTitle='Sale' />
      {!isLoading && sale ? (
        <div className='space-y-6'>
          <ComponentCard title='Sale Table'>
            <Button
              size='sm'
              variant='primary'
              startIcon={<PlusIcon />}
              onClick={() => {
                setSelectedSale(undefined);
                setIsAddModalOpen(true);
              }}
            >
              Add
            </Button>
            <CustomTable columns={columns} data={sale.data} />
          </ComponentCard>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
}

export default withAuth(MainMenuSale);
