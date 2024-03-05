// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from '@react-google-maps/api'
// import { useRef, useState } from 'react'
// const App = () => {
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [directionsResponse, setDirectionsResponse] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey:"AIzaSyCji7vNSIbm_qKVlL0Xs85JYRQvthyYW8M",
//     libraries: ['places'],
//   })

//   if(!isLoaded){
//     return <p>Loading------</p>
//   }

//   return (

//     <div className="container mx-auto">
//       <div className="my-4">
//         <input
//           className="border-2 border-gray-200 p-2 mr-2"
//           type="text"
//           placeholder="Origin"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//         />
//         <input
//           className="border-2 border-gray-200 p-2 mr-2"
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

//         >
//           Calculate
//         </button>
//       </div>
//       <GoogleMap
//           center={{ lat: 0, lng: 0 }}
//           zoom={15}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           />
//     </div>
//   );
// };

// export default App;

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const center = { lat: 48.8584, lng: 2.2945 };
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCji7vNSIbm_qKVlL0Xs85JYRQvthyYW8M", // Ensure this is your API key
    libraries: ["places"],
  });

  // Error handling for API load issues
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }


  const onOriginPlaceChanged = () => {
    if (autocompleteOriginRef.current) {
      const place = autocompleteOriginRef.current.getPlace();
      // Update your state or do something with the place object
      console.log(place);
    }
  };

  const onDestinationPlaceChanged = () => {
    if (autocompleteDestinationRef.current) {
      const place = autocompleteDestinationRef.current.getPlace();
      // Update your state or do something with the place object
      console.log(place);
    }
  };

  return (
    <div className="container mx-auto p-4 relative h-screen">
      {" "}
      {/* Ensure the parent has a defined height */}
      <div
        className="absolute top-0 z-10 bg-white p-4 shadow-md flex"
        style={{ width: "100%" }}
      >
        {" "}
        {/* Use z-index to ensure form is above map */}
        <Autocomplete
            onLoad={(ref) => (autocompleteOriginRef.current = ref)}
            onPlaceChanged={onOriginPlaceChanged}
          >
        <input
          className="border-2 border-gray-200 p-2 mr-2"
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        </Autocomplete>
        <Autocomplete
            onLoad={(ref) => (autocompleteDestinationRef.current = ref)}
            onPlaceChanged={onDestinationPlaceChanged}
          >
        <input
          className="border-2 border-gray-200 p-2 mr-2"
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        </Autocomplete>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Calculate
        </button>
        <div className="flex ">
          <div className="ml-14">Duration:</div>
          <div className="ml-36">Time taken:</div>
          <CiLocationArrow1
            className="ml-44 cursor-pointer"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-[100%] h-[100%]">
        {" "}
        {/* This ensures the map fills the parent container */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default App;
