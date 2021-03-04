import React, { ElementType} from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import loadable, {  } from "@loadable/component";
import { Request } from "express";
import { 
  HomePage,
  SignUpPage,
  CreateRoomPage,
  LoginPage,
  RoomPage,
  TopicPage,
  LoginTestPage,
  ErrorPage,
} from "@pages/index";

const LoadableHomePage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/home")
);
const LoadableSignUpPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/signup")
);
const LodabaleLoginPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/login")
);
const LodabaleRoomPage = loadable(() =>
  import(/* webpackChunkName: "HomePage" */ "../../pages/room")
);
const LodabaleErrorPage = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */ "../../pages/error")
);
const LodabaleTopicPage = loadable(() =>
  import(/* webpackChunkName: "TopicPage" */ "../../pages/topic")
);
const LodabaleLoginTestPage = loadable(() =>
  import(/* webpackChunkName: "LoginTestPage" */ "../../pages/LoginTest")
);
const LodabaleCreateRoomPage = loadable(() =>
  import(/* webpackChunkName: "CreateRoomPage" */ "../../pages/createRoom")
)

export interface HanmoaPageComponentStaticMethod {
  initStoreOnServer?: Function;
}

type HanmoaPageComponent = React.ComponentType<any>  & HanmoaPageComponentStaticMethod;

type RouteType = {
  path?: string;
  exact?: boolean;
  component?: HanmoaPageComponent;
  fetchInitialData?: HanmoaPageComponentStaticMethod["initStoreOnServer"];
};

export const routes: RouteType[] = [
  {
    path: "/",
    exact: true,
    component: LoadableHomePage,
    fetchInitialData: HomePage.initStoreOnServer,
  },
  {
    path: "/signup",
    exact: true,
    component: LoadableSignUpPage,
  },
  {
    path: "/createRoom",
    exact: true,
    component: LodabaleCreateRoomPage,
  },
  {
    path: "/login",
    exact: true,
    component: LodabaleLoginPage,
  },
  {
    path: "/room/:id",
    exact: false,
    component: LodabaleRoomPage,
  },
  {
    path: "/topic/:id",
    exact: false,
    component: LodabaleTopicPage,
  },
  {
    path: "/test/login",
    exact: true,
    component: LodabaleLoginTestPage,
  },
  {
    component: LodabaleErrorPage,
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