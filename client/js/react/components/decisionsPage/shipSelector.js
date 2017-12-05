import React from 'react';

const ShipSelector = ({ ships, selectedShip, onSelectShip }) => (
  <div>
    {ships &&
      <select onChange={onSelectShip} value={selectedShip}>
        <option value='' />
        {ships.map(ship => (
          <option key={ship._id} value={ship._id}>
            {ship.shipName} - {ship._id}
          </option>
        ))}
      </select>
    }
  </div>
);

export default ShipSelector;
