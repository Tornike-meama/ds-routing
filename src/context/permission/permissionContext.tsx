import { createContext } from "react";
import { PermissionContextType } from "types";

export const PermissionsContext = createContext<PermissionContextType>({
  userClaims: [],
  userActions: {},
});