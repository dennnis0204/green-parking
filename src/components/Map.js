import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL, {
  FlyToInterpolator,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { selectPoint, setCurrentMap } from '../actions';
import Pin from './Pin';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: process.env.REACT_APP_BASE_DEFAULT_LATITUDE || 53.4285,
    longitude: process.env.REACT_APP_BASE_DEFAULT_LONGITUDE || 14.5528,
    zoom: process.env.REACT_APP_BASE_DEFAULT_ZOOM || 12,
    bearing: 0,
    pitch: 0,
  });
  const selectedCity = useSelector((state) => state.selectedCity);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const isFirstRun = useRef(true);
  const [marker, setMarker] = useState({
    latitude: process.env.REACT_APP_BASE_DEFAULT_LATITUDE || 53.4285,
    longitude: process.env.REACT_APP_BASE_DEFAULT_LONGITUDE || 14.5528,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);

  useEffect(() => {
    // window.parent.mapRef = mapRef.current.getMap();
    const map = {
      bounds: mapRef.current.getMap().getBounds(),
      center: mapRef.current.getMap().getCenter(),
      zoom: mapRef.current.getMap().getZoom(),
    };
    dispatch(setCurrentMap(map));
  });

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const { latitude, longitude } = selectedCity;
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: process.env.REACT_APP_BASE_DEFAULT_ZOOM || 12,
    });
  }, [selectedCity]);

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
      transitionDuration="auto"
      transitionInterpolator={new FlyToInterpolator({ speed: 0.4 })}
      onClick={handleMapClick}
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
      >
        <Pin size={20} />
      </Marker>
    </MapGL>
  );
};

export default Map;
