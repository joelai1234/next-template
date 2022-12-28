import { printObject } from '@/utils/printObject';
import { toastError } from '@/utils/toast';

import type { ErrorData } from '../model/error';

export const printApiErrorMessage = (error: ErrorData) => {
  if (error?.message) {
    toastError(String(error.message));
  } else {
    toastError(printObject(error));
  }
};
