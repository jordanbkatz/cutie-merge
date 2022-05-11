import React from 'react';
import Game from './Game';

interface Props {
    order: string[];
    game: Game;
    setGame: React.Dispatch<React.SetStateAction<Game>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setHighest: React.Dispatch<React.SetStateAction<number>>;
}

const Board: React.FC<Props> = ({ order, game, setGame, setScore, setHighest }: Props) => {
    const directions = {
        'w': 3,
        'a': 0,
        's': 1,
        'd': 2,
        'ArrowUp': 3,
        'ArrowLeft': 0,
        'ArrowDown': 1,
        'ArrowRight': 2
    };
    const handleKeydown = (e: KeyboardEvent) => {
        if (!Object.keys(directions).includes(e.key)) return;
        e.preventDefault();
        setGame((prevGame: Game) => {
            let newGame = new Game(prevGame.cells);
            newGame.move(directions[e.key as keyof typeof directions]);
            const newScore = newGame.score();
            setScore(newScore);
            setHighest((prevHighest: number) => (newScore > prevHighest) ? newScore : prevHighest);
            return newGame;
        });
    };
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);
    return (
        <div id="board">
            {
                game.cells.map((row, i) => (
                    <div key={i}>
                        {
                            row.map((col, j) => (
                                <div key={j}>
                                    {
                                        (col != -1) &&
                                        (
                                            <img src={require(`../assets/images/${order[col]}.jpeg`)} />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Board;