import React from "react";
import { createGlobalStyle } from "styled-components";
import { Formik, Form, Field, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { signUp } from "@/store/slices/userSlice";

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

const SignUp = ({}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showForm = ({ values, setFieldValue, isValid, dirty, handleSubmit }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field component={TextField} id="name" name="name" label="Name" margin="normal" required fullWidth autoComplete="name" autoFocus />
        <Field component={TextField} id="email" name="email" label="Email" margin="normal" required fullWidth autoComplete="email" />
        <Field component={TextField} id="username" name="username" label="Username" margin="normal" required fullWidth autoComplete="name" />
        <Field component={TextField} id="password" name="password" label="Password" margin="normal" required fullWidth type="password" autoComplete="new-password" />
        <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" color="primary">
          SignUp
        </Button>
        <Button fullWidth size="small" color="primary" onClick={() => router.push("/signIn")}>
          SignIn
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
          <CardMedia sx={{ height: 300 }} image="/static/img/signup.jpeg" title="Contemplative Reptile" />
          <CardContent>
            <Formik
              initialValues={{ name: "", email: "", username: "", password: "" }}
              onSubmit={async (values) => {
                const response = await dispatch(signUp(values));
                if (signUp.fulfilled.match(response)) {
                  router.push("/signIn");
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

export default SignUp;

/* HTML Form integrated with Formik
<Formik
  initialValues={{ email: "123", password: "22" }}
  onSubmit={(value) => {
    alert(JSON.stringify(value));
  }}
>
  {({ handleChange, handleSubmit, values }) => (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={values.email} name="email" placeholder="email" />
      <input onChange={handleChange} value={values.password} name="password" type="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  )}
</Formik> 
*/
