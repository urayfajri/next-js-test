import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/app/services/clsxm';

enum ButtonVariant {
  'primary',
  'outline',
  'dark',
  'graynoborder',
  'light',
  'red',
  'redLight',
  'redDark',
  'redOutline',
  'danger',
  'green',
  'redGray',
  'lightnoborder',
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center rounded px-4 py-2',
          'focus:outline-none focus-visible:ring',
          'transition-colors duration-75',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-redPrimary text-white',
              'border border-redPrimary',
              'hover:bg-redPrimary hover:text-white',
              'active:bg-redPrimary',
              'disabled:bg-redPrimary disabled:hover:bg-redPrimary',
            ],
            variant === 'outline' && [
              'text-redPrimary',
              'border border-redPrimary',
              'hover:bg-white active:bg-white disabled:bg-white',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'lightnoborder' && [
              'text-dark bg-white ',
              'hover:text-dark hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],

            variant === 'graynoborder' && [
              'text-dark bg-gray-200 ',
              'hover:text-dark hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
            variant === 'light' && [
              'border-gray-400 bg-white text-redDark shadow-md',
              'hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'red' && [
              'border-gray-400 bg-redPrimary text-white shadow-md',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'redLight' && [
              'border-redSalmon bg-redSalmon text-white',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'redGray' && [
              'bg-[#f2d5d5] text-redDark',
              'active:bg-[#FFEFFF] active:text-redDark',
              'disabled:bg-gray-200',
            ],
            variant === 'redDark' && [
              'border border-redDark bg-redDark text-white',
              'active:bg-white/80 active:text-redDark',
              'disabled:bg-gray-200 disabled:border-gray-200',
            ],
            variant === 'redOutline' && [
              'border border-redSecondary bg-white text-redSecondary',
              'active:bg-redSecondary active:text-white',
              'disabled:bg-gray-200',
            ],
            variant === 'danger' && [
              'border border-danger bg-danger text-white',
              'active:bg-white/80 active:text-danger',
              'disabled:bg-gray-200',
            ],
            variant === 'green' && [
              'border border-green-500 bg-green-500 text-white',
              'active:bg-white/80 active:text-green-500',
              'disabled:bg-gray-200',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-redPrimary': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
