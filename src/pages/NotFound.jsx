import React from 'react';
import Error404 from '../components/Error404';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="not-found-page">
      {/* <Header /> */}
      <Error404 />
      {/* <Footer /> */}
    </div>
  );
}
