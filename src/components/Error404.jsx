import React, { useEffect, useRef } from 'react';

const Error404 = () => {
  const animContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const domOverlayContainerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    let comp;

    // loads CreateJS library
    const createJsScript = document.createElement('script');
    createJsScript.src = 'https://code.createjs.com/1.0.0/createjs.min.js';
    document.body.appendChild(createJsScript);

    createJsScript.onerror = () => {
      console.error('Failed to load CreateJS script'); // To check if the script failed to load
    };

    // defines initiation code from 404.html and functions within useEffect
    const init = () => {
      comp = AdobeAn.getComposition("AF46AB580DB29048BD31CD62E0AC8625");
      const lib = comp.getLibrary();
      const loader = new createjs.LoadQueue(false);
      loader.addEventListener("fileload", handleFileLoad);
      loader.addEventListener("complete", (evt) => { handleComplete(evt, comp) });
      loader.loadManifest(lib.properties.manifest);
    };

    const handleFileLoad = (evt) => {
      if (comp) {
      const images = comp.getImages();
      if (evt && (evt.item.type === "image")) {
        images[evt.item.id] = evt.result;
      }
    } else {
      console.error('Composition is not initialised');
    }
  };

    const handleComplete = (evt, comp) => {
      const lib = comp.getLibrary();
      const ss = comp.getSpriteSheet();
      const queue = evt.target;
      const ssMetadata = lib.ssMetadata;
      for (let i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({
          "images": [queue.getResult(ssMetadata[i].name)],
          "frames": ssMetadata[i].frames
        });
      }
      const exportRoot = new lib._404();
      const stage = new lib.Stage(canvasRef.current);
      stageRef.current = stage; 
      stage.enableMouseOver();

      // Registers the "tick" event listener.
      const fnStartAnimation = () => {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
      };
      // Code to support hidpi screens and responsive scaling.
      AdobeAn.makeResponsive(true, 'both', true, 1, [canvasRef.current, animContainerRef.current, domOverlayContainerRef.current]);
      AdobeAn.compositionLoaded(lib.properties.id);
      fnStartAnimation();

      window.stage = stageRef.current;
    };

    // make functions globally available for Adobe Animate script to use
    window.init = init;
    window.handleFileLoad = handleFileLoad;
    window.handleComplete = handleComplete;

    // load Adobe Animate script after CreateJS has loaded
    createJsScript.onload = () => {
        // Now that CreateJS is loaded, load the Adobe Animate script
        const animateScript = document.createElement('script');
        animateScript.src = '../404.js';
        animateScript.onerror = () => {
          console.error('Failed to load Adobe Animate script'); // To check if the script failed to load
        };
        animateScript.onload = () => {
          // initialise animation
          if (window.init) {
            window.init();
          }
        };
      document.body.appendChild(animateScript);
  };

    // clean up scripts and global functions when component unmounts
    return () => {
      document.body.removeChild(createJsScript);
        const animateScript = document.querySelector('script[src="../404.js"]');
        if (animateScript) {
          document.body.removeChild(animateScript);
      }
      // clean up global functions
      window.init = undefined;
      window.handleFileLoad = undefined;
      window.handleComplete = undefined;
      window.stage = undefined;
    };
  }, []);

  return (
    <div ref={animContainerRef} id="animation_container" style={{ backgroundColor: 'rgba(255, 255, 255, 1.00)', width: '1024px', height: '768px' }}>
      <canvas ref={canvasRef} id="canvas" width="1024" height="768" style={{ position: 'absolute', display: 'block', backgroundColor: 'rgba(255, 255, 255, 1.00)' }}></canvas>
      <div ref={domOverlayContainerRef} id="dom_overlay_container" style={{ pointerEvents: 'none', overflow: 'hidden', width: '1024px', height: '768px', position: 'absolute', left: '0px', top: '0px', display: 'block' }}>
      </div>
    </div>
  );
};

export default Error404;
