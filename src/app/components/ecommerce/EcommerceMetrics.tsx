'use client';
import { ArrowUpIcon, BoxIcon, PersonStandingIcon } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';

import { STATISTIC_API } from '@/app/constants/enums/statistic/enum';
import { ApiReturn } from '@/app/types/common/type';
import { StatisticTotal } from '@/app/types/model/statistic/type';

import Badge from '../ui/badge/Badge';

export const EcommerceMetrics = () => {
  const { data: apiResponse, isLoading } = useSWR<ApiReturn<StatisticTotal>>(
    STATISTIC_API.STATS_ALL
  );

  const statistic = apiResponse?.data;

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6'>
      {/* <!-- Metric Item Start --> */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <PersonStandingIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>

        <div className='flex items-end justify-between mt-5'>
          <div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Customers
            </span>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {!isLoading && statistic ? statistic.total_customers : '-'}
            </h4>
          </div>
          <Badge color='success'>
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIcon className='text-gray-800 dark:text-white/90' />
        </div>
        <div className='flex items-end justify-between mt-5'>
          <div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Items
            </span>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {!isLoading && statistic ? statistic.total_items : '-'}
            </h4>
          </div>

          <Badge color='success'>
            <ArrowUpIcon className='text-success-500' />
            59.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
