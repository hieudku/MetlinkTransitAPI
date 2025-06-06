import React from 'react';

type Prediction = {
  departure: string;
  line: string;
};

type Props = {
  predictions: Prediction[];
  stopId: string;
  stopName: string;
};

export default function PredictionPanel({ predictions, stopId, stopName }: Props) {
  return (
    <div className="prediction-panel">
      <h3>Predictions for {stopName} ({stopId}) {stopId}</h3>
      {predictions.length === 0 ? (
        <p>No departures listed at the moment.</p>
      ) : (
        <ul>
          {predictions.map((p, i) => (
            <li key={i}>
            {p.line ? `Line ${p.line}` : 'Unknown line'} departing at {p.departure || 'Unknown time'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
