import { useState, useEffect } from 'react';

function App() {
  // redo state as an object
  // const [info, setInfo] = useState([]);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [creatives, setCreatives] = useState([]);
  const [castRoles, setCastRoles] = useState([]);

  useEffect(() => {
    fetch(
      'https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban'
    )
      .then((response) => response.json())
      .then((info) => {
        setTitle(info.data.attributes.title);
        setShortDescription(
          info.data.attributes.shortDescription.replace(/(<([^>]+)>)/gi, '')
        );
        setCreatives(info.included.filter((x) => x.type === 'creatives'));
        setCastRoles(info.included.filter((x) => x.type === 'castRoles'));
        console.log(info);
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <h2>Date: 10/3/2023</h2>
      <h2>{shortDescription}</h2>
      <h1>Creatives</h1>
      {creatives.map((x) => (
        <div key={x.id}>
          <h1>
            {x.attributes.name} : {x.attributes.role}
          </h1>
        </div>
      ))}
      <h1>Cast</h1>
      {castRoles.map((x) => (
        <div key={x.id}>
          <h1>
            {x.attributes.name} : {x.attributes.role}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default App;
