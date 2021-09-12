import toastsConstants from '../action-types/toasts-action-types';

const { OPEN_REQUEST, CLOSE_REQUEST } = toastsConstants;

const initialState = {
  isOpen: false,
  message: '',
  autoHideDuration: 5500,
  variant: 'filled',
  position: { vertical: 'top', horizontal: 'right' },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REQUEST:
      return { ...state, ...action.payload, isOpen: true };

    case CLOSE_REQUEST:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};
