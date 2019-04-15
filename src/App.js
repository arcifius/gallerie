import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "styles/components/App.scss";

function App() {
  /**
   * Lazily importing pages
   */
  const Gallery = lazy(() => import("pages/Gallery"));
  const Upload = lazy(() => import("pages/Upload"));
  const NotFound = lazy(() => import("pages/NotFound"));

  return (
    <div className="App">
      <header className="App-header">Gallerie</header>

      <section className="App-content">
        <Suspense fallback={<div>Loading gallerie</div>}>
          <Router>
            <Switch>
              <Route
                exact
                path={[`/gallery`, `/`]}
                component={props => <Gallery {...props} />}
              />

              <Route
                exact
                path="/new"
                component={props => <Upload {...props} />}
              />

              <Route path="*" component={props => <NotFound {...props} />} />
            </Switch>
          </Router>
        </Suspense>
      </section>
    </div>
  );
}

export default App;
