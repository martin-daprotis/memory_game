import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "./utils/routes.js";
import { Container } from "@material-ui/core";
import MainContextProvider from "./components/MainContextProvider";

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl" style={{ maxWidth: "80%" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <MainContextProvider>
            <Router>
              <Switch>
                {Object.values(routes).map((r) => (
                  <Route
                    exact
                    path={r.path}
                    key={r.path}
                    component={r.component}
                  />
                ))}
                <Redirect to="/home" />
              </Switch>
            </Router>
          </MainContextProvider>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
