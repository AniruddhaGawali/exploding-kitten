type Card = {
  name: string;
  face: string;
  type: 'cat' | 'bomb' | 'defuse' | 'shuffle';
  value: number;
};

type Deck = Card[];
