import { ActionByPageKey, DrawerItem, InitRouterReturnType, Modules, PageRoutes, RoutesType } from "types";
import { getAccassesByModuleOrPageKeys, getValidUrl } from "./common.helpers";

//init router method which run first when applicaition load
export function initRouter(claims: string[], allModule: Modules[]): InitRouterReturnType {
  //loop all module
  let allActions = {};
  let allRoutes: RoutesType[] = [];
  const allDrawerItems = allModule.reduce<DrawerItem[]>((acc, module) => {
    let accassesAndDrawitems = getRouter(module.subPages, module.moduleKey, `/${module.name}`, claims, allActions, allRoutes);
    //add actions and routes in main array
    allActions = {...allActions, ...accassesAndDrawitems.actions};
    allRoutes.push(...accassesAndDrawitems.routes);
    //if don't want show module in drawer
    if (!module.showDrawer) return acc;

    //initilize module for drawer
    let moduleItem = {
      name: module.name,
      to: undefined,
      childItems: accassesAndDrawitems.drawerItems ?? [],
    };

    //if user haven't access full module or any page inside this module not showing in drawer
    if(moduleItem.childItems.length > 0) acc.push(moduleItem); //TODO: make this better
    return acc;
  }, []);

  return {actions: allActions, routes: allRoutes, drawerItems: allDrawerItems};
}

//recursion modules and subpages tree
function getRouter(
  pages: PageRoutes[],
  moduleKey: string,
  prevUrl: string,
  claims: string[],
  allActions: ActionByPageKey,
  routes: RoutesType[],
): InitRouterReturnType {
console.log("object");
  const drawItems = pages.reduce<InitRouterReturnType>((acc: InitRouterReturnType, page: PageRoutes) => {
    const actions = getAccassesByModuleOrPageKeys(moduleKey, page.pageKeys, claims)
    acc.actions = {...acc.actions, ...actions}
    //check if user have moduleKey, pagekey or access get action and check show in drawer
    if (claims.some((key) => key === moduleKey || key === page.pageKeys.pageKey || key === page.pageKeys.get)) {
      //drawer items
      let subPageItem = {
        name: page.name,
        to: getValidUrl(prevUrl, page.url), // page.url ? `${prevUrl}/${page.url}` : null,
        childItems: [],
      } as DrawerItem;

      //current router url which is for routes and drawer
      const currentUrl = subPageItem.to ?? `${prevUrl}/${page.name.split(" ").join("")}`;

      //push routes in recursion routes arr
      if (page.component) {
        routes.push({to: currentUrl, moduleKey: moduleKey, pageKeys: page.pageKeys, Component: page.component});
      };

      //if this item must in drawer
      if(page.showDrawer) {
        //recursion pages if have sub pages
        if (page.subPages !== undefined && page.subPages?.length > 0) {
          const subactions = getRouter(page.subPages, moduleKey, currentUrl, claims, allActions, routes);
          subPageItem.childItems = subactions.drawerItems;
          acc.actions = {...acc.actions, ...subactions.actions}
        };
  
        //finally when all item in tree and if this item must in drawer add in acc draweritems tree
        acc.drawerItems.push(subPageItem);
      };
    }
    
    return acc;
  }, {drawerItems: [], actions: {}, routes: [] });

  return drawItems;
};