import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/store/store";
import { getSession } from "@/store/actions/userAction";
import { isAuthenticatedSelector, isAuthenticatingSelector } from "@/store/slices/userSlice";

const isClient = () => typeof window !== "undefined"; // check if window is defined, meaning we are on the client

const withAuth = (WrappedComponent: React.FC) => (props: any) => {
  // this hoc only supports client side rendering.

  const router = useRouter();
  const { route } = router;
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isAuthenticating = useSelector(isAuthenticatingSelector);

  if (isClient()) {
    dispatch(getSession());

    if (route !== "/signIn" && route !== "/signUp") {
      if (!isAuthenticated) {
        router.push(`/signIn`);
      } else if (route === "/") {
        router.push(`/stock`); // default page after login when call root path
      }
    } else {
      if (isAuthenticated) {
        router.push(`/stock`); // default page after login
      }
    }
  }

  // If user is logged in, return original component
  return <WrappedComponent {...props} />;
};

export default withAuth;
