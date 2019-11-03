import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Picture = () => {
  const query = gql`
    query getPictureDay($title: String!) {
      pictureData
        @rest(
          path: "?date={args.title}&api_key=LQlfelUbO5f0rqk5UAS9REF5XhtwkG6oFX5TWOsc"
        ) {
        date
        explanation
        hdurl
        media_type
        title
        url
      }
    }
  `;

  const { loading, data } = useQuery(query, {
    variables: { title: "2019-11-01" }
  });
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello {data.date}!</h1>;
};

export default Picture;
