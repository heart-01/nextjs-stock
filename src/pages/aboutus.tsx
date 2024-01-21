import React from "react";
import { Paper } from "@mui/material";
import Iframe from "react-iframe";
import Layout from "@/components/layouts/Layout";
import withAuth from "@/hoc/withAuth";

type Props = {};

const AboutUs = ({}: Props) => {
  return (
    <Layout>
      <Paper sx={{ height: "86vh" }}>
        <Iframe url="https://example.com" width="100%" height="100%" id="myId" display="inline" position="relative" />
      </Paper>
    </Layout>
  );
};

export default withAuth(AboutUs);
