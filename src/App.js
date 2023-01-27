import { useState, useEffect } from 'react';
import CastRoles from './components/CastRoles';
import Creatives from './components/Creatives';

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
      {performanceInfo.creatives.map((creativeInfo) => (
        <Creatives info={creativeInfo} />
      ))}
      <h1>Cast</h1>
      {performanceInfo.castRoles.map((castRolesInfo) => (
        <CastRoles info={castRolesInfo} />
      ))}
    </div>
  );
}

export default App;
