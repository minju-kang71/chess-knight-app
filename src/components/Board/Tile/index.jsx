import React from "react";
import { StyledTile } from "./tile.styled";
import { theme } from "../../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  moveKnight,
  setPossibleMoves,
} from "../../../store/features/gameSlice";

export default function Tile({
  tilePos,
  color,
  knight = false,
  target = false,
}) {
  const dispatch = useDispatch();
  const { knightPos, possibleMoves, hasGameStarted } = useSelector(
    (state) => state.gameState
  );

  const handleMove = (tile) => {
    if (hasGameStarted) {
      if (possibleMoves.includes(tile)) {
        dispatch(moveKnight(tile));
        dispatch(setPossibleMoves(knightPos));
      } else {
        alert("can't move the knight to selected position");
      }
    } else {
      alert("please start the game");
    }
  };

  if (color === "dark") {
    return (
      <StyledTile
        sx={{ backgroundColor: theme.palette.tile.dark }}
        onClick={() => {
          handleMove(tilePos);
        }}
      >
        {knight && <FontAwesomeIcon className="icon" icon={faChessKnight} />}
        {target && <FontAwesomeIcon className="icon" icon={faBullseye} />}
      </StyledTile>
    );
  }

  return (
    <StyledTile
      sx={{ backgroundColor: theme.palette.tile.light }}
      onClick={() => {
        handleMove(tilePos);
      }}
    >
      {knight && <FontAwesomeIcon className="icon" icon={faChessKnight} />}
      {target && <FontAwesomeIcon className="icon" icon={faBullseye} />}
    </StyledTile>
  );
}
