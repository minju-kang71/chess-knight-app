import { styled } from "@mui/styles";
import { Grid } from "@mui/material";

export const StyledLayout = styled(Grid)({
  maxWidth: "800px",
  margin: "0 auto",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const StyledHeader = styled(Grid)({
  textAlign: "center",
  padding: "30px",

  "& .header-text": {
    fontSize: "1.2rem",

    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
  },
});
