import { Customer } from '@/app/types/model/customer/type';

export type Sale = {
  docno: number;
  docdate: string;
  customerid: number;
  customer: Customer;
  sales_detail: SaleDetail[];
};

export type SaleDetail = {
  itemid: number;
  itemname: string;
  qty: number;
  unitprice: number;
};

export type SaleRequest = {
  customerid?: number;
  custname: string;
};
