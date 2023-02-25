import { ReactNode } from 'react';

export type PrivteRouteProps = {
  component: ReactNode;
  unAuthorizedPage: ReactNode;
  pageKey: string;
  isLogedIn: boolean;
};

export type UnAuthorizedRouteProps = {
  component: ReactNode;
  redirectToHome: () => void;
  isLogedIn: boolean;
};

export type AuthorizedPublicRouteProps = {
  component: ReactNode;
  unAuthorizedPage: ReactNode;
  isLogedIn: boolean;
};
