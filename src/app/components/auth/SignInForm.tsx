'use client';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/app/components/form/input/InputField';
import Label from '@/app/components/form/Label';
import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import useAuthorizationStore from '@/app/providers/store/useAuthorizationStore';
import axiosClient from '@/app/services/axios';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const { setIsAuthenticated } = useAuthorizationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    toast.promise(
      axiosClient.post(`/signin`, data).then((res) => {
        const response = res.data.data;
        localStorage.setItem('token', response.access_token);
        setIsAuthenticated(true);
        router.replace('/');
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Login Success',
        error: 'Login Error or Unauthorized',
      }
    );
  };

  return (
    <div className='flex flex-col flex-1 lg:w-1/2 w-full'>
      <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
        <div>
          <div className='mb-5 sm:mb-8'>
            <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
              Sign In
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-6'>
              <div>
                <Label>
                  Email <span className='text-error-500'>*</span>{' '}
                </Label>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  register={register}
                  validation={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  }}
                  error={!!errors.email}
                  hint={errors.email?.message as string}
                />
              </div>
              <div>
                <Label>
                  Password <span className='text-error-500'>*</span>{' '}
                </Label>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Enter your password'
                    register={register}
                    validation={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    }}
                    error={!!errors.password}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </span>
                  {errors.password && (
                    <p className='absolute left-0 -bottom-5 text-xs text-error-500'>
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
              </div>
              {/* <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className='block font-normal text-gray-700 text-theme-sm dark:text-gray-400'>
                    Keep me logged in
                  </span>
                </div>
              </div> */}
              {/* <!-- Button --> */}
              <div>
                <button
                  type='submit'
                  className='mt-6 w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600'
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>

          {/* <div className='mt-5'>
            <p className='text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start'>
              Don&apos;t have an account?&nbsp;
              <Link
                href='/signup'
                className='text-brand-500 hover:text-brand-600 dark:text-brand-400'
              >
                Sign Up
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
