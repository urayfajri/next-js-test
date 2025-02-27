import { PencilIcon, PlusIcon } from 'lucide-react';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsPeople } from 'react-icons/bs';

import Button from '@/app/components/ui/button/Button';
import Modal from '@/app/components/ui/custom-modal/Modal';
import Input from '@/app/components/ui/input/Input';
import { CUSTOMER_TOAST } from '@/app/constants/enums/customer/enum';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { Customer, CustomerRequest } from '@/app/types/model/customer/type';
type Props = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  customer?: Customer;
  refetch?: () => void;
};

const AddCustomerModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  customer,
  refetch,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  //#region //*============ Form ===========
  const defaultValues: CustomerRequest = {
    customerid: customer ? customer.customerid : undefined,
    custname: customer ? customer.custname : '',
  };

  const methods = useForm<CustomerRequest>({
    mode: 'onTouched',
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<CustomerRequest> = (data) => {
    setIsButtonDisabled(true);
    if (customer) {
      toast.promise(
        axiosClient.put(`/customers/${customer.customerid}`, data).then(() => {
          reset();
          setIsOpen(false);
          setIsButtonDisabled(false);
          if (refetch) refetch();
        }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: CUSTOMER_TOAST.EDIT_SUCCESS,
          error: CUSTOMER_TOAST.EDIT_ERROR,
        }
      );
    } else {
      toast.promise(
        axiosClient.post('/customers', data).then(() => {
          reset();
          setIsOpen(false);
          setIsButtonDisabled(false);
          if (refetch) refetch();
        }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: CUSTOMER_TOAST.ADD_SUCCESS,
          error: CUSTOMER_TOAST.ADD_ERROR,
        }
      );
    }
  };

  //#endregion  //*======== Form ===========

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='min-w-full lg:min-w-[60rem]'
    >
      <h3 className='mb-2 text-center font-bold text-redDark'>
        {customer ? 'Update' : 'Add'} Customer
      </h3>
      <FormProvider {...methods}>
        <div className='space-y-2 rounded-2xl border-opacity-20 px-5 py-3'>
          <div className='grid md:grid-cols-1 md:gap-5'>
            <div>
              <Input
                label='Customer Name'
                name='custname'
                type='text'
                variant='secondary'
                required
                validation={{
                  required: 'Customer Name is required',
                }}
                icon={<BsPeople className='h-5 w-5' aria-hidden='true' />}
              />
            </div>
          </div>
        </div>
        <div className='mt-10 flex justify-end'>
          <Button
            size='sm'
            variant='primary'
            startIcon={customer ? <PencilIcon /> : <PlusIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={isButtonDisabled}
          >
            {customer ? 'Update' : 'Add'}
          </Button>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default AddCustomerModal;
