import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getProducts } from "@/store/actions/productAction";
import { useSelector } from "react-redux";
import { productListSelector, productAllTotalSelector } from "@/store/slices/productSlice";
import { RenderTableProduct } from "@/components/stock/RenderTableProduct";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { DataGrid } from "@mui/x-data-grid";

const PAGE = 0;
const PAGE_LIMIT = 10;
type Props = {};

const Index = ({}: Props) => {
  const dispatch = useAppDispatch();
  const productsList = useSelector(productListSelector);
  const productAllTotal = useSelector(productAllTotalSelector);
  const [paginationModel, setPaginationModel] = React.useState({ page: PAGE, pageSize: PAGE_LIMIT });

  const { columns, renderDialog } = RenderTableProduct({});

  useEffect(() => {
    dispatch(getProducts({ page: PAGE, limit: PAGE_LIMIT }));
  }, [dispatch]);

  const handleOnClickTablePagination = (params: any) => {
    setPaginationModel(params);
    dispatch(getProducts({ page: params.page, limit: params.pageSize }));
  };

  return (
    <Layout>
      <DataGrid
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={productsList ?? []}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={productAllTotal}
        pageSizeOptions={[10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={handleOnClickTablePagination}
      />
      {renderDialog()}
    </Layout>
  );
};

export default withAuth(Index);
