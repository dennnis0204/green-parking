import React from 'react';
import { Header, Segment, Portal } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import PointForm from './PointForm';

const AddPointPortal = () => {
  const open = useSelector((state) => state.addPoint.isAddPointPortalOpen);

  return (
    <Portal open={open}>
      <Segment
        style={{
          right: '1rem',
          position: 'fixed',
          top: '7rem',
          zIndex: 1000,
          maxWidth: '20rem',
        }}
      >
        <Header as="h4" textAlign="center">
          Select Your Point on Map and Choose Desired Charging Station Option
        </Header>
        <PointForm />
      </Segment>
    </Portal>
  );
};

export default AddPointPortal;
