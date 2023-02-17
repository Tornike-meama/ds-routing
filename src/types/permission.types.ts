export type UserPermissionReturnType = {
  userClaims: string[];
  actions: Actions
}

export type PermissionContextType = {
  userClaims: string[];
}

export type Actions = {
  get: boolean;
  add: boolean;
  update: boolean;
  remove: boolean;
  [key: string]: boolean;
};
