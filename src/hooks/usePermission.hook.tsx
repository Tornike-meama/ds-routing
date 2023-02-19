import React, { createContext } from "react";
import {
  PermissionContextType,
  UserPermissionReturnType,
  Actions,
  Acceseses,
} from "types";

export const PermissionsContext = createContext<PermissionContextType>({
  userClaims: [],
});

export function usePersmissions(
  moduleKey?: string,
  pageKeys?: Acceseses
): UserPermissionReturnType {
  const { userClaims } = {userClaims: ["test"]}; //useContext(PermissionsContext);
  let actions = {} as Actions;

  if (!pageKeys || !moduleKey) {
    return { actions, userClaims };
  }

  const hasPageAccess = userClaims.some(
    (key: string) => key === moduleKey || key === pageKeys.pageKey
  );
  Object.getOwnPropertyNames(pageKeys).forEach(
    (key) =>
      (actions[key] = hasPageAccess || userClaims.includes(pageKeys[key]))
  );
  return { actions, userClaims };
}

export default usePersmissions;
