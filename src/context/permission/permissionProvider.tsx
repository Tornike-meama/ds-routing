import React, { PropsWithChildren } from "react";
import { ActionByPageKey } from "types";
import { PermissionsContext } from "./permissionContext";

type PermissionProviderProps = {
  userClaims: string[];
  userActions: ActionByPageKey;
};

const PermissionProvider = ({
  userClaims,
  userActions,
  children,
}: PropsWithChildren<PermissionProviderProps>) => (
  <PermissionsContext.Provider value={{ userClaims, userActions }}>
    {children}
  </PermissionsContext.Provider>
);
export default PermissionProvider;