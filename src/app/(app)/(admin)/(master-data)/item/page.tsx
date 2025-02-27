'use client';

import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import AddItemModal from '@/app/(app)/(admin)/(master-data)/item/components/AddModal';
import Alert from '@/app/components/alert/Alert';
import ComponentCard from '@/app/components/common/ComponentCard';
import PageBreadcrumb from '@/app/components/common/PageBreadCrumb';
import CustomTable from '@/app/components/tables/CustomTable';
import Button from '@/app/components/ui/button/Button';
import SpinnerLoading from '@/app/components/ui/loading/SpinnerLoading';
import { ITEM_API, ITEM_TOAST } from '@/app/constants/enums/item/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { ApiReturnPagination } from '@/app/types/common/type';
import { DataTableColumn } from '@/app/types/data-table/type';
import { Item } from '@/app/types/model/item/type';

export default function MasterDataItem() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] =
    React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>(
    undefined
  );

  const {
    data: apiResponse,
    isLoading,
    mutate,
  } = useSWR<ApiReturnPagination<Item[]>>(ITEM_API.BASE);

  const handleRefetch = async () => {
    await mutate(); // Revalidate data
  };

  const item = apiResponse?.data;

  // Define table columns
  const columns: DataTableColumn<Item>[] = [
    {
      key: 'itemname',
      header: 'Item Name',
      render: (row: Item) => (
        <div className='flex items-center gap-3'>
          <span className='font-medium'>{row.itemname}</span>
        </div>
      ),
    },
    {
      key: 'itemid',
      header: 'Action',
      render: (row: Item) => (
        <div className='flex items-center gap-5'>
          <Button
            size='sm'
            variant='warning'
            startIcon={<PencilIcon />}
            onClick={() => {
              setSelectedItem(row);
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
              setSelectedItem(row);
              setIsAlertDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (item: Item) => {
    toast.promise(
      axiosClient.delete(`/items/${item.itemid}`).then(() => {
        setIsAlertDeleteOpen(false);
        handleRefetch();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: ITEM_TOAST.DELETE_SUCCESS,
        error: ITEM_TOAST.DELETE_ERROR,
      }
    );
  };

  return (
    <>
      {isAddModalOpen && (
        <AddItemModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          item={selectedItem}
          refetch={handleRefetch}
        />
      )}
      {selectedItem && (
        <Alert
          message={`Are you want to delete Item ${selectedItem.itemname} ?`}
          isOpen={isAlertDeleteOpen}
          setIsOpen={setIsAlertDeleteOpen}
          onClickYes={() => handleDelete(selectedItem)}
        />
      )}

      <PageBreadcrumb pageTitle='Item' />
      {!isLoading && item ? (
        <div className='space-y-6'>
          <ComponentCard title='Item Table'>
            <Button
              size='sm'
              variant='primary'
              startIcon={<PlusIcon />}
              onClick={() => {
                setSelectedItem(undefined);
                setIsAddModalOpen(true);
              }}
            >
              Add
            </Button>
            <CustomTable columns={columns} data={item.data} />
          </ComponentCard>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
}
