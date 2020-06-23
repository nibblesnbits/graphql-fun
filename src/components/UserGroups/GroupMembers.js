// import PropTypes from "prop-types";
// import React from "react";
// import { ReactRelayContext, createPaginationContainer } from "react-relay";
// import { graphql } from "react-relay";
// // import { graphql } from "babel-plugin-relay/macro";
// import GroupMember from "./GroupMember";

// const propTypes = {
//   user: PropTypes.object.isRequired,
//   relay: PropTypes.object.isRequired,
// };

// const contextType = ReactRelayContext;

// class GroupMembers extends React.Component {
//   render() {
//     const { group } = this.props;
//     const { members } = group;

//     if (!members) {
//       return <div>No members found</div>;
//     }

//     return (
//       <section className="group-members">
//         <p>{members.totalCount} groups</p>
//         <ul className="todo-list">
//           {members.edges.map(({ node: member }) => (
//             <GroupMember key={member.appUserId} member={member} />
//           ))}
//         </ul>
//       </section>
//     );
//   }
// }

// GroupMembers.propTypes = propTypes;
// GroupMembers.contextType = contextType;

// export default createPaginationContainer(
//   GroupMembers,
//   {
//     group: graphql`
//       fragment GroupMembers_group on Group
//         @argumentDefinitions(
//           count: { type: Int, defaultValue: 3 }
//           cursor: { type: ID }
//           orderby: { type: String, defaultValue: "lastName" }
//         ) {
//         members(first: $count, after: $cursor, orderBy: $orderBy)
//           @connection(key: "GroupMembers_members") {
//           edges {
//             node {
//               appUserId
//               ...GroupMember_member
//             }
//           }
//         }
//       }
//     `,
//   },
//   {
//     direction: "forward",
//     query: graphql`
//       query GroupMembersForwardQuery(
//         $count: Int!
//         $cursor: String
//         $orderBy: String
//         $id: Int!
//       ) {
//         membersGroup: group(id: $id) {
//           ...GroupMembers_group
//             @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
//         }
//       }
//     `,
//     getConnectionFromProps(props) {
//       return props.group && props.group.members;
//     },
//     getFragmentVariables(previousVariables, totalCount) {
//       return {
//         ...previousVariables,
//         count: totalCount,
//       };
//     },
//     getVariables(props, paginationInfo, fragmentVariables) {
//       return {
//         count: paginationInfo.count,
//         after: paginationInfo.cursor,
//       };
//     },
//   }
// );
