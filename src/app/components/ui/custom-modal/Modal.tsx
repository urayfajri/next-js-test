import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { Fragment } from 'react';
import { ImCross } from 'react-icons/im';

import Button from '@/components/buttons/Button';

import clsxm from '@/app/services/clsxm';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  hiddenCloseButton?: boolean;
  variant?: 'primary' | 'secondary';
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  className,
  hiddenCloseButton,
  variant = 'primary',
}) => {
  const cancelButtonRef = React.useRef(null);
  return variant === 'primary' ? (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-[3000] overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
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
            <div
              className={clsxm(
                'relative inline-block w-full transform overflow-hidden rounded-lg bg-white p-10 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg sm:align-middle',
                className
              )}
            >
              {!hiddenCloseButton && (
                <div className='absolute right-1 top-1'>
                  <Button
                    className='px-2 py-2'
                    variant='primary'
                    onClick={() => setIsOpen(false)}
                  >
                    <ImCross className='h-5 w-5' aria-hidden='true' />
                  </Button>
                </div>
              )}

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  ) : (
    <>
      {isOpen ? (
        <>
          <div
            className={clsxm(
              'fixed inset-0 z-[3000] flex animate-scaleUp items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none',
              className
            )}
          >
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {!hiddenCloseButton && (
                  <div className='absolute -right-5 -top-5 z-[3000]'>
                    <Button
                      className='rounded-xl px-2 py-2'
                      variant='primary'
                      onClick={() => setIsOpen(false)}
                    >
                      <ImCross className='h-5 w-5' aria-hidden='true' />
                    </Button>
                  </div>
                )}
                <div className='relative m-3 flex flex-col p-6'>{children}</div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-[2000] bg-black opacity-25'></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
