import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth/auth.api';
import { setAccessToken } from '@/utils/authUtils';

const useMutateAuth = () => {
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }: { accessToken: string }) => {
      await setAccessToken(accessToken);
    },
  });

  return { postLoginMutation };
};

export default useMutateAuth;
