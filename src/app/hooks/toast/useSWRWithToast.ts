import * as React from 'react';
import toast from 'react-hot-toast';
import { SWRResponse } from 'swr';

import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';

type OptionType = {
  runCondition?: boolean;
  loading?: string;
  success?: string;
  error?: string;
};

export default function useSWRWithToast<T, E>(
  swr: SWRResponse<T, E>,
  { runCondition = true, ...customMessages }: OptionType = {}
) {
  const { data, error } = swr;

  const toastStatus = React.useRef<string>(data ? 'done' : 'idle');

  const toastMessage = {
    ...DEFAULT_TOAST_MESSAGE,
    ...customMessages,
  };

  React.useEffect(() => {
    if (!runCondition) return;

    // if toastStatus is done,
    // then it is not the first render or the data is already cached
    if (toastStatus.current === 'done') return;

    if (error) {
      toast.error(toastMessage.error, { id: toastStatus.current });
      toastStatus.current = 'done';
    } else if (data) {
      toast.success(toastMessage.success, { id: toastStatus.current });
      toastStatus.current = 'done';
    } else {
      toastStatus.current = toast.loading(toastMessage.loading);
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
  }, [
    data,
    error,
    runCondition,
    toastMessage.error,
    toastMessage.loading,
    toastMessage.success,
  ]);

  return { ...swr, isLoading: !error && !data };
}
