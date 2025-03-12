import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledBoard } from "./board.styled";
import Tile from "./Tile/index";
import { createBoard, getTileColor } from "../../utils/utils";
import {
  setBoard,
  setIsHintOn,
  setReachedTarget,
  setHasGameStarted,
  moveKnight,
  setPossibleMoves,
} from "../../store/features/gameSlice";

export default function Board(props) {
  const ROW = 8;
  const COLUMN = 8;
  const board = createBoard(ROW, COLUMN);
  const firstUpdate = useRef(true);
  const { knightPos, targetPos, isHintOn, hintMoves } = useSelector(
    (state) => state.gameState
  );
  const dispatch = useDispatch();

  const autoMoveKnight = (move) => {
    dispatch(moveKnight(move));
    dispatch(setPossibleMoves(knightPos));
  };

  useEffect(() => {
    if (firstUpdate) {
      dispatch(setBoard(board));
      firstUpdate.current = false;
    }

    if (isHintOn) {
      const effect = async () => {
        await autoMoveKnight(hintMoves[1]);
      };
      effect();
      dispatch(setIsHintOn(false));
    }

    if (knightPos === targetPos) {
      dispatch(setReachedTarget(true));
      alert("You won! Well done!");
      dispatch(setHasGameStarted(false));
    }
  }, [knightPos, isHintOn]);

  return (
    <StyledBoard>
      {board.map((tile) => {
        if (tile === knightPos) {
          return (
            <Tile
              key={tile}
              color={getTileColor(tile)}
              knight={true}
              tilePos={tile}
            />
          );
        }
        if (tile === targetPos) {
          return (
            <Tile
              key={tile}
              color={getTileColor(tile)}
              target={true}
              tilePos={tile}
            />
          );
        }
        return <Tile key={tile} color={getTileColor(tile)} tilePos={tile} />;
      })}
    </StyledBoard>
  );
}
