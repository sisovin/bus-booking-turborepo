import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const checkAuth = async () => {
  try {
    const response = await axios.get('/api/auth/check', {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const redirectToLogin = () => {
  const router = useRouter();
  router.push('/login');
};
