import React from 'react';

import ComponentCard from '@/app/components/common/ComponentCard';
import PageBreadcrumb from '@/app/components/common/PageBreadCrumb';
import BasicTableOne from '@/app/components/tables/BasicTableOne';

export default function MasterDataCustomer() {
  return (
    <div>
      <PageBreadcrumb pageTitle='Customer' />
      <div className='space-y-6'>
        <ComponentCard title='Customer Table'>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
