import React from "react";
import Layout from "@/components/layouts/Layout";
import { useSelector } from "react-redux";
import { setTestUser, clearUser, signUp, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";

type Props = {};

const Index = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div>{user.username}</div>
      <button onClick={() => dispatch(setTestUser({ username: "Test" }))}>Set Username</button>
      <button onClick={() => dispatch(clearUser({}))}>Clear</button>
      <button onClick={() => dispatch(signUp({ name: "admin", email: "admin@email.com", username: "admin", password: "password" }))}>SignUp</button>
    </Layout>
  );
};

export default Index;
