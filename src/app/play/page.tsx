'use client';

import GameCard from '@/components/game-card';
import React, { useEffect, useState } from 'react';
import { catCards, bombCard, defuseCard, shuffleCard } from '@/data/cards';
import { Button } from '@/components/ui/button';
import useGame from '@/redux/dispatch/useGame';

type Props = {};

function Page({}: Props) {
  const totalCards: Deck = [...catCards, bombCard, defuseCard, shuffleCard];

  const {
    gameState,
    setCards,
    setCatCurrentCard,
    setDefuseCurrentCard,
    setCurrentCard,
  } = useGame();

  const { cards, catCurrentCard, currentCard, defuseCurrentCard, score } =
    gameState;

  function random5Deck() {
    return totalCards.sort(() => Math.random() - 0.5).slice(0, 5);
  }

  useEffect(() => {
    const shuffled5Cards = random5Deck();
    setCards(shuffled5Cards);
  }, []);

  console.log(gameState);

  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-10">Play Page</h1>

      <div className="grid  grid-cols-1 md:grid-cols-3 justify-between items-center gap-10 min-h-screen w-full p-8">
        <div className="flex items-center justify-center md:items-start md:justify-normal">
          <section className="bg-secondary p-4 rounded-3xl  min-h-[250px] min-w-[180px] md:min-h-[400px]  md:min-w-[300px] border-4 border-primary flex items-center justify-center flex-col border-dashed">
            <h3 className="text-2xl md:text-4xl text-center mb-5">
              Defuse Cards
            </h3>
            {defuseCurrentCard && <GameCard card={defuseCurrentCard} />}
          </section>
        </div>

        <div className="flex gap-10 flex-col items-center justify-center md:items-start md:justify-start">
          <h2 className="text-xl md:text-2xl text-center m-auto">
            {currentCard < 5
              ? `Card ${currentCard + 1} of 5`
              : 'You have reached the end of the deck'}
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:w-1/3 xl:w-2/3">
            <GameCard card={null} />
            <GameCard card={cards[currentCard]} />
          </section>
          <Button
            className="w-2/3 m-auto"
            onClick={() => {
              if (currentCard < 5) {
                setCurrentCard(currentCard + 1);
                if (cards[currentCard].type === 'cat') {
                  setCatCurrentCard(cards[currentCard]);
                }
                if (cards[currentCard].type === 'defuse') {
                  setDefuseCurrentCard(cards[currentCard]);
                }

                if (cards[currentCard].type === 'shuffle') {
                  const shuffled5Cards = random5Deck();
                  setCards(shuffled5Cards);
                  setCurrentCard(0);
                  setCatCurrentCard(null);
                  setDefuseCurrentCard(null);
                }
              } else {
                setCurrentCard(10);
              }
            }}>
            Next Card
          </Button>
        </div>

        <div className="flex items-center justify-center md:items-end md:justify-end">
          <section className="bg-secondary p-4  rounded-3xl  min-h-[250px] min-w-[180px] md:min-h-[400px]  md:min-w-[300px] border-4 border-primary flex items-center justify-center flex-col border-dashed">
            <h3 className="text-2xl md:text-4xl text-center mb-5">Cat Cards</h3>
            {catCurrentCard && <GameCard card={catCurrentCard} />}
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
