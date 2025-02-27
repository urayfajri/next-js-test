'use client';

import { QueryClient, QueryClientProvider, QueryOptions } from 'react-query';
import { SWRConfig } from 'swr';

import axiosClient from '@/app/services/axios';

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await axiosClient.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url).then((res) => res.data),
        }}
      >
        {children}
      </SWRConfig>
    </QueryClientProvider>
  );
}
