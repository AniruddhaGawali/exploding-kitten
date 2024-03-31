'use client';

import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { gameActions } from '@/redux/features/gameSlice';

const useGame = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  const setCurrentCard = (currentCard: number) => {
    dispatch(gameActions.setCurrentCard(currentCard));
  };

  const setCards = (cards: Card[]) => {
    dispatch(gameActions.setCards(cards));
  };

  const setCatCurrentCard = (catCurrentCard: Card | null) => {
    dispatch(gameActions.setCatCurrentCard(catCurrentCard));
  };

  const setDefuseCurrentCard = (defuseCurrentCard: Card | null) => {
    dispatch(gameActions.setDefuseCurrentCard(defuseCurrentCard));
  };

  return {
    gameState,
    setCurrentCard,
    setCards,
    setCatCurrentCard,
    setDefuseCurrentCard,
  };
};

export default useGame;
