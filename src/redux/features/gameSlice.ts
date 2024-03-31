import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initalState: {
  score: number;
  currentCard: number;
  cards: Deck;
  catCurrentCard: Card | null;
  defuseCurrentCard: Card | null;
  isWin: boolean;
  isGameOver: boolean;
} = {
  score: 0,
  currentCard: NaN,
  cards: [],
  catCurrentCard: null,
  defuseCurrentCard: null,
  isWin: false,
  isGameOver: false,
};

const gameSlice = createSlice({
  name: 'game slice',
  initialState: initalState,
  reducers: {
    setCurrentCard(state, action: PayloadAction<number>) {
      state.currentCard = action.payload;
      if (state.cards[action.payload].type == 'bomb') {
        state.score -= 1;
      } else if (state.cards[action.payload].type == 'defuse') {
        state.score += 1;
      }

      if (state.currentCard === 4) {
        state.isGameOver = true;
        if (state.score >= 0) {
          state.isWin = true;
        }
      }

      if (state.score === -1) {
        state.isGameOver = true;
      }
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    setCatCurrentCard(state, action: PayloadAction<Card | null>) {
      state.catCurrentCard = action.payload;
    },
    setDefuseCurrentCard(state, action: PayloadAction<Card | null>) {
      state.defuseCurrentCard = action.payload;
    },
    resetGame(state) {
      state.score = 0;
      state.currentCard = NaN;
      state.cards = [];
      state.catCurrentCard = null;
      state.defuseCurrentCard = null;
      state.isWin = false;
      state.isGameOver = false;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
