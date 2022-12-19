import { useState } from 'react';
import { useStateValue } from '../../index';
import { login } from '../actions';

const useLogin = () => {
  const [{ auth }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const formData = async ({ username,password, actions }) => {
    setIsLoading(true);
    setIsLoading(false);
    if (username !== '' && password !== '') {
      dispatch(login());
    }
  };
  return [auth, formData, isLoading];
};

export default useLogin;
