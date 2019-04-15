import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";

import "styles/components/BackButton.scss";

function BackButton(props) {
  function goBack() {
    props.history.push(props.target);
  }

  return (
    <Button
      icon="arrow left"
      circular
      inverted
      size="huge"
      onClick={goBack}
      className="BackButton"
    />
  );
}

BackButton.propTypes = {
  history: PropTypes.object.isRequired,
  target: PropTypes.string.isRequired
};

export default withRouter(BackButton);
