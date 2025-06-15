import { useMutation } from '@tanstack/react-query';
import { postLoginAndRefresh, postLogout } from '@/apis/auth/auth.api';

const useMutateAuth = () => {
  const postLoginAndRefreshMutation = useMutation({
    mutationFn: postLoginAndRefresh,
  });

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
  });

  return { postLoginAndRefreshMutation, postLogoutMutation };
};

export default useMutateAuth;
