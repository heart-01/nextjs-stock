import React from "react";
import Card from "@mui/material/Card";
import { Typography, Grid } from "@mui/material";
import { SvgIconProps } from "@mui/material";

type StockCardProp = {
  title: string;
  subtitle: string;
  color: string;
  Icon: React.ComponentType<SvgIconProps>;
};

const StockCard = ({ title, subtitle, color, Icon }: StockCardProp) => {
  return (
    <Card>
      <Grid container style={{ minHeight: 70 }}>
        <Grid item sx={{ flexGrow: 1, height: 100, padding: 1 }}>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {subtitle}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            backgroundColor: color,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 70,
          }}
        >
          <Icon fontSize="large" />
          {/* {React.createElement(props.icon, { fontSize: "large" })} */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default StockCard;
