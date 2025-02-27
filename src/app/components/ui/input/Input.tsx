import moment from 'moment';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import clsxm from '@/app/services/clsxm';

type Props = {
  label?: string;
  name: string;
  type: React.HTMLInputTypeAttribute | 'tag';
  icon?: JSX.Element;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  validation?: RegisterOptions;
  accept?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  required?: boolean;
  disabled?: boolean;
  leftAddOn?: boolean;
  leftAddOnText?: string;
  className?: string;
  clickOnly?: boolean;
  placeholder?: string;
  numberOnly?: boolean;
  numberMustBiggerThanZero?: boolean;
};

const Input: React.FC<Props> = ({
  label,
  name,
  type,
  icon,
  onClick,
  onChange,
  validation,
  accept,
  variant = 'primary',
  required,
  disabled,
  leftAddOn,
  leftAddOnText = '-',
  className,
  clickOnly = false,
  placeholder,
  numberOnly,
  numberMustBiggerThanZero,
  // value
}) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    watch,
    resetField,
  } = useFormContext();
  const watchValue = watch(name);
  const totalCharOnLeftAddOnText = leftAddOnText.length;

  React.useEffect(() => {
    if (!getValues(name) && type === 'date') {
      setValue(name, moment(new Date()).format('yyyy-MM-DD'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (Number(watchValue) == 0 && numberMustBiggerThanZero && numberOnly) {
      resetField(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue]);

  return (
    <div className={clsxm('my-2', className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsxm(
            'px-1 text-sm font-medium transition-all duration-200 ease-in-out',
            disabled ? 'bg-transparent' : 'bg-white',
            errors[name]
              ? 'text-red-500'
              : variant === 'primary'
              ? 'text-gray-900'
              : variant === 'secondary'
              ? 'text-blue-500'
              : 'text-[#afc8df]'
          )}
        >
          {label + (required ? ' *' : '')}
        </label>
      )}
      <div
        className={clsxm(
          'group relative rounded-md border-2 px-3 py-2 shadow-sm',
          disabled ? 'bg-gray-200' : 'bg-white',
          errors[name]
            ? 'border-red-500'
            : variant === 'primary'
            ? 'border-black'
            : variant === 'secondary'
            ? 'border-blue-500'
            : 'border border-[#e6e8ea]'
        )}
      >
        {leftAddOn && (
          <span
            className={clsxm(
              'absolute inset-y-0 left-0 flex items-center rounded-l-md border-r-2 bg-gray-50 px-3 text-gray-500 sm:text-sm',
              errors[name]
                ? 'border-red-500'
                : variant === 'primary'
                ? 'border-black'
                : variant === 'secondary'
                ? 'border-redSecondary'
                : 'border-[#f5f6f7]'
            )}
          >
            {leftAddOnText}
          </span>
        )}
        <>
          <input
            className={clsxm(
              'block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm',
              disabled ? 'bg-gray-200' : 'bg-white',
              variant === 'tertiary' ? 'text-[#bd5b5b]' : 'text-black',
              totalCharOnLeftAddOnText == 1
                ? 'pl-6'
                : totalCharOnLeftAddOnText == 2
                ? 'pl-8'
                : totalCharOnLeftAddOnText == 3
                ? 'pl-10'
                : totalCharOnLeftAddOnText == 4
                ? 'pl-14'
                : totalCharOnLeftAddOnText == 5
                ? 'pl-16'
                : 'pl-20',
              !leftAddOn && 'pl-0'
            )}
            type={type === 'year' ? 'number' : type}
            // To limit the date value
            min={type === 'year' ? '2000' : undefined}
            max={
              type === 'date'
                ? '9999-12-21'
                : type === 'year'
                ? new Date().getFullYear()
                : undefined
            }
            // To prevent modifying values when scrolling inside text input
            onWheel={
              type === 'number'
                ? () => (document.activeElement as HTMLElement).blur()
                : undefined
            }
            id={name}
            {...register(name, validation)}
            onClick={onClick}
            onChange={
              onChange ??
              ((e) => {
                if (clickOnly) {
                  setValue(name, getValues(name));
                } else if (numberOnly) {
                  const result = e.target.value.replace(/[^0-9]/g, '');
                  setValue(name, Number(result));
                } else {
                  setValue(name, e.target.value);
                }
              })
            }
            onKeyDown={type === 'date' ? (e) => e.preventDefault() : undefined}
            accept={accept}
            required={required}
            disabled={disabled}
            // value={inputValue}
            placeholder={placeholder}
          />
          <div
            className={clsxm(
              'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
              errors[name]
                ? 'text-red-500'
                : variant === 'primary'
                ? 'text-black'
                : 'text-redSecondary'
            )}
          >
            {icon}
          </div>
        </>
      </div>
      {errors[name] && (
        <div className='mt-2 flex items-center justify-center space-x-2 rounded-md bg-red-500 px-1'>
          <span className='text-base text-white'>{`${
            errors[name]?.message ?? ''
          }`}</span>
          <BsFillExclamationTriangleFill className='text-yellow-200' />
        </div>
      )}
    </div>
  );
};

export default Input;
