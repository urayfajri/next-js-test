import type { Metadata } from 'next';
import React from 'react';

import DemographicCard from '@/app/components/ecommerce/DemographicCard';
import { EcommerceMetrics } from '@/app/components/ecommerce/EcommerceMetrics';
import MonthlySalesChart from '@/app/components/ecommerce/MonthlySalesChart';
import MonthlyTarget from '@/app/components/ecommerce/MonthlyTarget';
import RecentOrders from '@/app/components/ecommerce/RecentOrders';
import StatisticsChart from '@/app/components/ecommerce/StatisticsChart';

export const metadata: Metadata = {
  title:
    'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

export default function Ecommerce() {
  return (
    <div className='grid grid-cols-12 gap-4 md:gap-6'>
      <div className='col-span-12 space-y-6 xl:col-span-7'>
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className='col-span-12 xl:col-span-5'>
        <MonthlyTarget />
      </div>

      <div className='col-span-12'>
        <StatisticsChart />
      </div>

      <div className='col-span-12 xl:col-span-5'>
        <DemographicCard />
      </div>

      <div className='col-span-12 xl:col-span-7'>
        <RecentOrders />
      </div>
    </div>
  );
}
