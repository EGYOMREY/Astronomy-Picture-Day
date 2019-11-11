import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { Header, Title, DateWrapper, PictureContainer, Error } from "./Styles";
import Loader from "../Loader/Loader";

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

  const video = data && data.pictureData.url.includes("youtube");
  return (
    <>
      <Header>
        <Title>Astronomy Picture day</Title>
      </Header>
      {error && (
        <Error>
          <p>Please try again, there was an error</p>;
        </Error>
      )}
      <DateWrapper>
        <h2> Select a date!</h2>
        <DatePicker
          selected={startDate}
          maxDate={addDays(new Date(), 0)}
          onChange={(date: Date) => setStartDate(date)}
        />
        {loading && <Loader />}
      </DateWrapper>
      {data && data.pictureData.url && !video && (
        <PictureContainer>
          <h1>Date: {data.pictureData.date}!</h1>
          <img src={data.pictureData.url} />
        </PictureContainer>
      )}
      {video && (
        <iframe width="420" height="315" src={data.pictureData.url}></iframe>
      )}
    </>
  );
};

export default Picture;
