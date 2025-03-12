import { styled } from "@mui/styles";
import { Box } from "@mui/material";

export const StyledBoard = styled(Box)((props) => ({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "auto",
}));
