import React from 'react';

type Stop = {
  stopId: string;
  stopName: string;
};

type Props = {
  stops: Stop[];
  onSelect: (stopId: string) => void;
  selectedStopId: string;
};

export default function StopList({ stops, onSelect, selectedStopId }: Props) {
  return (
    <ul className="stop-list">
      {stops.map((stop) => (
        <li
          key={stop.stopId}
          className={`stop-item ${stop.stopId === selectedStopId ? 'selected' : ''}`}
          onClick={() => onSelect(stop.stopId)}
        >
          {stop.stopName} ({stop.stopId})
        </li>
      ))}
    </ul>
  );
}
