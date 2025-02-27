import React from 'react';

import { DataTableProps } from '@/app/types/data-table/type';

export default function CustomTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
      <div className='max-w-full overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead className='border-b border-gray-100 dark:border-white/[0.05]'>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className='px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400'
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-white/[0.05]'>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td
                      key={col.key as string}
                      className='px-5 py-4 text-gray-800 dark:text-white/90'
                    >
                      {col.render
                        ? col.render(row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className='px-5 py-4 text-center text-gray-500 dark:text-gray-400'
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
