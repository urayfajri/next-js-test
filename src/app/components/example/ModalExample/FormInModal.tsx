'use client';
import React from 'react';

import { useModal } from '@/app/hooks/useModal';

import ComponentCard from '../../common/ComponentCard';
import Input from '../../form/input/InputField';
import Label from '../../form/Label';
import Button from '../../ui/button/Button';
import { Modal } from '../../ui/modal';

export default function FormInModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    // eslint-disable-next-line no-console
    console.log('Saving changes...');
    closeModal();
  };
  return (
    <ComponentCard title='Form In Modal'>
      <Button size='sm' onClick={openModal}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className='max-w-[584px] p-5 lg:p-10'
      >
        <form className=''>
          <h4 className='mb-6 text-lg font-medium text-gray-800 dark:text-white/90'>
            Personal Information
          </h4>

          <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2'>
            <div className='col-span-1'>
              <Label>First Name</Label>
              <Input name='firstName' type='text' placeholder='Emirhan' />
            </div>

            <div className='col-span-1'>
              <Label>Last Name</Label>
              <Input name='lastName' type='text' placeholder='Boruch' />
            </div>

            <div className='col-span-1'>
              <Label>Last Name</Label>
              <Input
                name='email'
                type='email'
                placeholder='emirhanboruch55@gmail.com'
              />
            </div>

            <div className='col-span-1'>
              <Label>Phone</Label>
              <Input name='phone' type='text' placeholder='+09 363 398 46' />
            </div>

            <div className='col-span-1 sm:col-span-2'>
              <Label>Bio</Label>
              <Input name='bio' type='text' placeholder='Team Manager' />
            </div>
          </div>

          <div className='flex items-center justify-end w-full gap-3 mt-6'>
            <Button size='sm' variant='outline' onClick={closeModal}>
              Close
            </Button>
            <Button size='sm' onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </ComponentCard>
  );
}
