import { useSelector } from 'react-redux';

function useAuth() {
  const auth = useSelector((store) => store.auth);
  return auth;
}

export default useAuth;
