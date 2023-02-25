import React, { memo } from 'react';
import { UnAuthorizedRouteProps } from 'types';

export const UnAuthorizedRoute = ({component, redirectToHome, isLogedIn} : UnAuthorizedRouteProps) => {

  if(!isLogedIn) {
    return <React.Fragment>{component}</React.Fragment>
  };

  redirectToHome();
  return <React.Fragment></React.Fragment>
};

export default memo(UnAuthorizedRoute);