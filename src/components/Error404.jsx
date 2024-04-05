import React, { useEffect } from 'react';

const Error404 = () => {
  useEffect(() => {
    // loads CreateJS library
    const createJsScript = document.createElement('script');
    createJsScript.src = 'https://code.createjs.com/1.0.0/createjs.min.js';
    document.body.appendChild(createJsScript);

    // defines initiation code from 404.html and functions within useEffect
    const init = () => {
      const canvas = document.getElementById("canvas");
      const anim_container = document.getElementById("animation_container");
      const dom_overlay_container = document.getElementById("dom_overlay_container");
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
      const animateScript = document.createElement('script');
      animateScript.src = './404.js';
      document.body.appendChild(animateScript);
    };

    // clean up scripts and global functions when component unmounts
    return () => {
      document.body.removeChild(createJsScript);
      // only remove the animateScript if it was added
      if (createJsScript.onload) {
        const animateScript = document.querySelector('script[src="./404.js"]');
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
    <div id="animation_container" style={{ backgroundColor: 'rgba(255, 255, 255, 1.00)', width: '1024px', height: '768px' }}>
      <canvas id="canvas" width="1024" height="768" style={{ position: 'absolute', display: 'block', backgroundColor: 'rgba(255, 255, 255, 1.00)' }}></canvas>
      <div id="dom_overlay_container" style={{ pointerEvents: 'none', overflow: 'hidden', width: '1024px', height: '768px', position: 'absolute', left: '0px', top: '0px', display: 'block' }}>
      </div>
    </div>
  );
};

export default Error404;