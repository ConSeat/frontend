import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth/auth.api';

const useMutateAuth = () => {
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
  });

  return { postLoginMutation };
};

export default useMutateAuth;
