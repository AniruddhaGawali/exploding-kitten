import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  card: Card | null;
};

function GameCard({ card }: Props) {
  if (!card)
    return (
      <div className="bg-secondary p-4 rounded-3xl shadow-lg h-[250px] w-[180px] md:h-[400px] md:w-[300px] border-4 border-primary flex items-center justify-between flex-col bg-[url('/image/pattern.png')]"></div>
    );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="bg-secondary p-4 rounded-3xl shadow-lg h-[250px] w-[180px] md:h-[400px] md:w-[300px] border-4 border-primary flex items-center justify-between flex-col">
            <div className="text-xl md:text-3xl text-left w-full">
              {card.face}
            </div>
            <div className="text-6xl md:text-8xl">{card.face}</div>
            <div className="text-xl md:text-3xl w-full text-right">
              {card.face}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{card.name + ' Card'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default GameCard;
