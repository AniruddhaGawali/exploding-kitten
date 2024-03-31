import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initalState: {
  score: number;
  currentCard: number;
  cards: Deck;
  catCurrentCard: Card | null;
  defuseCurrentCard: Card | null;
} = {
  score: 0,
  currentCard: 0,
  cards: [],
  catCurrentCard: null,
  defuseCurrentCard: null,
};

const gameSlice = createSlice({
  name: 'game slice',
  initialState: initalState,
  reducers: {
    setCurrentCard(state, action: PayloadAction<number>) {
      state.currentCard = action.payload;
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
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
