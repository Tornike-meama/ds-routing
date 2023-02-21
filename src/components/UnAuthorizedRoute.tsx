import React, { memo } from 'react';
import { UnAuthorizedRouteProps } from 'types';

export const UnAuthorizedRoute = ({homePageComponent, component, redirectToHome, isLogedIn} : UnAuthorizedRouteProps) => {

  if(!isLogedIn) {
    return <React.Fragment>{component}</React.Fragment>
  };

  redirectToHome();
  return <React.Fragment>{homePageComponent}</React.Fragment>
};

export default memo(UnAuthorizedRoute);