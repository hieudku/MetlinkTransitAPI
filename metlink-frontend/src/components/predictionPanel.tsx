import React from 'react';

type Prediction = {
  departure: {
    scheduled?: string;
    expected?: string;
  };
  route?: {
    short_name?: string;
  };
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
              {p.route?.short_name ? `Line ${p.route.short_name}` : 'Unknown line'} departing at{' '}
              {p.departure?.expected
                ? new Date(p.departure.expected).toLocaleTimeString()
                : p.departure?.scheduled
                ? new Date(p.departure.scheduled).toLocaleTimeString()
                : 'Unknown time'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
