import React from "react";
import Layout from "@/components/layouts/Layout";
import { useSelector } from "react-redux";
import { setTestUser, clearUser, signUp, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/hoc/withAuth";

type Props = {};

const Index = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div>{user.username}</div>
    </Layout>
  );
};

export default withAuth(Index);
