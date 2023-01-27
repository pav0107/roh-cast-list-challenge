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
    <div className="flex flex-col items-center justify-center p-5 bg-gray-100">
      <h1 className="pb-3 text-4xl">{performanceInfo.title}</h1>
      <h2 className="p-2">Date: 10/3/2023</h2>
      <h2 className="p-2 text-center">{performanceInfo.shortDescription}</h2>
      <h1 className="pt-5 pb-2 text-2xl">Creatives</h1>
      <div>
        {performanceInfo.creatives.map((creativeInfo) => (
          <Creatives info={creativeInfo} />
        ))}
      </div>
      <h1 className="pt-5 pb-2 text-2xl">Cast</h1>
      <div>
        {performanceInfo.castRoles.map((castRolesInfo) => (
          <CastRoles info={castRolesInfo} />
        ))}
      </div>
    </div>
  );
}

export default App;
