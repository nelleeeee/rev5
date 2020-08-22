import React from "react";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import { Card } from "antd";

export default function SuggestionList({ style }) {
  return (
    <div style={style}>
      <Card title="Suggestions for you " size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}
