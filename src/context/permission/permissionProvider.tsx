import React, { PropsWithChildren } from "react";
import { PermissionsContext } from "./permissionContext";

type PermissionProviderProps = {
  userClaims: string[];
};

const PermissionProvider = ({
  userClaims,
  children,
}: PropsWithChildren<PermissionProviderProps>) => (
  <PermissionsContext.Provider value={{ userClaims }}>
    {children}
  </PermissionsContext.Provider>
);
export default PermissionProvider;
