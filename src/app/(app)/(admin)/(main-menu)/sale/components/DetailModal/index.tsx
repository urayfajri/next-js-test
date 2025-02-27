import moment from 'moment';
import * as React from 'react';

import Modal from '@/app/components/ui/custom-modal/Modal';
import { Sale } from '@/app/types/model/sale/type';
import { ApiReturn } from '@/app/types/common/type';
import useSWR from 'swr';
import { SALE_API } from '@/app/constants/enums/sale/enum';
import { SaleDetail } from '../../../../../../types/model/sale/type';
import totalFormatter from '@/app/services/totalformatter';
type Props = {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  sale: Sale;
};

const DetailSaleModal: React.FC<Props> = ({ isOpen, setIsOpen, sale }) => {
  const { data: apiResponse, isLoading } = useSWR<ApiReturn<Sale>>(
    SALE_API.BASE + `/${sale.docno}`
  );

  const detaiSale = apiResponse?.data;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='min-w-full lg:min-w-[50rem]'
    >
      <div className='p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div>
            <h4 className='text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-4'>
              Sale Information
            </h4>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32'>
              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>
                  Doc Date
                </p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                  {!isLoading && detaiSale
                    ? moment(sale.docdate).format('MMMM D, YYYY')
                    : '-'}
                </p>
              </div>

              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>
                  Customer Name
                </p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                  {!isLoading && detaiSale ? detaiSale.customer.custname : '-'}
                </p>
              </div>
            </div>

            <h6 className='text-sm font-semibold text-gray-600 dark:text-white/90 lg:mb-2 lg:mt-6'>
              Sale Items
            </h6>
            {!isLoading && detaiSale ? (
              detaiSale.sales_detail.length === 0 ? (
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  No items sold
                </p>
              ) : (
                <>
                  {detaiSale.sales_detail.map((item, index) => (
                    <div
                      className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32 mb-4'
                      key={index}
                    >
                      <div>
                        <p className='text-xs leading-normal text-gray-500 dark:text-gray-400'>
                          Item Name
                        </p>
                        <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                          {item.itemname}
                        </p>
                      </div>

                      <div>
                        <p className='text-xs leading-normal text-gray-500 dark:text-gray-400'>
                          Quantity
                        </p>
                        <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                          {item.qty}
                        </p>
                      </div>

                      <div>
                        <p className='text-xs leading-normal text-gray-500 dark:text-gray-400'>
                          Price
                        </p>
                        <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                          {totalFormatter('id-ID', item.unitprice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )
            ) : (
              <p className='text-sm font-medium text-gray-800 dark:text-white/90'>
                -
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailSaleModal;
