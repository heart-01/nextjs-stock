import React, { useEffect } from "react";
import Layout from "@/components/layouts/Layout";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/hoc/withAuth";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getProducts } from "@/store/actions/productAction";
import { productSelector } from "@/store/slices/productSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import { isEmpty } from "lodash";

const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    disableColumnMenu: true,
    headerName: "IMG",
    field: "image",
    width: 80,
    renderCell: ({ value }: GridRenderCellParams) => {
      if (isEmpty(value)) {
        return <Box>-</Box>;
      } else {
        return <Image height={500} width={500} alt="product image" src={value} style={{ width: 70, height: 70, borderRadius: "5%" }} />;
      }
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    editable: false,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 150,
    editable: false,
  },
];

type Props = {};

const Index = ({}: Props) => {
  const dispatch = useAppDispatch();
  const productsList = useSelector(productSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Layout>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={productsList ?? []}
          columns={productColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Layout>
  );
};

export default withAuth(Index);
