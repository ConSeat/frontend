import { useMutation } from '@tanstack/react-query';
import { postLoginAndRefresh } from '@/apis/auth/auth.api';

const useMutateAuth = () => {
  const postLoginAndRefreshMutation = useMutation({
    mutationFn: postLoginAndRefresh,
  });

  return { postLoginAndRefreshMutation };
};

export default useMutateAuth;
