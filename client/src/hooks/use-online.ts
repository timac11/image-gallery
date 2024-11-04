import React from 'react';

const getOnLineStatus = () => {
  if (!navigator) {
    // TODO polyfill
    return true;
  }

  return navigator.onLine;
};

export const useOnLine = () => {
  const [status, setStatus] = React.useState(getOnLineStatus());

  React.useEffect(() => {
    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};
