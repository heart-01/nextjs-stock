import React, { useState } from "react";
import Image from "next/image";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { IResponseProduct } from "@/services/productAPI";
import { useAppDispatch } from "@/store/store";
import { deleteProduct } from "@/store/actions/productAction";

type ProductData = IResponseProduct;
type Props = {};

export const useRenderDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductData | null>(null);

  const handleOnClickDeleteConfirm = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(String(selectedProduct.id)));
      setIsOpenDialog(false);
    }
  };

  const renderDialog = () =>
    selectedProduct && (
      <Dialog open={isOpenDialog} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">
          {selectedProduct.image && (
            <>
              <Image width={100} height={100} objectFit="cover" alt="product image" src={selectedProduct.image} style={{ width: 100, borderRadius: "5%" }} />
              <br />
            </>
          )}
          Confirm to delete the product? : {selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">You cannot restore deleted product.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleOnClickDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );

  return { renderDialog, setIsOpenDialog, setSelectedProduct };
};
