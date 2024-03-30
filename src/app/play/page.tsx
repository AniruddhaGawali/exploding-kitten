'use client';

import GameCard from '@/components/game-card';
import React, { useEffect, useState } from 'react';
import { catCards, bombCard, defuseCard, shuffleCard } from '@/data/cards';
import { Button } from '@/components/ui/button';

type Props = {};

function Page({}: Props) {
  const totalCards: Deck = [...catCards, bombCard, defuseCard, shuffleCard];
  const [randomCards, setRandomCards] = useState<Deck>([]);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentCatCard, setCurrentCatCard] = useState<Card | null>(null);
  const [currentDefuseCard, setCurrentDefuseCard] = useState<Card | null>(null);

  function random5Deck() {
    return totalCards.sort(() => Math.random() - 0.5).slice(0, 5);
  }

  useEffect(() => {
    const shuffled5Cards = random5Deck();
    setRandomCards(shuffled5Cards);
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-10">Play Page</h1>

      <div className="grid  grid-cols-1 md:grid-cols-3 justify-between items-center gap-10 min-h-screen w-full p-8">
        <div className="flex items-center justify-center md:items-start md:justify-normal">
          <section className="bg-secondary p-4 rounded-3xl  min-h-[250px] min-w-[180px] md:min-h-[400px]  md:min-w-[300px] border-4 border-primary flex items-center justify-center flex-col border-dashed">
            <h3 className="text-2xl md:text-4xl text-center">Defuse Cards</h3>
            {currentDefuseCard && <GameCard card={currentDefuseCard} />}
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
            <GameCard card={randomCards[currentCard]} />
          </section>
          <Button
            className="w-2/3 m-auto"
            onClick={() => {
              if (currentCard < 5) {
                setCurrentCard(currentCard + 1);
                if (randomCards[currentCard].type === 'cat') {
                  setCurrentCatCard(randomCards[currentCard]);
                }
                if (randomCards[currentCard].type === 'defuse') {
                  setCurrentDefuseCard(randomCards[currentCard]);
                }

                if (randomCards[currentCard].type === 'shuffle') {
                  const shuffled5Cards = random5Deck();
                  setRandomCards(shuffled5Cards);
                  setCurrentCard(0);
                  setCurrentCatCard(null);
                  setCurrentDefuseCard(null);
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
            <h3 className="text-2xl md:text-4xl text-center">Cat Cards</h3>
            {currentCatCard && <GameCard card={currentCatCard} />}
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
