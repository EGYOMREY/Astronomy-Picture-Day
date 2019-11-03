import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Picture: React.FC = () => {
  const query = gql`
    query getPictureDay($title: String!) {
      pictureData(title: $title)
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

  const { loading, data, error } = useQuery(query, {
    variables: { title: "2019-10-05" }
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Please try again, there was an error</p>;

  return (
    <>
      <h1>Date: {data.pictureData.date}!</h1>
      <img src={data.pictureData.url} />
    </>
  );
};

export default Picture;
