import { IRegisterProps } from "../register.type";

export const register = async (data: IRegisterProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }

    console.log(response)

    return {
      redirectTo: '/auth/login',
      data: result,
    };

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
