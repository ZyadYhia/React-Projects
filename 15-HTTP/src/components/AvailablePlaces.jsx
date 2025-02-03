import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "../Error.jsx";
import { fetchAvailablePlaces } from "../HTTP.js";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({
          message: error.message || "An error occurred while fetching places.",
        });
        setIsFetching(false);
      }

    };
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage
        title="Error"
        message={error.message}
        onConfirm={onSelectPlace}
      />
    );
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
