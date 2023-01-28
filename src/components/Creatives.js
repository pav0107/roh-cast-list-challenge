import React from 'react';

function Creatives({ info }) {
  return (
    <div className="text-center">
      <h1>
        {info.name} – {info.role}
      </h1>
    </div>
  );
}

export default Creatives;
