import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import moment from 'moment';
import * as React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/app/components/ui/button/Button';
import Modal from '@/app/components/ui/custom-modal/Modal';
import Input from '@/app/components/ui/input/Input';
import InputOption from '@/app/components/ui/input-option/InputOption';
import { SALE_TOAST } from '@/app/constants/enums/sale/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { ApiReturn } from '@/app/types/common/type';
import { Customer } from '@/app/types/model/customer/type';
import { Item } from '@/app/types/model/item/type';
import { Sale, SaleRequest } from '@/app/types/model/sale/type';
type Props = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  sale?: Sale;
  customerEntities: Customer[];
  itemEntitites: Item[];
  refetch?: () => void;
};

const AddSaleModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  sale,
  customerEntities,
  itemEntitites,
  refetch,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const fetchDetailData = async (sale: Sale) => {
    const query = `/sales/${sale?.docno}`;
    const response = await axiosClient.get<ApiReturn<Sale>>(query);
    return response.data;
  };

  //#region //*============ Form ===========
  const defaultValues: SaleRequest = {
    docno: sale ? sale.docno : undefined,
    docdate: sale ? sale.docdate : moment().format('YYYY-MM-DD'),
    customerid: sale ? sale.customerid : 0,
    items: [
      {
        itemid: 0,
      },
    ],
  };

  const methods = useForm<SaleRequest>({
    mode: 'onTouched',
    defaultValues: defaultValues,
  });

  const { control, handleSubmit, reset, setValue } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  React.useEffect(() => {
    if (sale) {
      fetchDetailData(sale).then((data) => {
        const items = data.data.sales_detail
          ? data.data.sales_detail.map((data) => ({
              itemid: data.itemid,
              qty: data.qty,
              unitprice: data.unitprice,
            }))
          : [{ itemid: 0 }];

        setValue('items', items);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sale, isOpen]);

  const onSubmit: SubmitHandler<SaleRequest> = (data) => {
    setIsButtonDisabled(true);

    data.customerid = Number(data.customerid);
    data.items = data.items.map((item) => ({
      itemid: Number(item.itemid),
      qty: Number(item.qty),
      unitprice: Number(item.unitprice),
    }));

    if (sale) {
      toast.promise(
        axiosClient
          .put(`/sales/${sale.docno}`, data)
          .then(() => {
            reset();
            setIsOpen(false);
            setIsButtonDisabled(false);
            if (refetch) refetch();
          })
          .catch((error) => {
            // Re-throw error to let toast.promise handle it
            toast.error(error.response.data.error);
            setIsButtonDisabled(false);
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: SALE_TOAST.EDIT_SUCCESS,
          error: SALE_TOAST.EDIT_ERROR,
        }
      );
    } else {
      toast.promise(
        axiosClient
          .post('/sales', data)
          .then(() => {
            reset();
            setIsOpen(false);
            setIsButtonDisabled(false);
            if (refetch) refetch();
          })
          .catch((error) => {
            // Re-throw error to let toast.promise handle it
            toast.error(error.response.data.error);
            setIsButtonDisabled(false);
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: SALE_TOAST.ADD_SUCCESS,
          error: SALE_TOAST.ADD_ERROR,
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
        {sale ? 'Update' : 'Add'} Sale
      </h3>
      <FormProvider {...methods}>
        <div className='space-y-2 rounded-2xl border-opacity-20 px-5 py-3'>
          <div className='grid md:grid-cols-1 md:gap-5'>
            <div>
              <Input
                label='Doc Date'
                name='docdate'
                type='date'
                variant='secondary'
                required
                validation={{
                  required: 'Doc Date is required',
                }}
              />
              <InputOption
                label='Customer'
                name='customerid'
                variant='secondary'
                required
                validation={{
                  required: 'Customer is required',
                }}
              >
                {customerEntities?.map((data) => (
                  <option value={data.customerid} key={data.customerid}>
                    {data.custname}
                  </option>
                ))}
              </InputOption>
            </div>
            <div className='grid md:grid-cols-1 md:gap-5'>
              <div className='md:pb-3'>
                <div className='flex items-center justify-between pb-2'>
                  <span className='rounded-xl bg-[#c2d7f9] py-0.5 px-[13px] text-sm text-blue-600'>
                    Item Information
                  </span>
                  <button
                    type='button'
                    className='bg-blue-500 text-white px-2 py-1 rounded-md flex items-center gap-1'
                    onClick={() => append({ itemid: 0 })}
                  >
                    <PlusIcon className='w-4 h-4' /> Add Item
                  </button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className='border p-3 rounded-lg mb-2'>
                    <InputOption
                      label='Item'
                      name={`items.${index}.itemid`}
                      variant='secondary'
                      required
                      validation={{
                        required: 'Item is required',
                      }}
                    >
                      {itemEntitites?.map((data) => (
                        <option value={data.itemid} key={data.itemid}>
                          {data.itemname}
                        </option>
                      ))}
                    </InputOption>

                    <div className='grid md:grid-cols-2 md:gap-5'>
                      <Input
                        label='Qty'
                        name={`items.${index}.qty`}
                        type='number'
                        variant='secondary'
                        required
                        validation={{
                          required: 'Item Qty is required',
                        }}
                      />
                      <Input
                        label='Price'
                        name={`items.${index}.unitprice`}
                        type='number'
                        variant='secondary'
                        required
                        validation={{
                          required: 'Item Price is required',
                        }}
                      />
                    </div>

                    {fields.length > 1 && (
                      <button
                        type='button'
                        className='bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1 mt-2'
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className='w-4 h-4' /> Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-10 flex justify-end'>
          <Button
            size='sm'
            variant='primary'
            startIcon={sale ? <PencilIcon /> : <PlusIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={isButtonDisabled}
          >
            {sale ? 'Update' : 'Add'}
          </Button>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default AddSaleModal;
