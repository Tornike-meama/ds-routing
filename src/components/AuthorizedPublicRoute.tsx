import React, { memo } from 'react';
import { AuthorizedPublicRouteProps } from 'types/wrapper.types';

export const AuthorizedPublicRoute = ({component, unAuthorizedPage, isLogedIn}: AuthorizedPublicRouteProps) => {
 
  if(!isLogedIn) {
    return <React.Fragment>{unAuthorizedPage}</React.Fragment>
  }
  
  return <React.Fragment>{component}</React.Fragment>
};

export default memo(AuthorizedPublicRoute);