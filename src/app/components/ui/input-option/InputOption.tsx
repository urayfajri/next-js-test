import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import clsxm from '@/app/services/clsxm';

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e?: any) => void;
  validation?: RegisterOptions;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  withNilOption?: boolean;
};

const InputOption: React.FC<Props> = ({
  label,
  name,
  onClick,
  onChange,
  children,
  validation,
  variant = 'primary',
  required,
  disabled,
  value,
  withNilOption,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='my-2'>
      <label
        htmlFor={name}
        className={clsxm(
          ' bg-white px-1 text-xs font-medium transition-all duration-200 ease-in-out',
          errors[name]
            ? 'text-blue-500'
            : variant === 'primary'
            ? 'text-gray-900'
            : variant === 'secondary'
            ? 'text-blue-600'
            : 'text-[#afc8df]'
        )}
      >
        {label + (required ? ' *' : '')}
      </label>
      <div
        className={clsxm(
          'group relative rounded-md border-2 bg-white px-3 py-2 shadow-sm',
          disabled ? 'bg-gray-200' : 'bg-white',
          errors[name]
            ? 'border-blue-500'
            : variant === 'primary'
            ? 'border-black'
            : variant === 'secondary'
            ? 'border-blue-600'
            : 'border border-[#e6e8ea]'
        )}
      >
        <select
          className={clsxm(
            'block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm',
            disabled ? 'bg-gray-200' : 'bg-white'
          )}
          id={name}
          // placeholder={label}
          {...register(name, validation)}
          onClick={onClick}
          onChange={onChange}
          required
          disabled={disabled}
          value={value}
        >
          {withNilOption && <option value=''></option>}
          {children}
        </select>
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

export default InputOption;
