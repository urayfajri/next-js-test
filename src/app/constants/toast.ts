export const DEFAULT_TOAST_MESSAGE = {
  loading: 'Loading...',
  success: 'Berhasil',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) =>
    err?.response?.data?.error ||
    'Terjadi kesalahan, mohon coba beberapa saat lagi',
};
