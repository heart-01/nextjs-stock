import React from "react";
import Image from "next/image";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useRenderDialog } from "./RenderDialog";
import { NumericFormat } from "react-number-format";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Props = {};

export const RenderTableProduct = (props: Props) => {
  const router = useRouter();
  const { setIsOpenDialog, setSelectedProduct, renderDialog } = useRenderDialog({});

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      headerName: "NAME",
      field: "name",
      width: 150,
      editable: false,
    },
    {
      headerName: "IMG",
      field: "image",
      width: 80,
      disableColumnMenu: true,
      renderCell: ({ value }: GridRenderCellParams) => {
        if (isEmpty(value)) {
          return <Box>-</Box>;
        } else {
          return (
            <Zoom>
              <Image height={500} width={500} alt="product image" src={value} style={{ width: 70, height: 70, borderRadius: "5%" }} />
            </Zoom>
          );
        }
      },
    },
    {
      headerName: "STOCK",
      field: "stock",
      width: 150,
      editable: false,
      renderCell: ({ value }: GridRenderCellParams) => {
        return (
          <Box>
            <Typography variant="body1">
              <NumericFormat value={value} displayType={"text"} thousandSeparator={true} decimalScale={0} fixedDecimalScale={true} />
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: "PRICE",
      field: "price",
      width: 150,
      editable: false,
      renderCell: ({ value }: GridRenderCellParams) => {
        return (
          <Box>
            <Typography variant="body1">
              <NumericFormat value={value} displayType={"text"} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix="฿" />
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: "TIME",
      field: "created",
      width: 220,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Stack direction="row">
          <IconButton aria-label="edit" size="large" onClick={() => router.push("/stock/edit?id=" + row.id)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setIsOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return { columns, renderDialog };
};
