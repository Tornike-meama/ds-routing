import { Acceseses } from "./route.types";

export type PrivteRouteProps = {
  Component: () => JSX.Element;
  UnAuthorizedPage: () => JSX.Element;
  pageKeys: Acceseses;
  moduleKey: string;
  isLogedIn: boolean;
};

