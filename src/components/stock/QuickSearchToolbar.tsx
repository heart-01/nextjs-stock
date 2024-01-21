import React from "react";
import { Box, Fab, IconButton, TextField } from "@mui/material";
import { Add, Clear, Search } from "@mui/icons-material";
import Link from "next/link";

type Props = {
  value: string;
  onChange: () => void;
  clearSearch: () => void;
};

const QuickSearchToolbar = ({ value, onChange, clearSearch }: Props) => {
  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <TextField
        variant="standard"
        value={value}
        onChange={onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton title="Clear" aria-label="Clear" size="small" style={{ visibility: value ? "visible" : "hidden" }} onClick={clearSearch}>
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: { xs: 1, sm: "auto" },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />

      <Link href="/stock/add" passHref>
        <Fab color="primary" aria-label="add" sx={{ position: "absolute", top: 10, right: 10 }}>
          <Add />
        </Fab>
      </Link>
    </Box>
  );
};

export default QuickSearchToolbar;
