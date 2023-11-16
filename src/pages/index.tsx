import React from "react";
import Layout from "@/components/layouts/Layout";
import { useSelector } from "react-redux";
import { setTestUser, clearUser, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/hoc/withAuth";

type Props = {};

const Index = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div>{user.username}</div>
      <button onClick={() => dispatch(setTestUser({ username: "Test" }))}>Set Username</button>
      <button onClick={() => dispatch(clearUser({}))}>Clear</button>
    </Layout>
  );
};

export default withAuth(Index);
