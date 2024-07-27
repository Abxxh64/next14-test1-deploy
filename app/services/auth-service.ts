import baseApi from "./baseApi";

interface LoginUserProps {
    email: string;
    password: string;
  }

export async function loginUserService(userData: LoginUserProps) {
    try {
        const response = await baseApi.post('/login', userData);

        return response.data;
  
    } catch (error: any) {
        return {error: error.response.data.message};
    }
  }