import React from 'react';

import ComponentCard from '@/app/components/common/ComponentCard';
import PageBreadcrumb from '@/app/components/common/PageBreadCrumb';
import BasicTableOne from '@/app/components/tables/BasicTableOne';

export default function MasterDataItem() {
  return (
    <div>
      <PageBreadcrumb pageTitle='Item' />
      <div className='space-y-6'>
        <ComponentCard title='Item Table'>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
