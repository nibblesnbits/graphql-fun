import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./relay-environment";

const groupsQuery = graphql`
  query AppQuery {
    groups {
      name
      members {
        firstName
      }
    }
  }
`;

export default class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={groupsQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              <ul>
                {props.groups.map((g) => (
                  <li key={g.name}>
                    {g.name}:{" "}
                    <ul>
                      {g.members.map((m) => (
                        <li key={m.firstName}>{m.firstName}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      />
    );
  }
}
