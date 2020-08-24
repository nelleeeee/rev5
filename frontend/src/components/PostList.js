import React from "react";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";

// const apiUrl = "http://localhost:8000/api/post/";

function PostList() {
  const {
    store: { jwtToken },
    // dispatch,
  } = useAppContext();

  // const [postList, setPostList] = useState([]);

  // useEffect(() => {
  //   const headers = { Authorization: `JWT ${jwtToken}` };
  //   Axios.get(apiUrl, { headers })
  //     .then((response) => {
  //       const { data } = response;
  //       console.log("loaded response :", response);
  //       setPostList(data);
  //     })
  //     .catch((error) => {
  //       // error.response;
  //     });
  //   console.log("mounted");
  // }, []);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/post/",
    headers,
  });

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다" />
      )}
      {postList && postList.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default PostList;
