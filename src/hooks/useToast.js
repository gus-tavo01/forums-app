import { useSelector, useDispatch } from 'react-redux';
import { openToast, closeToast } from '../redux/actions/toasts-actions';

function useToast() {
  const dispatch = useDispatch();
  const toast = useSelector((store) => store.toasts);

  const setToastOpen = (conf) => dispatch(openToast(conf));

  const setToastClose = () => dispatch(closeToast());

  return { toast, setToastOpen, setToastClose };
}

export default useToast;
