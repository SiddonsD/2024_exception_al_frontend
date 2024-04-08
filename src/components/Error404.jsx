import React from 'react';
import Button from './Button';

function Error404() {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center text-white">
        <img
          src="../404static.png"
          alt="404 Error page of cartoon space scene with astronaut and spaceship"
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />
        <div className="z-10">
          <h1 className="text-5xl lg:text-6xl font-semibold">404</h1>
          <h2 className="text-3xl font-semibold mt-4">Lost your way?</h2>
          <p className="text-2xl mt-4 mb-6">
            The page you are looking for has moved to a galaxy far, far away...
          </p>
          <p className="text-2xl mb-6">Let's get you home to safety.</p>
          <Button buttonType="link" href="/home" size="md" buttonStyle="white">
            Take me home!
          </Button>
        </div>
      </section>
    );
  }
  
  export default Error404;