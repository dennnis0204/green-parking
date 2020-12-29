import React from 'react';
import { useSelector } from 'react-redux';

const PointsList = () => {
  const pointsList = useSelector((state) => state.points);
  if (!pointsList) {
    console.log('No PointsList');
  } else {
    console.log(pointsList);
  }

  return <div>PointList</div>;
};

export default PointsList;
