import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

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

  const [startDate, setStartDate] = useState(new Date());

  let queryDate =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();

  const { loading, data, error } = useQuery(query, {
    variables: { title: queryDate }
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Please try again, there was an error</p>;

  return (
    <>
      <DatePicker
        selected={startDate}
        maxDate={addDays(new Date(), 0)}
        onChange={(date: Date) => setStartDate(date)}
      />
      <h1>Date: {data.pictureData.date}!</h1>
      <img src={data.pictureData.url} />
    </>
  );
};

export default Picture;
