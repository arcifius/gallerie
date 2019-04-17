import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "pages/Gallery";
import Upload from "pages/Upload";
import NotFound from "pages/NotFound";

import "semantic-ui-css/semantic.min.css";
import "styles/components/App.scss";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">Gallerie</header>

      <section className="App-content">
        <Router {...props}>
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
      </section>
    </div>
  );
}

export default App;
