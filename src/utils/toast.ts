import { toast } from 'react-toastify';

export const toastError = (text: string) =>
  toast.error(text, {
    position: 'bottom-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const toastSuccess = (text: string) =>
  toast.success(text, {
    position: 'bottom-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
