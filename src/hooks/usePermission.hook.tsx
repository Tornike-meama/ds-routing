import React, { useContext } from "react";
import {
  // PermissionContextType,
  UserPermissionReturnType,
  Actions,
  Acceseses,
} from "types";

import { PermissionsContext } from "context";
// export const PermissionsContext = createContext<PermissionContextType>({
//   userClaims: [],
// });

export function usePersmissions(
  moduleKey?: string,
  pageKeys?: Acceseses
): UserPermissionReturnType {
  const { userClaims } = useContext(PermissionsContext);
  console.log(userClaims, "userClaims from usepermission");
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
