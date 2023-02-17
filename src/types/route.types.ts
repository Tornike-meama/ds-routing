export type DrawerItem = {
  name: string;
  to?: string;
  childItems?: DrawerItem[];
};

export type RoutesType = {
  to: string;
  moduleKey: string;
  pageKeys: Acceseses;
  Component: () => JSX.Element;
};

export type DrawerRoutes = {
  drawer: DrawerItem[];
  routes: RoutesType[];
};

export type Acceseses = Record<string, string> & {
  pageKey: string;
  get?: string;
  add?: string;
  update?: string;
  remove?: string;
};

export type PageRoutes = {
  pageKeys: Acceseses;
  url: string;
  name: string;
  showDrawer: boolean;
  subPages?: PageRoutes[];
  component: (() => JSX.Element) | null;
};

export type Modules = {
  moduleKey: string;
  name: string;
  showDrawer: boolean;
  subPages: PageRoutes[];
};

