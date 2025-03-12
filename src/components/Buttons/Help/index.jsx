import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getHintMoves } from "../../../store/features/gameSlice";

export default function HelpButton() {
  const dispatch = useDispatch();

  const handleHelp = () => {
    dispatch(getHintMoves());
  };

  return (
    <Button variant="outlined" onClick={handleHelp} sx={{ width: "80%" }}>
      Help
    </Button>
  );
}
