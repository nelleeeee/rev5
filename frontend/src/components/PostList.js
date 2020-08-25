import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import Axios from "axios";

// const apiUrl = "http://localhost:8000/api/post/";

function PostList() {
  const {
    store: { jwtToken },
    // dispatch,
  } = useAppContext();

  const [postList, setPostList] = useState([]);

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

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/post/",
    headers,
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `http://localhost:8000/api/post/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await Axios({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response :", response);

      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다" />
      )}
      {postList &&
        postList.map((post) => (
          <Post post={post} key={post.id} handleLike={handleLike} />
        ))}
    </div>
  );
}

export default PostList;
