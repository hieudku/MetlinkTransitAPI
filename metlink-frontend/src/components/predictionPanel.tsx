import React from 'react';

type Prediction = {
  departure: string;
  line: string;
};

type Props = {
  predictions: Prediction[];
  stopId: string;
};

export default function PredictionPanel({ predictions, stopId }: Props) {
  return (
    <div className="prediction-panel">
      <h3>Predictions for Stop {stopId}</h3>
      {predictions.length === 0 ? (
        <p>No departures listed at the moment.</p>
      ) : (
        <ul>
          {predictions.map((p, i) => (
            <li key={i}>
              Line {p.line} departing at {p.departure}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
