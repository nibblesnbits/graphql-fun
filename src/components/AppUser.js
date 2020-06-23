import PropTypes from "prop-types";
import React from "react";
import { ReactRelayContext, createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import UserGroups from "./UserGroups";

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  relay: PropTypes.object.isRequired,
};

const contextType = ReactRelayContext;

class AppUser extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <section className="main">
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <UserGroups user={user} />
      </section>
    );
  }
}

AppUser.propTypes = propTypes;
AppUser.contextType = contextType;

export default createFragmentContainer(AppUser, {
  user: graphql`
    fragment AppUser_user on AppUser {
      appUserId
      firstName
      lastName
    }
  `,
});
