import { Acceseses } from "types";
import { UnAuthorizedKey, AuthorizedPublicKey } from './../constants/routes.constatnt';

export const getValidUrl = (prevUrl: string, pageUrl: string) =>{
  if(prevUrl === "/") {
    return prevUrl
  }
  return pageUrl ? `${prevUrl}/${pageUrl}` : pageUrl;
};

export function getAccassesByModuleOrPageKeys(moduleKey: string, pageKeys: Acceseses, userClaims: string[]) {
  let actionsByPageKey = {[pageKeys.pageKey]: {}};
  Object
    .getOwnPropertyNames(pageKeys)
    .forEach((key) => {
      actionsByPageKey[pageKeys.pageKey] = 
        {...actionsByPageKey[pageKeys.pageKey],[key]: userClaims.some((accasessKey) => moduleKey === accasessKey || pageKeys?.pageKey === accasessKey || pageKeys[key] === accasessKey)}
    });
  return actionsByPageKey;
};

export function isUnAuthorizedRoute(key: string) {
  return key === UnAuthorizedKey;
};

export function isAuthorizedPublicRoute(key: string) {
  return key === AuthorizedPublicKey;
};

export function isAuthorizedPublicOrUnAuthorizedRoute(key: string) {
  return isUnAuthorizedRoute(key) || isAuthorizedPublicRoute(key);
};
