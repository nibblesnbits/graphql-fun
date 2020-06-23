// import PropTypes from "prop-types";
// import React from "react";
// import { ReactRelayContext, createFragmentContainer } from "react-relay";
// import { graphql } from "react-relay";
// // import { graphql } from "babel-plugin-relay/macro";
// import GroupMembers from "./GroupMembers";

// const propTypes = {
//   user: PropTypes.object.isRequired,
//   relay: PropTypes.object.isRequired,
// };

// const contextType = ReactRelayContext;

// class Group extends React.Component {
//   render() {
//     const { group } = this.props;

//     if (!group) {
//       return <div>No group found</div>;
//     }

//     return (
//       <section className="group">
//         <h3>{group.name}</h3>
//         <GroupMembers group={group} />
//       </section>
//     );
//   }
// }

// Group.propTypes = propTypes;
// Group.contextType = contextType;

// export default createFragmentContainer(Group, {
//   group: graphql`
//     fragment Group_group on Group {
//       name
//       ...GroupMembers_group
//     }
//   `,
// });
