import React, { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getProducts, getProductByIds } from "@/store/actions/productAction";
import { useSelector } from "react-redux";
import { productListSelector, productAllTotalSelector } from "@/store/slices/productSlice";
import { RenderTableProduct } from "@/components/stock/RenderTableProduct";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/layouts/Layout";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Input } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { debounce } from "lodash";

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

  const loadProductListByNameDebouncer = debounce((productName) => {
    if (productName.length >= 3) {
      dispatch(getProducts({ name: productName, page: PAGE, limit: PAGE_LIMIT }));
    } else if (productName === "") {
      dispatch(getProducts({ page: PAGE, limit: PAGE_LIMIT }));
    }
  }, INPUT_DEBOUNCING_TIME);

  const handleOnChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
    loadProductListByNameDebouncer(e.target.value);
  };

  const handleOnClickTablePagination = (params: any) => {
    const name = searchProduct;
    setPaginationModel(params);
    dispatch(getProducts({ name, page: params.page, limit: params.pageSize }));
  };

  const renderSearchToolbar = () => {
    return (
      <Box sx={{ p: 0.5, pb: 0 }}>
        <Input placeholder="Search..." onChange={handleOnChangeInputSearch} startAdornment={<SearchOutlinedIcon />} />
      </Box>
    );
  };

  return (
    <Layout>
      {renderSearchToolbar()}
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
