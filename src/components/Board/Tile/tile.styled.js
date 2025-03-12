import { styled } from "@mui/styles";
import { Box } from "@mui/material";

export const StyledTile = styled(Box)({
  display: "table-cell",
  paddingTop: "100%",
  verticalAlign: "middle",
  textAlign: "center",

  "& .icon": {
    fontSize: "4rem",
    position: "absolute",
    transform: "translate(-50%, -130%)",

    "@media (max-width:600px)": {
      fontSize: "2rem",
    },
  },
  "&:hover": {
    cursor: "pointer",
  },
});
