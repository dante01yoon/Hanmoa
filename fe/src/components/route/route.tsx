import React, { FC, ReactType } from "react";
import { Switch, Route } from "react-router";
import { Dispatch } from "redux";
import loadable from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

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
  component?: ReactType;
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

const HanmoaRouter: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact || false}
            render={(props) => {
              return Component ? <Component {...props} {...rest} /> : null;
            }}
          />
        ))}
        <Route render={() => <ErrorPage />} />
      </Switch>
    </BrowserRouter>
  );
};

export default HanmoaRouter;