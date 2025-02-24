import { ILoginProps } from "@/types/global.type";
import axios from "axios";

// POST LOGIN
export const loginApi = async (data: ILoginProps) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/v1/auth/login`,
      data
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}