import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrorApi = (error: any): Error => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || error.message || "Request failed";
    return new Error(message);
  }

  if (error instanceof Error) return error;

  return new Error("Unknown error");
};
