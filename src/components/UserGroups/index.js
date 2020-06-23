import PropTypes from "prop-types";
import React from "react";
import { ReactRelayContext, createPaginationContainer } from "react-relay";
import { graphql } from "react-relay";
// import { graphql } from "babel-plugin-relay/macro";
// import Group from "./Group";

const propTypes = {
  user: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const contextType = ReactRelayContext;

class UserGroups extends React.Component {
  _loadMore() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(3, (error) => {
      debugger;
      console.log(error);
    });
  }

  render() {
    const {
      groupUser: { groups },
    } = this.props;
    const hasMore = this.props.relay.hasMore();

    if (!groups) {
      return <div>No groups found</div>;
    }

    return (
      <section className="user-groups">
        <p>{groups.totalCount} groups</p>
        <ul className="group-list">
          {groups.edges.map(({ node: group }) => (
            <div key={group.groupId}>{group.name}</div>
            // <Group key={group.groupId} group={group} />
          ))}
        </ul>
        <button disabled={!hasMore} onPress={() => this._loadMore()}>
          More
        </button>
      </section>
    );
  }
}

UserGroups.propTypes = propTypes;
UserGroups.contextType = contextType;

export default createPaginationContainer(
  UserGroups,
  {
    user: graphql`
      fragment UserGroups_user on AppUser
        @argumentDefinitions(
          count: { type: Int, defaultValue: 3 }
          cursor: { type: ID }
          orderby: { type: String, defaultValue: "name" }
        ) {
        groups(first: $count, after: $cursor, orderBy: $orderBy)
          @connection(key: "UserGroups_groups") {
          edges {
            node {
              groupId
              name
              # ...Group_group
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.user && props.user.groups;
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        orderBy: fragmentVariables.orderBy,
        id: fragmentVariables.id,
      };
    },
    query: graphql`
      query UserGroupsPaginationQuery(
        $count: Int!
        $cursor: ID
        $orderBy: String
        $id: Int!
      ) {
        user(id: $id) {
          ...UserGroups_user
            @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
        }
      }
    `,
  }
);
