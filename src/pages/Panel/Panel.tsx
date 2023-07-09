import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useAppDispatch';
import './Panel.css';

function Panel() {
  const port = useRef<chrome.runtime.Port>();
  const planes = useAppSelector((state) => state.content.planes);

  useEffect(() => {
    console.log('planes:', planes);
    //port.current = chrome.runtime.connect({ name: 'test' });
  }, []);

  return (
    <div className="container">
      <h1>Dev Tools Panel</h1>
      <button
        onClick={() => {
          console.log(port.current);
          port.current?.postMessage('hello');
        }}
      >
        send message
      </button>
    </div>
  );
}

export default Panel;
