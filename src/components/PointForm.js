import '../styles/point-form.css';
import _ from 'lodash';

import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';

const stationPowerOptions = [
  { key: 1, text: 'Standard 3-5 kW', value: '3-5 kW' },
  { key: 2, text: 'Middle 6-15 kW', value: '6-15 kW' },
  { key: 3, text: 'Accelerated 16-30 kW', value: '16-30 kW' },
  { key: 4, text: 'Fast 31-300 kW', value: '31-300 kW' },
];

const currentTypeOptions = [
  { key: 1, text: 'Alternating current AC', value: 'AC' },
  { key: 2, text: 'Direct current DC', value: 'DC' },
];

const PointForm = () => {
  const [stationPower, setStationPower] = useState({});
  const [currentType, setCurrentType] = useState({});

  return (
    <div className="iu container">
      <div className="point-form">
        <Form>
          <Form.Field>
            <label>Type of Current</label>
            <Dropdown
              onChange={(e, { value }) => {
                setCurrentType(_.find(currentTypeOptions, { value }));
              }}
              selectOnBlur={false}
              options={currentTypeOptions}
              placeholder="Choose an option"
              selection
              text={currentType.text || 'Choose an option'}
              value={currentType.value}
            />
          </Form.Field>

          <Form.Field>
            <label>Charging station power</label>
            <Dropdown
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
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default PointForm;
