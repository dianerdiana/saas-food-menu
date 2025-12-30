import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/utils/hooks/use-auth';

export const useSignIn = () => {
  const { signIn } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        exact: false,
      });
    },
  });
};

export const useSignUp = () => {
  const { signUp } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        exact: false,
      });
    },
  });
};
