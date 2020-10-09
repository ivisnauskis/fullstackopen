import React from "react";
import Statistic from "./Statistic";

const StatisticsTable = ({ stats }) => {
  return (
    <table>
      <tbody>
        {stats.map((s) => (
          <Statistic key={s.text} text={s.text} value={s.value} />
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsTable;
