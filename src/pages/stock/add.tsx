import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { addProduct } from "@/store/actions/productAction";
import { clearProduct } from "@/store/slices/productSlice";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { FormikHelpers } from "formik";
import { IRequestProduct } from "@/services/productAPI";
import FormProduct from "@/components/stock/FormProduct";

type Props = {};

const Add = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearProduct({}));
    };
  }, [dispatch]);

  const handleOnSubmitFormAdd = async (product: IRequestProduct, { setSubmitting }: FormikHelpers<IRequestProduct>) => {
    let productForm = new FormData();
    productForm.append("name", product.name);
    productForm.append("price", String(product.price));
    productForm.append("stock", String(product.stock));
    if (product.file) {
      productForm.append("image", product.file);
    }

    await dispatch(addProduct(productForm));
    router.push("/stock");
    setSubmitting(false);
  };

  return (
    <Layout>
      <FormProduct
        initialValues={{
          name: "",
          price: "",
          stock: "",
        }}
        handleOnSubmitForm={handleOnSubmitFormAdd}
      />
    </Layout>
  );
};

export default withAuth(Add);
