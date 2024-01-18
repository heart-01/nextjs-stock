import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { getProductById } from "@/store/actions/productAction";
import { IProduct, clearProduct, productSelectedSelector } from "@/store/slices/productSlice";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { Field, Form, Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { TextField } from "formik-material-ui";
import Image from "next/image";

type Props = {};

const Edit = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const product: any = useSelector(productSelectedSelector);

  useEffect(() => {
    dispatch(getProductById(id as string));

    return () => {
      dispatch(clearProduct({}));
    };
  }, [dispatch]);

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Edit Stock
            </Typography>

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} id="name" name="name" type="text" label="Name" />
            <br />
            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="price" type="number" label="Price" />

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="stock" type="number" label="Stock" />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <Image objectFit="cover" alt="product image" src="/static/img/ic_photo.png" width={25} height={20} />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>Add Picture</span>

              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue("file_obj", URL.createObjectURL(e.target.files[0])); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button disabled={!isValid} fullWidth variant="contained" color="primary" type="submit" sx={{ marginRight: 1 }}>
              Edit
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.push("/stock")}>
              Cancle
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <Image objectFit="contain" alt="product image" src={values.file_obj} width={100} height={100} />;
    } else if (values.image) {
      return <Image objectFit="contain" alt="product image" src={values.image} width={100} height={100} />;
    }
  };

  return (
    <Layout>
      {product && (
        <Formik initialValues={product} onSubmit={(values, { setSubmitting }) => {}}>
          {(props) => showForm(props)}
        </Formik>
      )}
    </Layout>
  );
};

export default withAuth(Edit);
