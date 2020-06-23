import PropTypes from "prop-types";
import React from "react";
import { ReactRelayContext, createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

const propTypes = {
  startCursor: PropTypes.string.isRequired,
  endCursor: PropTypes.string.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
};

const contextType = ReactRelayContext;

class PageInfo extends React.Component {
  render() {
    const { startCursor, endCursor, hasNextPage, hasPreviousPage } = this.props;

    return <div>PageInfo</div>;
  }
}

PageInfo.propTypes = propTypes;
PageInfo.contextType = contextType;

export default createFragmentContainer(PageInfo, {
  pageInfo: graphql`
    fragment PageInfo_pageInfo on PageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  `,
});
