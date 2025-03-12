import { createSlice } from "@reduxjs/toolkit";
import {
  getStartPos,
  getPossibleMoves,
  findMinimumMoves,
} from "../../utils/utils";

const initialState = {
  board: [],
  knightPos: "0",
  targetPos: "1",
  possibleMoves: [],
  reachedTarget: false,
  hasGameStarted: false,
  isHintOn: false,
  hintMoves: [],
  hintIdx: 0,
};

export const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setBoard: (state, { payload: board }) => {
      state.board = board;
    },
    setHasGameStarted: (state, { payload: hasGameStarted }) => {
      state.hasGameStarted = hasGameStarted;
    },
    setReachedTarget: (state, { payload: reachedTarget }) => {
      state.reachedTarget = reachedTarget;
    },
    moveKnight: (state, { payload: move }) => {
      state.knightPos = move;
    },
    setStartPosition: (state) => {
      const positions = getStartPos(state.board);
      state.knightPos = positions[0];
      state.targetPos = positions[1];
      state.possibleMoves = getPossibleMoves(state.knightPos);
    },
    setPossibleMoves: (state) => {
      state.possibleMoves = getPossibleMoves(state.knightPos);
    },
    getHintMoves: (state) => {
      state.hintMoves = findMinimumMoves(state.knightPos, state.targetPos);
      state.isHintOn = true;
    },
    setIsHintOn: (state, { payload: isHintOn }) => {
      state.isHintOn = isHintOn;
    },
  },
});

export const {
  startGame,
  setBoard,
  setHasGameStarted,
  setReachedTarget,
  setStartPosition,
  setPossibleMoves,
  getHintMoves,
  moveKnight,
  setIsHintOn,
  setHintIdx,
} = gameSlice.actions;

export default gameSlice.reducer;
