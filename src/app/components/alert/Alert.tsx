import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { Fragment } from 'react';
import { BsQuestionSquareFill } from 'react-icons/bs';

import Button from '@/app/components/ui/button/Button';

type Props = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  onClickYes?: () => void;
  onClickNo?: () => void;
  message: string;
  middleText?: string;
  disableIcon?: boolean;
};

const Alert: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onClickYes,
  onClickNo,
  message,
  disableIcon,
}) => {
  const [isDisableButton, setIsDisableButton] = React.useState(false);

  React.useEffect(() => {
    setIsDisableButton(false);
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-[3000] overflow-y-auto'
        onClose={() => {
          setIsOpen(false);
          setIsDisableButton(false);
          onClickNo ? onClickNo() : undefined;
        }}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#E2F1FF] bg-opacity-50 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block transform overflow-hidden rounded-lg bg-white pb-10 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'>
              <div className='bg-blue-500 px-5 py-2 text-white'>
                <h4>Confirmation</h4>
              </div>
              <div className='mt-5 flex items-center justify-center space-x-5 p-2'>
                {!disableIcon && (
                  <BsQuestionSquareFill
                    className='h-8 w-8 text-redDark'
                    aria-hidden='true'
                  />
                )}
                <p className='font-semibold text-blue-600'>{message}</p>
              </div>
              <div className='mt-5 flex items-center justify-center space-x-5'>
                <div>
                  <Button
                    disabled={isDisableButton}
                    variant='primary'
                    size='sm'
                    onClick={() => {
                      onClickYes ? onClickYes() : undefined;
                      setIsDisableButton(true);
                    }}
                  >
                    Yes
                  </Button>
                </div>
                <div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setIsOpen(false);
                      setIsDisableButton(false);
                      onClickNo ? onClickNo() : undefined;
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Alert;
