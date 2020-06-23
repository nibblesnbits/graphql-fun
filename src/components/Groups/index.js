import PropTypes from "prop-types";
import React from "react";
import { ReactRelayContext, createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

const propTypes = {
  user: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const contextType = ReactRelayContext;

class Groups extends React.Component {
  render() {
    const { user } = this.props;
    const { groups } = user;

    if (!groups) {
      return <div>No groups found</div>;
    }

    return (
      <section className="main">
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p>{groups.totalCount} groups</p>
        <ul className="todo-list">
          {groups.edges.map(({ node: group }) => (
            <div key={group.groupId}>{group.name}</div>
            // <Group key={group.groupId} group={group} />
          ))}
        </ul>
      </section>
    );
  }
}

Groups.propTypes = propTypes;
Groups.contextType = contextType;

export default createFragmentContainer(Groups, {
  groups: graphql`
    fragment Groups_groups on GroupConnection {
      edges {
        node {
          name
        }
      }
    }
  `,
});
