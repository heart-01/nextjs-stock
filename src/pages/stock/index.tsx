import React, { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getProducts, getProductByIds } from "@/store/actions/productAction";
import { useSelector } from "react-redux";
import { productListSelector, productAllTotalSelector } from "@/store/slices/productSlice";
import { RenderTableProduct } from "@/components/stock/RenderTableProduct";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";
import QuickSearchToolbar from "@/components/stock/QuickSearchToolbar";

const PAGE = 0;
const PAGE_LIMIT = 10;
const INPUT_DEBOUNCING_TIME = 500;

type Props = {};

const Index = ({}: Props) => {
  const dispatch = useAppDispatch();
  const productsList = useSelector(productListSelector);
  const productAllTotal = useSelector(productAllTotalSelector);
  const [searchProduct, setSearchProduct] = React.useState("");
  const [paginationModel, setPaginationModel] = React.useState({ page: PAGE, pageSize: PAGE_LIMIT });

  const { columns, renderDialog } = RenderTableProduct({});

  useEffect(() => {
    dispatch(getProducts({ page: PAGE, limit: PAGE_LIMIT }));

    // test call getProductByIds
    // dispatch(getProductByIds(["1", "2", "3"]));
  }, [dispatch]);

  useEffect(() => {
    loadProductListByNameDebouncer(searchProduct);
  }, [searchProduct]);

  const loadProductListByNameDebouncer = debounce((productName) => {
    if (productName.length >= 1) {
      dispatch(getProducts({ name: productName, page: PAGE, limit: PAGE_LIMIT }));
    } else if (productName === "") {
      dispatch(getProducts({ page: PAGE, limit: PAGE_LIMIT }));
    }
  }, INPUT_DEBOUNCING_TIME);

  const handleOnClickTablePagination = (params: any) => {
    setPaginationModel(params);
    dispatch(getProducts({ name: searchProduct, page: params.page, limit: params.pageSize }));
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
        slots={{ toolbar: QuickSearchToolbar }}
        slotProps={{
          toolbar: {
            value: searchProduct,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              setSearchProduct(e.target.value);
            },
            clearSearch: () => {
              setSearchProduct("");
            },
          },
        }}
      />
      {renderDialog()}
    </Layout>
  );
};

export default withAuth(Index);
