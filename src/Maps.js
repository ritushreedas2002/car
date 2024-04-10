import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const position = [51.505, -0.09]; // Default position (London)
const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

function Routing({ start, end, onDistanceChange }) {
  const map = useMap();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!map || !start || !end) return;
    let routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lon), L.latLng(end.lat, end.lon)],
      routeWhileDragging: false,
      show: true,
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      const routes = e.routes;
      let distance = 0; // Initialize distance
      if (routes.length > 0) {
        // Get the distance in meters and convert to kilometers
        distance = routes[0].summary.totalDistance / 1000;
        let timeInSeconds = routes[0].summary.totalTime;
        console.log(distance);
        console.log(timeInSeconds);
        onDistanceChange(distance, timeInSeconds); // Call the callback function with the distance
      }
    });

    return () => {
      if (isMounted.current && map) {
        map.removeControl(routingControl);
      }
    };
  }, [map, start, end, isMounted, onDistanceChange]);

  return null;
}

export default function Maps({ selectPosition, initialPosition }) {
  const [distance, setDistance] = useState(0); // State to hold distance
  const [time, setTime] = useState(0);

  // Function to update distance
  const handleDistanceChange = (newDistance, newTime) => {
    setDistance(newDistance);
    setTime(newTime);
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-[600px]">
      <div className="flex-1 z-0">
        <MapContainer
          center={position}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.penstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=YcdOTnUjz5ZfQBvtUtEO`}
          />
          {selectPosition && (
            <Marker
              position={[selectPosition.lat, selectPosition.lon]}
              icon={icon}
            >
              <Popup>
                Selected Location. <br /> Distance from initial position:{" "}
                {distance.toFixed(2)} km
              </Popup>
            </Marker>
          )}
          {initialPosition &&
          <Marker
          position={[selectPosition.lat, selectPosition.lon]}
          icon={icon}
        >
          <Popup>
            Selected Location. <br /> Distance from initial position:{" "}
            {distance.toFixed(2)} km
          </Popup>
        </Marker>
          }
          {initialPosition && selectPosition && (
            <Routing
              start={initialPosition}
              end={selectPosition}
              onDistanceChange={handleDistanceChange}
            />
          )}
        </MapContainer>
      </div>
      <div className="absolute bottom-24 md:bottom-10 lg:relative lg:flex-none lg:w-64 lg:top-auto lg:right-auto bg-white bg-opacity-80 p-2 rounded-lg shadow-lg z-20">
        <div>Distance: {distance.toFixed(2)} km</div>
        <div>Time: {formatTime(time)}</div>
      </div>
    </div>
  );
}
