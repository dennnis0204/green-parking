import '../styles/layout.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Map />
      <Footer />
    </React.Fragment>
  );
};

export default App;
