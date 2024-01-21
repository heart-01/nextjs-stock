import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { editProduct, getProductById } from "@/store/actions/productAction";
import { clearProduct, productSelectedSelector } from "@/store/slices/productSlice";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { IRequestProduct } from "@/services/productAPI";
import FormProduct from "@/components/stock/FormProduct";

type Props = {};

const Edit = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query as { id: string };
  const product: any = useSelector(productSelectedSelector);

  useEffect(() => {
    dispatch(getProductById(id as string));

    return () => {
      dispatch(clearProduct({}));
    };
  }, [dispatch]);

  const handleOnSubmitFormEdit = async (product: IRequestProduct, { setSubmitting }: FormikHelpers<IRequestProduct>) => {
    let productForm = new FormData();
    productForm.append("name", product.name);
    productForm.append("price", String(product.price));
    productForm.append("stock", String(product.stock));
    if (product.file) {
      productForm.append("image", product.file);
    }

    await dispatch(editProduct({ id, product: productForm }));
    router.push("/stock");
    setSubmitting(false);
  };

  return (
    <Layout>
      <FormProduct initialValues={product} handleOnSubmitForm={handleOnSubmitFormEdit} />
    </Layout>
  );
};

export default withAuth(Edit);
