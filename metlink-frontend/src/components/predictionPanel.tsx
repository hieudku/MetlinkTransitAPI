import React from 'react';
import { Prediction } from '../types';

type Props = {
  predictions: Prediction[];
  stopId: string;
  stopName: string;
};

export default function PredictionPanel({ predictions, stopId, stopName }: Props) {
  return (
    <div className="prediction-panel">
      <h3>Predictions for {stopName} ({stopId})</h3>
      {predictions.length === 0 ? (
        <p>No departures listed at the moment.</p>
      ) : (
        <ul>
          {predictions.map((p, i) => (
            <li key={i}>
              {p.line ? `Line ${p.line}` : 'Unknown line'} departing at{' '}
              {p.expectedDeparture
                ? new Date(p.expectedDeparture).toLocaleTimeString()
                : p.scheduledDeparture
                ? new Date(p.scheduledDeparture).toLocaleTimeString()
                : 'Unknown time'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
