import React, { ElementType} from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import loadable, { LoadableComponent } from "@loadable/component";
import { Request } from "express";

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

interface HanmoaPageComponentStaticMethod {
  initStoreOnServer?: Function;
}

type HanmoaPageComponent = React.ComponentType<any>  & HanmoaPageComponentStaticMethod;

type RouteType = {
  path?: string;
  exact?: boolean;
  component?: HanmoaPageComponent;
  fetchInitialData?: (req?: Request) => Dispatch;
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
    exact: true,
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
    component: ErrorPage,
  }
];

export const renderRoutes = () => {
  const routeComponents = routes.map(({path,exact, component: Component, ...rest}) => {
    return(
      <Route
        key={path || `$$${Math.random()*1000}`}
        path={path}
        exact={ exact ? exact : true}
        render={(props) => {
          return Component ? <Component {...props} {...rest} /> : null
        }}
      />
    )
  })
  
  return (
    <Switch>
      {routeComponents}
    </Switch>
  );
}

const HanmoaRouter = () => {
  return(
    <Switch>
      {renderRoutes()}
      <Route component={ErrorPage}/>
    </Switch>
  )
}

export default HanmoaRouter;