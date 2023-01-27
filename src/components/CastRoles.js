import React from 'react';

function CastRoles({ info }) {
  return (
    <div key={info.id}>
      <h1>
        {info.attributes.name} : {info.attributes.role}
      </h1>
    </div>
  );
}

export default CastRoles;
