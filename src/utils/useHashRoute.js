import { useEffect, useState } from 'react';

const DEFAULT_ROUTE = '#/';

const getRoute = () => {
  if (!window.location.hash) {
    window.history.replaceState(null, '', DEFAULT_ROUTE);
    return DEFAULT_ROUTE;
  }

  return window.location.hash;
};

export const useHashRoute = () => {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    if (nextRoute === route) return;
    window.location.hash = nextRoute;
  };

  return [route, navigate];
};
