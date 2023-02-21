import { useContext } from "react";
import { PermissionsContext } from 'context';

export const useClaimns = () => {
  const { userClaims } = useContext(PermissionsContext);
  return userClaims
};

export const useUserActions = () => {
  const { userActions } = useContext(PermissionsContext);
  return userActions;
}