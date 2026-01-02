import { paths } from '@/paths';

import axios from '@/lib/axios';

import { JWT_REFRESH_TOKEN, JWT_STORAGE_KEY } from './constant';
import { attemptTokenRefresh } from './action';

// ----------------------------------------------------------------------

let refreshTimer: NodeJS.Timeout | null = null;

export function scheduleTokenRefresh(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  // refresh 2 minute before expiry
  const refreshTime = timeLeft - 2 * 60 * 1000;

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  if (refreshTime > 0) {
    refreshTimer = setTimeout(async () => {
      try {
        const success = await attemptTokenRefresh();
        if (!success) {
          handleSessionExpired('RefreshToken');
        }
      } catch (error) {
        console.error('Error during scheduled refresh:', error);
        handleSessionExpired('RefreshToken');
      }
    }, refreshTime);
  }
}

window.addEventListener('storage', event => {
  if (event.key === JWT_STORAGE_KEY && event.newValue === null) {
    handleSessionExpired('Cross-tab');
  }
});

export function handleSessionExpired(source: string) {
  localStorage.removeItem(JWT_STORAGE_KEY);
  localStorage.removeItem(JWT_REFRESH_TOKEN);

  window.location.href = paths.admin.login;
  alert('Session expired, please log in again.');
}

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Token expired!');
      localStorage.removeItem(JWT_STORAGE_KEY);
      window.location.href = paths.admin.login;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      localStorage.setItem(JWT_STORAGE_KEY, accessToken);
      // if (refreshToken) {
      //   localStorage.setItem(JWT_REFRESH_TOKEN, refreshToken);
      // }

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken); // ~3 days by minimals server

      if (decodedToken && 'exp' in decodedToken) {
        // tokenExpired(decodedToken.exp);
        scheduleTokenRefresh(decodedToken.exp);
      } else {
        throw new Error('Invalid access token!');
      }
    } else {
      localStorage.removeItem(JWT_STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
      // console.warn('setSession called with null → logging out');
      // handleSessionExpired('setSession(null)');
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
