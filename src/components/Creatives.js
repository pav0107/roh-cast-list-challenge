import React from 'react';

function Creatives({ info }) {
  return (
    <div key={info.id} className="text-center">
      <h1>
        {info.attributes.name} – {info.attributes.role}
      </h1>
    </div>
  );
}

export default Creatives;
