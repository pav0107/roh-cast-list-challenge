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
    <div className="flex flex-col items-center h-full min-h-screen p-5 bg-gray-100">
      <h1 className="pb-3 mt-10 text-4xl">{performanceInfo.title}</h1>
      <h2 className="p-2">Date: 10/3/2023</h2>
      <h2 className="max-w-xl p-2 text-center">
        {performanceInfo.shortDescription}
      </h2>
      <h1 className="pt-10 pb-4 text-2xl">Creatives</h1>
      <div>
        {performanceInfo.creatives?.map((creativeInfo) => (
          <Creatives key={creativeInfo.id} info={creativeInfo.attributes} />
        ))}
      </div>
      <h1 className="pt-10 pb-4 text-2xl">Cast</h1>
      <div>
        {performanceInfo.castRoles?.map((castRolesInfo) => (
          <CastRoles key={castRolesInfo.id} info={castRolesInfo.attributes} />
        ))}
      </div>
    </div>
  );
}

export default App;
