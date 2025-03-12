import React from "react";
import Board from "../components/Board/index";
import HelpButton from "../components/Buttons/Help/index";
import StartButton from "../components/Buttons/Start/index";
import { StyledLayout, StyledHeader } from "./main.styled";
import { Typography, Grid } from "@mui/material";

export default function Main() {
  return (
    <StyledLayout container>
      <Grid item xs={12}>
        <StyledHeader>
          <Typography className="header-text">Chess Knight Game</Typography>
        </StyledHeader>
      </Grid>
      <Grid item xs={12}>
        <Board />
      </Grid>
      <Grid item xs={6} sx={{ padding: "1rem" }}>
        <StartButton />
      </Grid>
      <Grid item xs={6} sx={{ padding: "1rem" }}>
        <HelpButton />
      </Grid>
    </StyledLayout>
  );
}
