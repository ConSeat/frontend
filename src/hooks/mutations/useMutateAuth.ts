import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth/auth.api';

const useMutateAuth = () => {
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken }: { accessToken: string }) => {
      document.cookie = `accessToken=${accessToken}; path=/`;
    },
  });

  return { postLoginMutation };
};

export default useMutateAuth;
