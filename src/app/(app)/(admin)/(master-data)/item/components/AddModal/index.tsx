import { PencilIcon, PlusIcon } from 'lucide-react';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiAlignItemHorizontalCenterFill } from 'react-icons/ri';

import Button from '@/app/components/ui/button/Button';
import Modal from '@/app/components/ui/custom-modal/Modal';
import Input from '@/app/components/ui/input/Input';
import { ITEM_TOAST } from '@/app/constants/enums/item/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { Item, ItemRequest } from '@/app/types/model/item/type';

type Props = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  item?: Item;
  refetch?: () => void;
};

const AddItemModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  item,
  refetch,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  //#region //*============ Form ===========
  const defaultValues: ItemRequest = {
    itemid: item ? item.itemid : undefined,
    itemname: item ? item.itemname : '',
  };

  const methods = useForm<ItemRequest>({
    mode: 'onTouched',
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ItemRequest> = (data) => {
    setIsButtonDisabled(true);
    if (item) {
      toast.promise(
        axiosClient.put(`/items/${item.itemid}`, data).then(() => {
          reset();
          setIsOpen(false);
          setIsButtonDisabled(false);
          if (refetch) refetch();
        }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: ITEM_TOAST.EDIT_SUCCESS,
          error: ITEM_TOAST.EDIT_ERROR,
        }
      );
    } else {
      toast.promise(
        axiosClient.post('/items', data).then(() => {
          reset();
          setIsOpen(false);
          setIsButtonDisabled(false);
          if (refetch) refetch();
        }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: ITEM_TOAST.ADD_SUCCESS,
          error: ITEM_TOAST.ADD_ERROR,
        }
      );
    }
  };

  //#endregion  //*======== Form ===========

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='min-w-full lg:min-w-[50rem]'
    >
      <h3 className='mb-2 text-center font-bold text-blue-500'>
        {item ? 'Update' : 'Add'} Item
      </h3>
      <FormProvider {...methods}>
        <div className='space-y-2 rounded-2xl border-opacity-20 px-5 py-3'>
          <div className='grid md:grid-cols-1 md:gap-5'>
            <div>
              <Input
                label='Item Name'
                name='itemname'
                type='text'
                variant='secondary'
                required
                validation={{
                  required: 'Item Name is required',
                }}
                icon={
                  <RiAlignItemHorizontalCenterFill
                    className='h-5 w-5'
                    aria-hidden='true'
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className='mt-10 flex justify-end'>
          <Button
            size='sm'
            variant='primary'
            startIcon={item ? <PencilIcon /> : <PlusIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={isButtonDisabled}
          >
            {item ? 'Update' : 'Add'}
          </Button>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default AddItemModal;
