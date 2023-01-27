import { useState, useEffect } from 'react';

function App() {
  const [performanceInfo, setPerformanceInfo] = useState({});

  useEffect(() => {
    fetch(
      'https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban'
    )
      .then((response) => response.json())
      .then((info) => {
        setPerformanceInfo({
          title: info.data.attributes.title,
          shortDescription: info.data.attributes.shortDescription.replace(
            /(<([^>]+)>)/gi,
            ''
          ),
          creatives: info.included.filter((x) => x.type === 'creatives'),
          castRoles: info.included.filter((x) => x.type === 'castRoles'),
        });
      });
  }, []);

  return (
    <div>
      <h1>{performanceInfo.title}</h1>
      <h2>Date: 10/3/2023</h2>
      <h2>{performanceInfo.shortDescription}</h2>
      <h1>Creatives</h1>
      {performanceInfo.creatives.map((x) => (
        <div key={x.id}>
          <h1>
            {x.attributes.name} : {x.attributes.role}
          </h1>
        </div>
      ))}
      <h1>Cast</h1>
      {performanceInfo.castRoles.map((x) => (
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
