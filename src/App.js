import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

function App() {
  const [points, setPoints] = useState([]);
  const containerRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await fetch('http://localhost:8080/api/points');
      const data = await response.json();
      setPoints(data);
    };

    fetchPoints();
    const interval = setInterval(fetchPoints, 5000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(700, 410);
      };

      p.draw = () => {
        p.background(255); 
        points.forEach((point) => {
          p.fill(0);
          p.ellipse(point.x, point.y, 20, 20);
        });
      };

      p.mousePressed = async () => {
        const point = { x: p.mouseX, y: p.mouseY };
        await fetch('http://localhost:8080/api/points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(point),
        });
        setPoints((prev) => [...prev, point]);
      };

      p.clearBoard = () => {
        setPoints([]);
        fetch('http://localhost:8080/api/points', {
          method: 'DELETE',
        });
      };
    };

    p5Instance.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [points]);

  const handleClearBoard = () => {
    if (p5Instance.current) {
      p5Instance.current.clearBoard();
    }
  };

  return (
    <div>
      <hr />
      <div id="container" ref={containerRef}></div>
      <button onClick={handleClearBoard}>Limpiar Tablero</button>
      <hr />
    </div>
  );
}

export default App;








