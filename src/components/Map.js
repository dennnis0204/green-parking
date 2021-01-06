import '../styles/map.css';
import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
import { selectPoint } from '../actions';

const Map = () => {
  // refs
  const isFirstRun = useRef(true);

  // redux store
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.selectedCity);
  const isAddPointPortalOpen = useSelector(
    (state) => state.addPoint.isAddPointPortalOpen || false
  );
  const userPoint = useSelector((state) => state.user.point);

  // state
  const [viewport, setViewport] = useState({
    latitude: process.env.REACT_APP_BASE_DEFAULT_LATITUDE || 53.4285,
    longitude: process.env.REACT_APP_BASE_DEFAULT_LONGITUDE || 14.5528,
    zoom: process.env.REACT_APP_BASE_DEFAULT_ZOOM || 12,
    bearing: 0,
    pitch: 0,
  });
  const [addPointPin, setAddPointPin] = useState(null);

  useEffect(() => {
    if (userPoint.coordinates.latitude) {
      dispatch(selectPoint(userPoint.coordinates));
      setAddPointPin(userPoint.coordinates);
    } else {
      dispatch(
        selectPoint({
          latitude: viewport.latitude,
          longitude: viewport.longitude,
        })
      );
      setAddPointPin({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
      });
    }
  }, [isAddPointPortalOpen]);

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

  const onMarkerDragEnd = useCallback((event) => {
    const [longitude, latitude] = event.lngLat;
    setAddPointPin({ longitude, latitude });
    dispatch(selectPoint({ longitude, latitude }));
  }, []);

  // handlers
  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton || !isAddPointPortalOpen) return;
    const [longitude, latitude] = lngLat;
    setAddPointPin({ latitude, longitude });
  };

  // renders
  const renderAddPointPin = () => {
    return (
      isAddPointPortalOpen && (
        <Marker
          longitude={addPointPin.longitude}
          latitude={addPointPin.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragEnd={onMarkerDragEnd}
        >
          <Icon name="map pin" size="big" className="pin-marker" />
        </Marker>
      )
    );
  };

  const renderUserPoint = () => {
    const { latitude, longitude } = userPoint.coordinates;
    return (
      userPoint.hasSaved &&
      !isAddPointPortalOpen && (
        <Marker
          longitude={longitude}
          latitude={latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <Icon
            name="map marker alternate"
            size="big"
            className="user-marker"
          />
        </Marker>
      )
    );
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
      transitionInterpolator={new FlyToInterpolator({ speed: 1.5 })}
      onClick={handleMapClick}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      // mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {renderAddPointPin()}
      {renderUserPoint()}
    </MapGL>
  );
};

export default Map;
