import React, { useEffect, useRef } from 'react';

const Error404 = () => {
  const animContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const domOverlayContainerRef = useRef(null);

  useEffect(() => {
    console.log('useEffect called'); // To check if useEffect is called

    // loads CreateJS library
    const createJsScript = document.createElement('script');
    createJsScript.src = 'https://code.createjs.com/1.0.0/createjs.min.js';
    document.body.appendChild(createJsScript);

    createJsScript.onerror = () => {
      console.error('Failed to load CreateJS script'); // To check if the script failed to load
    };

    // defines initiation code from 404.html and functions within useEffect
    const init = () => {
      console.log('init function called'); // To check if init is called
      const canvas = canvasRef.current;
      const anim_container = animContainerRef.current;
      const dom_overlay_container = domOverlayContainerRef.current;
      const comp = AdobeAn.getComposition("AF46AB580DB29048BD31CD62E0AC8625");
      const lib = comp.getLibrary();
      const loader = new createjs.LoadQueue(false);
      loader.addEventListener("fileload", (evt) => { handleFileLoad(evt, comp) });
      loader.addEventListener("complete", (evt) => { handleComplete(evt, comp) });
      loader.loadManifest(lib.properties.manifest);
    };

    const handleFileLoad = (evt, comp) => {
      const images = comp.getImages();
      if (evt && (evt.item.type === "image")) {
        images[evt.item.id] = evt.result;
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
      const stage = new lib.Stage(canvas);
      stage.enableMouseOver();
      // Registers the "tick" event listener.
      const fnStartAnimation = () => {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
      };
      // Code to support hidpi screens and responsive scaling.
      AdobeAn.makeResponsive(true, 'both', true, 1, [canvas, anim_container, dom_overlay_container]);
      AdobeAn.compositionLoaded(lib.properties.id);
      fnStartAnimation();
    };

    // make functions globally available for Adobe Animate script to use
    window.init = init;
    window.handleFileLoad = handleFileLoad;
    window.handleComplete = handleComplete;

    // load Adobe Animate script after CreateJS has loaded
    createJsScript.onload = () => {
      console.log('CreateJS script loaded'); // To check if CreateJS script is loaded

      // ensure refs are available in the DOM
      if (animContainerRef.current && canvasRef.current && domOverlayContainerRef.current) {
        console.log('animContainerRef is available'); // To check if animContainerRef is available

        // Now that CreateJS is loaded, load the Adobe Animate script
        const animateScript = document.createElement('script');
        animateScript.src = './404.js';
        animateScript.onerror = () => {
          console.error('Failed to load Adobe Animate script'); // To check if the script failed to load
        };
        animateScript.onload = () => {
          console.log('Adobe Animate script loaded'); // To check if Adobe Animate script is loaded
          console.log('AdobeAn:', window.AdobeAn); // Check if AdobeAn is defined
          // now Adobe Animate script is loaded, initialise animation
          if (window.AdobeAn && window.init) {
            window.init();
          } else {
            console.error('AdobeAn is not defined.');
          }
        };
      document.body.appendChild(animateScript);
    } else {
      console.error('Refs are not available'); // To check if animContainerRef is not available
    }
  };

    // clean up scripts and global functions when component unmounts
    return () => {
      document.body.removeChild(createJsScript);
      // only remove the animateScript if it was added
      if (createJsScript.onload) {
        const animateScript = document.querySelector('script[src="/404.js"]');
        if (animateScript) {
          document.body.removeChild(animateScript);
        }
      }
      // clean up global functions
      window.init = undefined;
      window.handleFileLoad = undefined;
      window.handleComplete = undefined;
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
