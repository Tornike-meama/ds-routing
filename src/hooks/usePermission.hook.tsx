import { useClaimns } from "./useClaims.hook";
import {
  UserPermissionReturnType,
  Actions,
  Acceseses,
} from "types";

export function usePersmissions(
  moduleKey?: string,
  pageKeys?: Acceseses
): UserPermissionReturnType {
  const userClaims = useClaimns();
  let actions = {} as Actions;

  if (!pageKeys || !moduleKey) {
    return { actions, userClaims };
  }

  const hasPageAccess = userClaims.some((key: string) => key === moduleKey || key === pageKeys.pageKey);
  Object
    .getOwnPropertyNames(pageKeys)
    .forEach((key) => (actions[key] = hasPageAccess || userClaims.includes(pageKeys[key])));
  return { actions, userClaims };
};