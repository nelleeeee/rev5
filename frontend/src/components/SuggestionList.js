import React, { useState, useEffect } from "react";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import { Card } from "antd";
import { useAppContext } from "store";
import useAxios from "axios-hooks";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  // const [userList, setUserList] = useState([]);

  // useEffect(() => {
  //   async function fetchUserList() {
  //     const apiUrl = "http://localhost:8000/accounts/suggestions/";
  //     const headers = { Authorization: `JWT ${jwtToken}` };
  //     try {
  //       const { data } = await Axios.get(apiUrl, { headers });
  //       setUserList(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchUserList();
  // }, []);
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });

  return (
    <div style={style}>
      {loading && <div>Loading</div>}
      {error && <div>로딩중에 에러가 발생했습니다. </div>}
      <Card title="Suggestions for you " size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
            />
          ))}
      </Card>
    </div>
  );
}
