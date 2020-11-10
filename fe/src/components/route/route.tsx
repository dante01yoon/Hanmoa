import React, { ElementType} from "react";
import { Route } from "react-router";
import { Dispatch } from "redux";
import loadable from "@loadable/component";

const HomePage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/home")
);
const SignUpPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/signup")
);
const LoginPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/login")
);
const RoomPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/room")
);
const ErrorPage = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */ "../../pages/error")
);
const TopicPage = loadable(() =>
  import(/* webpackChunkName: "TopicPage" */ "../../pages/topic")
);
const LoginTestPage = loadable(() =>
  import(/* webpackChunkName: "LoginTestPage" */ "../../pages/LoginTest")
);

type RouteType = {
  path: string;
  exact?: boolean;
  component?: ElementType;
  fetchInitialData?: (req?: any) => Dispatch;
};
export const routes: RouteType[] = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/signup",
    exact: true,
    component: SignUpPage,
  },
  {
    path: "/login",
    exact: false,
    component: LoginPage,
  },
  {
    path: "/room/:id",
    exact: false,
    component: RoomPage,
  },
  {
    path: "/topic/:id",
    exact: false,
    component: TopicPage,
  },
  {
    path: "/test/login",
    exact: true,
    component: LoginTestPage,
  },
  {
    path: "/room/:id",
    exact: false,
    component: RoomPage,
  },
];

const renderRoutes = () => {
  const routeComponentArray = routes.map(({path,exact, component: Component, ...rest}) => (
      <Route
        key={path}
        exact={exact || false}
        render={(props) => {
          return Component ? <Component {...props} {...rest} /> : null
        }}
      />
  ))
  routeComponentArray.push(<Route render={() => <ErrorPage />} />);
  return routeComponentArray; 
}

export default renderRoutes;