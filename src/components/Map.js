import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MapGL from 'react-map-gl';
import { selectPoint, setCurrentMap } from '../actions';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 53.4285,
    longitude: 14.5528,
    zoom: 13,
    bearing: 0,
    pitch: 0,
  });
  const dispatch = useDispatch();
  const mapRef = React.useRef(null);

  useEffect(() => {
    const map = {
      bounds: mapRef.current.getMap().getBounds(),
      center: mapRef.current.getMap().getCenter(),
      zoom: mapRef.current.getMap().getZoom(),
    };
    dispatch(setCurrentMap(map));
  });

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    const [longitude, latitude] = lngLat;
    dispatch(selectPoint({ longitude, latitude }));
  };

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(nextViewport) => {
        return setViewport(nextViewport);
      }}
      onClick={handleMapClick}
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
};

export default Map;
