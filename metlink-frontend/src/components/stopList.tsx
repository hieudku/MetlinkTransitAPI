import React from 'react';

type Stop = {
  stopId: string;
  stopName: string;
};

type Props = {
  stops: Stop[];
  onSelect: (stopId: string) => void;
};

export default function StopList({ stops, onSelect }: Props) {
  return (
    <ul className="stop-list">
      {stops.map((stop) => (
        <li
          key={stop.stopId}
          onClick={() => onSelect(stop.stopId)}
          className="stop-item"
        >
          {stop.stopName} ({stop.stopId})
        </li>
      ))}
    </ul>
  );
}
