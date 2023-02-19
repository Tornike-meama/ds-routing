import { useContext } from "react";
import { PermissionsContext } from 'context';

export const useClaimns = () => {
  const { userClaims } = useContext(PermissionsContext);
  return userClaims
};