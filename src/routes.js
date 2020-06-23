import Route from "found/Route";
import makeRouteConfig from "found/makeRouteConfig";
import React from "react";
import { graphql } from "react-relay";
// import { graphql } from "babel-plugin-relay/macro";
import App from "./App";
import UserGroups from "./components/UserGroups";

const UserGroupsQuery = graphql`
  query routes_UserGroups_Query($id: Int!) {
    user(id: $id) {
      ...UserGroups_user
    }
  }
`;

const AppQuery = graphql`
  query routes_App_Query($id: Int!) {
    appUser: user(id: $id) {
      ...App_user
    }
  }
`;

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={AppQuery}
    prepareVariables={(params) => ({ ...params, id: 80765 })}
  >
    <Route
      Component={UserGroups}
      query={UserGroupsQuery}
      prepareVariables={(params) => ({ ...params, id: 80765 })}
    />
  </Route>
);
