import React from 'react';

function CastRoles({ info }) {
  return (
    <div className="text-center">
      <h1>
        {info.attributes.name} – {info.attributes.role}
      </h1>
    </div>
  );
}

export default CastRoles;
