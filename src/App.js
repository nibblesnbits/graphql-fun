import PropTypes from "prop-types";
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
// import { graphql } from "babel-plugin-relay/macro";

const propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  relay: PropTypes.object.isRequired,
};

class App extends React.Component {
  render() {
    const { user, children } = this.props;
    return (
      <div data-framework="relay">
        <section className="app">
          <header className="header">
            <h1>App</h1>
            <h5>
              Current User:{" "}
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </h5>
          </header>

          {children}
        </section>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default createFragmentContainer(App, {
  user: graphql`
    fragment App_user on AppUser {
      appUserId
      firstName
      lastName
    }
  `,
});
