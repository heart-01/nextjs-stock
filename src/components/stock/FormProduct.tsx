import React from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { TextField } from "formik-material-ui";
import Image from "next/image";
import { IRequestProduct } from "@/services/productAPI";

type Props = {
  initialValues: any;
  handleOnSubmitForm: (product: IRequestProduct, { setSubmitting }: FormikHelpers<IRequestProduct>) => void;
};

const FormProduct = ({ initialValues, handleOnSubmitForm }: Props) => {
  const router = useRouter();

  if (!initialValues) return <div>loading</div>;

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    return (
      <Form encType="multipart/form-data">
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">Stock</Typography>

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} id="name" name="name" type="text" label="Name" />
            <br />
            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="price" type="number" label="Price" />

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="stock" type="number" label="Stock" />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <Image objectFit="cover" alt="product image" src="/static/img/ic_photo.png" width={25} height={20} />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>Add Picture</span>

              <Field
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.currentTarget.files[0] as HTMLFormElement); // for upload
                  setFieldValue("previewImage", URL.createObjectURL(e.target.files[0])); // for preview image
                }}
                name="productImage"
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
              Save
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
    if (values.previewImage) {
      return <Image objectFit="contain" alt="product image" src={values.previewImage} width={100} height={100} />;
    } else if (values.image) {
      return <Image objectFit="contain" alt="product image" src={values.image} width={100} height={100} />;
    }
  };

  const validateFormEdit = (product: IRequestProduct) => {
    let errors: any = {};
    if (!product.name) errors.name = "Enter name";
    if (product.stock < 3) errors.stock = "Min stock is not lower than 3";
    if (product.price < 3) errors.price = "Min price is not lower than 3";
    return errors;
  };

  return (
    <Formik initialValues={initialValues} validate={validateFormEdit} onSubmit={handleOnSubmitForm}>
      {(props) => showForm(props)}
    </Formik>
  );
};

export default FormProduct;
