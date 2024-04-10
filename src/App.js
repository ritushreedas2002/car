
import React, { useEffect, useState } from 'react';
import Maps from './Maps';
import SearchBox from './SearchBox';

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      function(position) {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setInitialPosition(userLocation);
        setSelectPosition(userLocation);
      },
      function(error) {
        console.error("Error watching position:", error);
      },
      {
        enableHighAccuracy: true, // Whether to use GPS or other methods for location tracking
        timeout: 10000, // Maximum time in milliseconds before erroring
        maximumAge: 0 // Maximum age of a cached location before it's ignored
      }
    );
  
    // Clean up the watcher when the component unmounts
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);
  

  return (
    <div className="flex flex-col md:flex-row h-screen">
  <div className="w-full md:w-4/5 h-full">
    {/* Map component */}
    <Maps selectPosition={selectPosition} initialPosition={initialPosition} />
  </div>
  <div className="w-full md:w-1/5 h-1/2 md:h-full overflow-auto">
    {/* Search box */}
    <SearchBox setSelectPosition={setSelectPosition} />
  </div>
</div>

  );
}

export default App;


// App.js
// import React, { useEffect, useState } from 'react';
// import Maps from './Maps';
// import SearchBox from './SearchBox';
// import { calculateDistance } from './utils'; // Make sure this path is correct

// function App() {
//   const [selectPosition, setSelectPosition] = useState(null);
//   const [initialPosition, setInitialPosition] = useState(null);
//   const [distance, setDistance] = useState(0); // New state to store the distance

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       const userLocation = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//       };
//       setInitialPosition(userLocation);
//       setSelectPosition(userLocation);
//     });
//   }, []);

//   // Modify setSelectPosition to calculate and set the distance as well
//   const handleSetSelectPosition = (position) => {
//     setSelectPosition(position);
//     if (initialPosition) {
//       const dist = calculateDistance(initialPosition.lat, initialPosition.lon, position.lat, position.lon);
//       setDistance(dist); // Set the calculated distance
//       console.log(dist);
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ width: "80%" }}>
//         <Maps selectPosition={selectPosition} initialPosition={initialPosition} distance={distance} />
//       </div>
//       <div style={{ width: "20%" }}>
//         <SearchBox setSelectPosition={handleSetSelectPosition} />
//       </div>
//     </div>
//   );
// }

// export default App;




