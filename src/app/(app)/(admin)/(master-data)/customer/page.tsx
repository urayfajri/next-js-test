'use client';

import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import AddCustomerModal from '@/app/(app)/(admin)/(master-data)/customer/components/AddModal';
import Alert from '@/app/components/alert/Alert';
import ComponentCard from '@/app/components/common/ComponentCard';
import PageBreadcrumb from '@/app/components/common/PageBreadCrumb';
import CustomTable from '@/app/components/tables/CustomTable';
import Button from '@/app/components/ui/button/Button';
import SpinnerLoading from '@/app/components/ui/loading/SpinnerLoading';
import {
  CUSTOMER_API,
  CUSTOMER_TOAST,
} from '@/app/constants/enums/customer/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { ApiReturnPagination } from '@/app/types/common/type';
import { DataTableColumn } from '@/app/types/data-table/type';
import { Customer } from '@/app/types/model/customer/type';

export default function MasterDataCustomer() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] =
    React.useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<
    Customer | undefined
  >(undefined);

  const {
    data: apiResponse,
    isLoading,
    mutate,
  } = useSWR<ApiReturnPagination<Customer[]>>(CUSTOMER_API.BASE);

  const handleRefetch = async () => {
    await mutate(); // Revalidate data
  };

  const customer = apiResponse?.data;

  // Define table columns
  const columns: DataTableColumn<Customer>[] = [
    {
      key: 'custname',
      header: 'Customer Name',
      render: (row: Customer) => (
        <div className='flex items-center gap-3'>
          <span className='font-medium'>{row.custname}</span>
        </div>
      ),
    },
    {
      key: 'customerid',
      header: 'Action',
      render: (row: Customer) => (
        <div className='flex items-center gap-5'>
          <Button
            size='sm'
            variant='warning'
            startIcon={<PencilIcon />}
            onClick={() => {
              setSelectedCustomer(row);
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
              setSelectedCustomer(row);
              setIsAlertDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (customer: Customer) => {
    toast.promise(
      axiosClient.delete(`/customers/${customer.customerid}`).then(() => {
        setIsAlertDeleteOpen(false);
        handleRefetch();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: CUSTOMER_TOAST.DELETE_SUCCESS,
        error: CUSTOMER_TOAST.DELETE_ERROR,
      }
    );
  };

  return (
    <>
      {isAddModalOpen && (
        <AddCustomerModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          customer={selectedCustomer}
          refetch={handleRefetch}
        />
      )}
      {selectedCustomer && (
        <Alert
          message={`Are you want to delete Customer ${selectedCustomer.custname} ?`}
          isOpen={isAlertDeleteOpen}
          setIsOpen={setIsAlertDeleteOpen}
          onClickYes={() => handleDelete(selectedCustomer)}
        />
      )}

      <PageBreadcrumb pageTitle='Customer' />
      {!isLoading && customer ? (
        <div className='space-y-6'>
          <ComponentCard title='Customer Table'>
            <Button
              size='sm'
              variant='primary'
              startIcon={<PlusIcon />}
              onClick={() => {
                setSelectedCustomer(undefined);
                setIsAddModalOpen(true);
              }}
            >
              Add
            </Button>
            <CustomTable columns={columns} data={customer.data} />
          </ComponentCard>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
}
