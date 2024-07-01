import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

function App() {
  const [points, setPoints] = useState([]);
  const containerRef = useRef(null);
  const p5Instance = useRef(null);
  const isDrawing = useRef(false); 

  useEffect(() => {
    const intervalId = setInterval(fetchPoints, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = function () {
        p.createCanvas(700, 410);
        p.background(255);
      };

      p.draw = async function () {
        p.background(255);

        if (isDrawing.current) {
          p.fill(0);
          p.ellipse(p.mouseX, p.mouseY, 20, 20);
          const newPoint = { x: p.mouseX, y: p.mouseY };
          setPoints((prevPoints) => [...prevPoints, newPoint]);

          try {
            const response = await fetch('http://localhost:8080/api/points', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newPoint),
            });
            if (!response.ok) {
              console.error('Failed to send point');
            }
          } catch (error) {
            console.error('Error sending point:', error);
          }
        }

        points.forEach((point) => {
          p.fill(0);
          p.ellipse(point.x, point.y, 20, 20);
        });
      };

      p.mousePressed = function () {
        isDrawing.current = true;
      };

      p.mouseReleased = function () {
        isDrawing.current = false;
      };
    };

    if (!p5Instance.current) {
      p5Instance.current = new p5(sketch, containerRef.current);
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [points]);

  const fetchPoints = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/points');
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
      } else {
        console.error('Failed to fetch points');
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const handleClearBoard = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/points', {
        method: 'DELETE',
      });
      if (response.ok) {
        setPoints([]);
      } else {
        console.error('Failed to clear points');
      }
    } catch (error) {
      console.error('Error clearing points:', error);
    }
  };

  return (
    <div>
      <hr />
      <div id="container" ref={containerRef}></div>
      <div>
        <button onClick={handleClearBoard}>Limpiar Tablero</button>
      </div>
      <hr />
    </div>
  );
}

export default App;
