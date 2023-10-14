import React from "react";
import { Formik, Form, Field, FormikProps } from "formik";

type Props = {};

const signUp = ({}: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default signUp;
