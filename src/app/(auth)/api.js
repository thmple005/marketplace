import { useMutation } from "react-query";
import { http } from "../../utils";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UseSignup = () => {
  const router = useRouter();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`/api/signup`, payload);
    },
    onSuccess: (data,variable) => {
      console.log(data);
      localStorage.setItem("userEmail", variable.user_email);
      router.push("/enterotp");
    },
    onError: (error,variable) => {
      console.log(error);
      message.error(error.response.data.message || error.response.data.error);
    },
  });

  return { mutate: mutate, isLoading: isLoading, isSuccess };
};

export const UseLogin = () => {
  const router = useRouter();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`/api/signin`, payload);
    },
    onSuccess: (data) => {
      localStorage.removeItem("userEmail");
      router.push("/dashboard");
    },
    onError: (error, variable) => {
      localStorage.setItem("userEmail", variable.user_email);
      message.error(error.response.data.message || error.response.data.error);
      if (error.response.status === 403) {
        router.push("/enterotp");
      }
    },
  });

  return { mutate: mutate, isLoading: isLoading, isSuccess };
};

export const UseEnterOtp = () => {
  const router = useRouter();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (payload) => {

      return axios.post(`/api/verifyotp`, payload);
    },
    onSuccess: (data) => {
      console.log("data", data);
      router.push("/login");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
      message.error(error?.response?.data?.message || error?.response?.data?.error);
    },
  });

  return { mutate: mutate, isLoading: isLoading, isSuccess };
};


export const UseForgotPassword = () => {
  const router = useRouter();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (payload) => {
      localStorage.setItem("userEmail", payload.user_email);
      return axios.post(`/api/forgot-password`, payload);
    },
    onSuccess: (data) => {
      console.log("data", data);
      router.push("/new-password");
    },
    onError: (error) => {
      console.log(error);
      message.error(error?.response?.data?.message || error?.response?.data?.error);
    },
  });

  return { mutate: mutate, isLoading: isLoading, isSuccess };
};

export const UseNewPassword = () => {
  const router = useRouter();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`/api/new-password`, payload);
    },
    onSuccess: () => {
      localStorage.removeItem("userEmail");
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
      message.error(error?.response?.data?.message || error?.response?.data?.error);
    },
  });

  return { mutate: mutate, isLoading: isLoading, isSuccess };
};
// export const useCartList = () => {
//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["cartList"],
//     queryFn: MyItems,
//     refetchOnMount: true,
//   });
//   return { data: data?.data.data, isLoading: isLoading, refetch: refetch };
// };
