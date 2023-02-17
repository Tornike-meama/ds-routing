import { DrawerItem, DrawerRoutes, Modules, PageRoutes, RoutesType } from "../types";
import { generateValidUrlFromName } from "./common.helpers";

//routes
export function getRoutes(allModule: Modules[]) {
  return allModule.flatMap((module) =>
    getRoutesrecursion(module.subPages, module.name, module.moduleKey)
  );
}

function getRoutesrecursion(
  pages: PageRoutes[],
  baseUrl: string,
  moduleKey: string
): RoutesType[] {
  let arr: RoutesType[] = [];
  
  pages.forEach((page: PageRoutes) => {
    if (!page.component) {
      arr.push(
        ...getRoutesrecursion(
          page.subPages ?? [],
          `${generateValidUrlFromName(baseUrl)}/${page.url || generateValidUrlFromName(page.name)}`,
          page.pageKeys.pageKey
        )
      );
    } else {
      const route = {
        to: `${generateValidUrlFromName(baseUrl)}/${page.url || generateValidUrlFromName(page.name)}`,
        moduleKey: moduleKey,
        pageKeys: page.pageKeys,
        Component: page.component,
      };
      arr.push(route);
      if (page.subPages?.length) {
        arr.push(
          ...getRoutesrecursion(page.subPages, route.to, page.pageKeys.pageKey)
        );
      }
    }
    
  });
  return arr;
}

//drawer
export function getDrawerItems(claims: string[], allModule: Modules[]) {
  //loop all module
  const drawerItems = allModule.reduce<DrawerItem[]>((acc, module) => {
    if (!module.showDrawer) return acc;

    //initilize module fro drawer
    let moduleItem = {
      name: module.name,
      to: undefined,
      childItems: [],
    } as DrawerItem;

    //check user access for full module
    moduleItem.childItems = getDrawerItemrecursion(module.subPages, module.moduleKey, `/${module.name}`, claims);
    //if user haven't access full module or any page inside this module not showing in drawer
    moduleItem.childItems?.length > 0 && acc.push(moduleItem); //TODO: make this better
    return acc;
  }, []);

  return drawerItems;
}

function getDrawerItemrecursion(
  pages: PageRoutes[],
  moduleKey: string,
  prevUrl: string,
  claims: string[]
): DrawerItem[] {
  return pages.reduce<DrawerItem[]>((acc, page) => {
    //check if user have access full page or access get action and check show in drawer
    if (claims.some((key) => key === moduleKey || key === page.pageKeys.pageKey || key === page.pageKeys.get) && page.showDrawer ) {
      let subPageItem = {
        name: page.name,
        to: page.url ? `${prevUrl}/${page.url}` : null,
        childItems: [],
      } as DrawerItem;

      //recursion pages if have sub pages
      if (page.subPages !== undefined && page.subPages?.length > 0) {
        subPageItem.childItems = getDrawerItemrecursion(
          page.subPages,
          moduleKey,
          subPageItem.to ?? `${prevUrl}/${page.name.split(" ").join("")}`,
          claims
        );
      };

      acc.push(subPageItem);
    };
     
    return acc;
  }, []);
}

//get drawer items and routes 
export function getDrawerRoutes(claims: string[], allModule: Modules[]): DrawerRoutes {
  const routes = getRoutes(allModule);
  const drawer = getDrawerItems(claims, allModule);
  return { routes, drawer };
}

//accasses
export const roles = [
  {
    name: "Developer_1",
    roleId: "ea3f4d0a-f1ca-4f91-399a-08da03714fc2",
    roleName: "Developer",
    roleClaims: [
      "ProjectPolicys_ERPModuleModule",
      "ProjectPolicys_FinancesModule",
      "ProjectPolicys_OffersModule",
      "ProjectPolicys_PaymentModule",
      "ProjectPolicys_CoreModule",
      "ProjectPolicys_B2BHoreka",
      "ProjectPolicys_ProductModule",
      "ProjectPolicys_ECommerceModule",
      "ProjectPolicys_CustomersModule_CustomerGroupPage_AddGroup",
      "ProjectPolicys_CustomersModule_CustomerGroupPage_Remove",
      // "ProjectPolicys_CustomersModule_CustomerPage",
      "ProjectPolicys_CustomersModule_CommentTagsPage",
      "ProjectPolicys_CustomersModule_CommentStatusPage",
      "ProjectPolicys_CustomersModule_CommentPage",
      "ProjectPolicys_CustomersModule_B2BClientCategoriesPage",
      "ProjectPolicys_CustomersModule_B2BClientPage",
      "ProjectPolicys_CustomersModule_B2BClientAddressPage",
      "ProjectPolicys_CustomersModule_DocumentDraftPage",
      "ProjectPolicys_CustomersModule_DocumentPage",
    ],
    modules: [
      "ProjectPolicys_B2BHoreka",
      "ProjectPolicys_CoreModule",
      "ProjectPolicys_CustomersModule",
      "ProjectPolicys_ECommerceModule",
      "ProjectPolicys_ERPModuleModule",
      "ProjectPolicys_FinancesModule",
      "ProjectPolicys_OffersModule",
      "ProjectPolicys_PaymentModule",
      "ProjectPolicys_ProductModule",
    ],
    company: {
      companyId: 1,
      name: "Meama-HQ",
      color: null,
      inherits: false,
    },
  },
];

export const userClaims = [
  "ProjectPolicys_HomeModule",

  "ProjectPolicys_ERPModuleModule",
  "ProjectPolicys_FinancesModule",
  "ProjectPolicys_OffersModule",
  "ProjectPolicys_PaymentModule",
  "ProjectPolicys_CoreModule",
  "ProjectPolicys_B2BHoreka",
  "ProjectPolicys_ProductModule",
  // "ProjectPolicys_ECommerceModule",
  "ProjectPolicys_ECommerceModule_ProductPage_Get",
  // "ProjectPolicys_ECommerceModule_ProductPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_donwlaod",
  // "ProjectPolicys_CustomersModule_CustomerPage",
  "ProjectPolicys_CustomersModule_CustomerPage_Get",
  "ProjectPolicys_CustomersModule_CustomerPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_Remove",

  "ProjectPolicys_CustomersModule_CustomerSubPage_Add",
  "ProjectPolicys_CustomersModule_CustomerSubPage_Get",
  "ProjectPolicys_CustomersModule_CustomerSub2Page_Get",
  // "ProjectPolicys_CustomersModule_CustomerSubPage",
  // "ProjectPolicys_CustomersModule_CustomerPage_Update",
];
