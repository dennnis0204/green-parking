import '../styles/point-form.css';
import _ from 'lodash';
import React from 'react';
import { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { toogleAddPointPortal, saveOrUpdateUserPoint } from '../actions';

const stationPowerOptions = [
  { key: 1, text: 'Standard 3-5 kW', value: '3-5 kW' },
  { key: 2, text: 'Middle 6-15 kW', value: '6-15 kW' },
  { key: 3, text: 'Accelerated 16-30 kW', value: '16-30 kW' },
  { key: 4, text: 'Fast 31-300 kW', value: '31-300 kW' },
];

const typeOfCurrentOptions = [
  { key: 1, text: 'Alternating current AC', value: 'AC' },
  { key: 2, text: 'Direct current DC', value: 'DC' },
];

const PointForm = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector(
    (state) => state.addPoint.selectedPoint
  );
  const { hasSavedPoint } = useSelector((state) => state.user.point);

  const [typeOfCurrent, setTypeOfCurrent] = useState({});
  const [stationPower, setStationPower] = useState({});
  const [isAddPointClicked, setIsAddPointClicked] = useState(false);

  const renderTypeOfCurrentErrorLabel = () => {
    if (isAddPointClicked && !typeOfCurrent.value) {
      return (
        <Label basic pointing above="true" className="add-point_label">
          Please choose a type of current
        </Label>
      );
    }
  };

  const renderStationPowerErrorLabel = () => {
    if (isAddPointClicked && !stationPower.value) {
      return (
        <Label basic pointing above="true" className="add-point_label">
          Please choose a station power
        </Label>
      );
    }
  };

  const handleAddPoint = () => {
    setIsAddPointClicked(true);
    if (typeOfCurrent.value && stationPower.value) {
      const point = {
        hasSaved: true,
        coordinates: {
          latitude,
          longitude,
        },
        chargingStation: {
          power: stationPower.value,
          typeOfCurrent: typeOfCurrent.value,
        },
      };
      dispatch(saveOrUpdateUserPoint(point));
      dispatch(toogleAddPointPortal(false));
    }
  };

  const handleClose = () => {
    dispatch(toogleAddPointPortal(false));
  };

  return (
    <div className="point-form">
      <Form>
        <Form.Dropdown
          required
          label="Type of Current"
          onChange={(e, { value }) => {
            setTypeOfCurrent(_.find(typeOfCurrentOptions, { value }));
          }}
          selectOnBlur={false}
          options={typeOfCurrentOptions}
          placeholder="Choose an option"
          selection
          text={typeOfCurrent.text || 'Choose an option'}
          value={typeOfCurrent.value}
        />
        {renderTypeOfCurrentErrorLabel()}
        <Form.Dropdown
          required
          label="Charging station power"
          onChange={(e, { value }) => {
            setStationPower(_.find(stationPowerOptions, { value }));
          }}
          selectOnBlur={false}
          options={stationPowerOptions}
          placeholder="Choose an option"
          selection
          text={stationPower.text || 'Choose an option'}
          value={stationPower.value}
        />
        {renderStationPowerErrorLabel()}
        <Button
          content={hasSavedPoint ? 'Edit My Point' : 'Add My Point'}
          floated="left"
          className="add-point_button"
          onClick={handleAddPoint}
        />
        <Button content="Cancel" floated="right" onClick={handleClose} />
      </Form>
    </div>
  );
};

export default PointForm;
