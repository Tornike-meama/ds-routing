import { ActionByPageKey, DrawerItem, InitRouterReturnType, Modules, PageRoutes } from "types";
import { RoutesByAccasable } from "types/route.types";
import { getAccassesByModuleOrPageKeys, getValidUrl, isAuthorizedPublicRoute, isAuthorizedPublicOrUnAuthorizedRoute, isUnAuthorizedRoute } from "./common.helpers";

//init router method which run first when applicaition load
export function initRouter(claims: string[], allModule: Modules[]): InitRouterReturnType {
  //initilize empty return routes and actons
  let allActions = {};
  let routes: RoutesByAccasable = {privateRoutes: [], authorizedPublicRoutes: [], unAuthorizedRoutes: []};
  //loop all module and get router 
  const drawerItems = allModule.reduce<DrawerItem[]>((acc, module) => {
    let currentRouter = getRouter(module.subPages, module.moduleKey, `${module.name}`, claims, allActions, routes);
    //add actions and routes in main array
    allActions = {...allActions, ...currentRouter.actions};
    routes.privateRoutes.push(...currentRouter.routes.privateRoutes);

    //initilize module for drawer
    let moduleItem = {
      name: module.name,
      to: undefined,
      childItems: currentRouter.drawerItems ?? [],
    };

    //if not showing in drawer or user haven't access full module or any page inside this module not showing in drawer
    if(moduleItem.childItems.length > 0 && module.showDrawer) acc.push(moduleItem); //TODO: make this better
    return acc;
  }, []);

  return {actions: allActions, routes, drawerItems};
}

//recursion modules and subpages tree
function getRouter(
  pages: PageRoutes[],
  moduleKey: string,
  prevUrl: string,
  claims: string[],
  allActions: ActionByPageKey,
  routes: RoutesByAccasable,
): InitRouterReturnType {
  const drawItems = pages.reduce<InitRouterReturnType>((acc: InitRouterReturnType, page: PageRoutes) => {
    const actions = getAccassesByModuleOrPageKeys(moduleKey, page.pageKeys, claims)
    acc.actions = {...acc.actions, ...actions}
    //check if user have moduleKey, pagekey or access get action and check show in drawer
    if (claims.some((key) => key === moduleKey || key === page.pageKeys.pageKey || key === page.pageKeys.get) || isAuthorizedPublicOrUnAuthorizedRoute(page.pageKeys.pageKey)) {
      //drawer items
      let subPageItem: DrawerItem = {
        name: page.name,
        to: getValidUrl(prevUrl, page.url), // page.url ? `${prevUrl}/${page.url}` : null,
        childItems: [],
      };

      //current router url which is for routes and drawer
      const currentUrl = subPageItem.to || `${prevUrl}/${page.name.split(" ").join("")}`;

      //add route in arr if have component this route
      if (page.component) {
        const currentRoute = {to: currentUrl, moduleKey: moduleKey, pageKeys: page.pageKeys, Component: page.component};
        if(isUnAuthorizedRoute(page.pageKeys.pageKey)) {
          routes.unAuthorizedRoutes.push(currentRoute)
        } else if(isAuthorizedPublicRoute(page.pageKeys.pageKey)) {
          routes.authorizedPublicRoutes.push(currentRoute)
        } else {
          routes.privateRoutes.push(currentRoute);
        }
      };

      //recursion pages if have sub pages
      if (page.subPages !== undefined && page.subPages?.length > 0) {
        const subactions = getRouter(page.subPages, moduleKey, currentUrl, claims, allActions, routes);
        subPageItem.childItems = subactions.drawerItems;
        acc.actions = {...acc.actions, ...subactions.actions}
      };
  
      //if this item must in drawer finally push in drawer items tree arr
      if(page.showDrawer && (subPageItem.childItems?.length || page.component)) {
        acc.drawerItems.push(subPageItem);
      }
    }
    
    return acc;
  }, {drawerItems: [], actions: {}, routes: {privateRoutes: [], unAuthorizedRoutes: [], authorizedPublicRoutes: []} });

  return drawItems;
};