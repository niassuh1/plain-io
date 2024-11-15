import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const useLoginMutation = (props?: { onSuccess: () => void }) => {
  const loginMutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: "/",
      }),
    onSuccess: props?.onSuccess,
  });
  return loginMutation;
};
