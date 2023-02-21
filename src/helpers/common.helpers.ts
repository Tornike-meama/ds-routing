import { Acceseses } from "types";

export const getValidUrl = (prevUrl: string, pageUrl: string) =>{
  if(prevUrl === "/") {
    return prevUrl
  }
  return pageUrl ? `${prevUrl}/${pageUrl}` : null;
};

export function getAccassesByModuleOrPageKeys(moduleKey: string, pageKeys: Acceseses, userClaims: string[]) {
  let actionsByPageKey = {[pageKeys.pageKey]: {}};
  Object
    .getOwnPropertyNames(pageKeys)
    .forEach((key) => {
      actionsByPageKey[pageKeys.pageKey] = 
        {...actionsByPageKey[pageKeys.pageKey],[key]: userClaims.some((accasessKey) => pageKeys[key] === moduleKey || pageKeys?.pageKey === accasessKey || pageKeys[key] === accasessKey)}
    });
  return actionsByPageKey;
};
