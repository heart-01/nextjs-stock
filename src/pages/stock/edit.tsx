import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { getProductById } from "@/store/actions/productAction";
import { clearProduct } from "@/store/slices/productSlice";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";

type Props = {};

const Edit = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getProductById(id as string));

    return () => {
      dispatch(clearProduct({}));
    };
  }, [dispatch]);

  return (
    <Layout>
      <div>Edit {id}</div>
    </Layout>
  );
};

export default withAuth(Edit);
