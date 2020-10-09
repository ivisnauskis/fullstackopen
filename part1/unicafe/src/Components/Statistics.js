import React from "react";
import NoStats from "./NoStats";
import StatisticsTable from "./StatisticsTable";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  const stats = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "average", value: average },
    { text: "positive", value: positive },
  ];

  if (all === 0) return <NoStats />;

  return <StatisticsTable stats={stats} />;
};

export default Statistics;
