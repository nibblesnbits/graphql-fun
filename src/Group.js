import React, { useState } from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./relay-environment";

const groupQuery = graphql`
  query GroupQuery(
    $id: Int!
    $first: Int
    $last: Int
    $before: String
    $after: String
    $orderBy: String
  ) {
    group(id: $id) {
      name
      members(
        first: $first
        last: $last
        after: $after
        before: $before
        orderBy: $orderBy
      ) {
        totalCount
        edges {
          cursor
          node {
            appUserId
            lastName
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

function GroupQueryRenderer({ groupId, count, startAt }) {
  const [direction, setDirection] = useState(true);
  const [cursor, setCursor] = useState(startAt);
  const vars = {
    id: groupId,
    orderBy: "lastName",
  };
  const variables = direction
    ? {
        ...vars,
        after: cursor,
        first: count,
      }
    : {
        ...vars,
        before: cursor,
        last: count,
      };

  const prevClick = (next) => {
    setDirection(false);
    setCursor(next);
  };
  const nextClick = (next) => {
    setDirection(true);
    setCursor(next);
  };
  return (
    <QueryRenderer
      environment={environment}
      query={groupQuery}
      variables={variables}
      render={({ error, errors, props }) => {
        if (error) {
          debugger;
          return <div>{error.message}</div>;
        }
        if (errors) {
          debugger;
          return <div>{error.message}</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        if (props.errors) {
          debugger;
        }
        const { group } = props;
        const { members } = group;
        const { pageInfo, edges: groupUsers } = members;
        return (
          <div>
            <h4>{group.name}</h4>
            <p>{members.totalCount} members</p>
            <button
              disabled={!pageInfo.hasPreviousPage}
              onClick={() => prevClick(pageInfo.startCursor)}
            >
              Previous
            </button>
            <button
              disabled={!pageInfo.hasNextPage}
              onClick={() => nextClick(pageInfo.endCursor)}
            >
              Next
            </button>
            <ul>
              {groupUsers.map(({ node: m }) => (
                <li key={m.appUserId}>{m.lastName}</li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export default function Group({ groupId, startAt }) {
  return (
    <div>
      <div>Group View</div>
      <GroupQueryRenderer groupId={groupId} count={3} startAt={startAt} />
    </div>
  );
}
