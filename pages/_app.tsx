import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import store from '../store/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if (checkToken === null) {
      router.push('/auth/login');
    }
    setIsAuth(true);
  }, [isAuth]);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
