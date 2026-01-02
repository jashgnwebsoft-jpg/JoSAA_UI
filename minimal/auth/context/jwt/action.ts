import axios, { endpoints } from '@/lib/axios';

import { jwtDecode, setSession } from './utils';
import { JWT_REFRESH_TOKEN, JWT_STORAGE_KEY } from './constant';
import { toast } from 'sonner';
import { getUpdatePasswordSuccessMessage } from '../../../../core/utils/constants';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ForgotPasswordEmailParams = {
  email: string;
  value: number;
  clientCode: string;
};

export type ForgotPasswordParams = {
  password: string;
  confirmPassword: string;
  code: string;
  value: number;
};
/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const accessToken = res.data.AccessToken;
    const refreshToken = res.data.RefreshToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

export const studentSignInWithPassword = async ({
  email,
  password,
}: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.studentsignIn, params);

    const accessToken = res.data.AccessToken;
    const refreshToken = res.data.RefreshToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    localStorage.setItem(JWT_STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
    localStorage.clear();
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

export const forgotPasswordEmail = async ({
  email,
  value,
  clientCode,
}: ForgotPasswordEmailParams): Promise<boolean> => {
  const params = { email, value, clientCode };

  try {
    const res = await axios.post(endpoints.auth.forgotPasswordEmail, params);
    if (res.data === true) {
      toast.success('Password sent via Email successfully');
      return true;
    } else {
      toast.error('Password could not be sent');
      return false;
    }
  } catch (error) {
    // console.error('Error during forgot password:', error);
    toast.error('Something went wrong!');
    return false;
  }
};

export const forgotPassword = async ({
  password,
  confirmPassword,
  code,
  value,
}: ForgotPasswordParams): Promise<boolean> => {
  const params = { password, confirmPassword, code, value };

  try {
    const res = await axios.post(endpoints.auth.forgotPassword, params);
    if (res.data === true) {
      toast.success(getUpdatePasswordSuccessMessage);
      return true;
    } else {
      toast.error('Password could not be updated');
      return false;
    }
  } catch (error) {
    // console.error('Error during forgot password:', error);
    toast.error('Something went wrong!');
    return false;
  }
};

export async function attemptTokenRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem(JWT_REFRESH_TOKEN);
  if (!refreshToken) return false;

  try {
    const res = await axios.post(endpoints.auth.refreshToken, { refreshToken });

    if (res.data && res.data.AccessToken) {
      const decoded: any = jwtDecode(res.data.AccessToken);

      await setSession(res.data.AccessToken);
      // scheduleTokenRefresh(decoded.exp);

      return true;
    }
    return false;
  } catch (error) {
    console.error('Refresh token failed:', error);
    return false;
  }
}
