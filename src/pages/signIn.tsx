import React from "react";
import { createGlobalStyle } from "styled-components";
import { Formik, Form, Field, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "src/redux/store";
import { signIn } from "@/store/slices/userSlice";
import withAuth from "@/hoc/withAuth";

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    position: relative;
    margin: 0;
    background-size: cover;
    background-image: url("/static/img/bg1.jpg");
    text-align: center;
  }
`;

type Props = {};

const SignIn = ({}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showForm = ({ values, setFieldValue, isValid, dirty, handleSubmit }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field component={TextField} id="username" name="username" label="Username" margin="normal" required fullWidth autoComplete="name" autoFocus />
        <Field component={TextField} id="password" name="password" label="Password" margin="normal" required fullWidth type="password" autoComplete="current-password" />
        <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" color="primary">
          SignIn
        </Button>
        <Button fullWidth size="small" color="primary" onClick={() => router.push("/signUp")}>
          signUp
        </Button>
      </Form>
    );
  };

  return (
    <>
      <GlobalStyle />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 300 }} image="/static/img/signIn.jpeg" title="Contemplative Reptile" />
          <CardContent>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values) => {
                const response = await dispatch(signIn(values));
                if (signIn.fulfilled.match(response)) {
                  router.push("/stock");
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default withAuth(SignIn);
