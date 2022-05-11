import React from 'react';

interface Props {
    score: number;
    highest: number;
}

const Stats: React.FC<Props> = ({ score, highest }: Props) => {
    return (
        <div id="stats">
            <div>
                <p>Score</p>
                <p>{score}</p>
            </div>
            <div>
                <p>Highest</p>
                <p>{highest}</p>
            </div>
        </div>
    );
};

export default Stats;