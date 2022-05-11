import React from 'react';
import Game from './Game';
import Stats from './Stats';
import Board from './Board';

const App: React.FC = () => {
  const order = [
    'adolf-hitler',
    'osama-bin-laden',
    'jeffrey-dahmer',
    'ninja',
    'barack-obama',
    'mr-beast',
    'martin-luther-king-jr'
  ];
  const [game, setGame] = React.useState<Game>(new Game());
  const [score, setScore] = React.useState<number>(1);
  const [highest, setHighest] = React.useState<number>(1);
  React.useEffect(() => {
    if (!game.check()) {
      setGame(new Game());
      setScore(1);
    }
  }, [game]);
  return (
    <div id="app">
      <Stats
        score={score}
        highest={highest}
      />
      <Board
        order={order}
        game={game}
        setGame={setGame}
        setScore={setScore}
        setHighest={setHighest}
      />
    </div>
  );
};

export default App;
