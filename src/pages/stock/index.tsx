import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getProducts } from "@/store/actions/productAction";
import { useSelector } from "react-redux";
import { productSelector } from "@/store/slices/productSlice";
import { RenderTableProduct } from "@/components/stock/RenderTableProduct";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { DataGrid } from "@mui/x-data-grid";

type Props = {};

const Index = ({}: Props) => {
  const dispatch = useAppDispatch();
  const productsList = useSelector(productSelector);
  const { columns, renderDialog } = RenderTableProduct({});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Layout>
      <DataGrid
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={productsList ?? []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {renderDialog()}
    </Layout>
  );
};

export default withAuth(Index);
