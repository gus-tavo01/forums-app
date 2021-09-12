import toastConstants from '../action-types/toasts-action-types';

export const openToast = (payload) => ({
  type: toastConstants.OPEN_REQUEST,
  payload,
});

export const closeToast = (payload) => ({
  type: toastConstants.CLOSE_REQUEST,
  payload,
});
