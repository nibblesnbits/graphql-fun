import PropTypes from "prop-types";
import React from "react";
import { ReactRelayContext, createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

const propTypes = {
  user: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const contextType = ReactRelayContext;

class GroupMember extends React.Component {
  render() {
    const { member } = this.props;

    if (!member) {
      return <div>No user found</div>;
    }

    return (
      <div>
        <h3>
          {member.firstName} {member.firstName}
        </h3>
      </div>
    );
  }
}

GroupMember.propTypes = propTypes;
GroupMember.contextType = contextType;

export default createFragmentContainer(GroupMember, {
  member: graphql`
    fragment GroupMember_member on AppUser {
      firstName
      lastName
    }
  `,
});
