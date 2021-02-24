import React, { lazy } from "react";

const routes = {
  home: {
    path: "/home",
    exact: true,
    component: lazy(() => import("../components/Login")),
  },
  schedule: {
    path: "/memory_game",
    exact: true,
    component: lazy(() => import("../components/PokeList")),
  },
};

export default routes;
