'use client';
import React from 'react';
import { ImEnvelop } from 'react-icons/im';

import PhoneInput from '../group-input/PhoneInput';
import Input from '../input/InputField';
import Label from '../Label';
import ComponentCard from '../../common/ComponentCard';

export default function InputGroup() {
  const countries = [
    { code: 'US', label: '+1' },
    { code: 'GB', label: '+44' },
    { code: 'CA', label: '+1' },
    { code: 'AU', label: '+61' },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    // eslint-disable-next-line no-console
    console.log('Updated phone number:', phoneNumber);
  };
  return (
    <ComponentCard title='Input Group'>
      <div className='space-y-6'>
        <div>
          <Label>Email</Label>
          <div className='relative'>
            <Input
              name='email'
              placeholder='info@gmail.com'
              type='text'
              className='pl-[62px]'
            />
            <span className='absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400'>
              <ImEnvelop />
            </span>
          </div>
        </div>
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition='start'
            countries={countries}
            placeholder='+1 (555) 000-0000'
            onChange={handlePhoneNumberChange}
          />
        </div>{' '}
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition='end'
            countries={countries}
            placeholder='+1 (555) 000-0000'
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
