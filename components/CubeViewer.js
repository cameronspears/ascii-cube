import React, { useState, useEffect, useCallback } from 'react';

// Throttle function to limit the rate of function execution
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

const CubeViewer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [orientation, setOrientation] = useState({ x: 0, y: 0 });
  const [asciiArt, setAsciiArt] = useState('');

  const normalizeAndRoundOrientation = useCallback((degree) => {
    let normalized = degree % 360; // Normalize to [0, 360)
    if (normalized < 0) normalized += 360; // Ensure positive degree
    return Math.round(normalized / 5) * 5; // Round to nearest 5 degrees
  }, []);

  const fetchAsciiArt = useCallback(async (x, y) => {
    const normalizedX = normalizeAndRoundOrientation(x);
    const normalizedY = normalizeAndRoundOrientation(y);

    try {
      const response = await fetch(`/api/cube?x=${normalizedX}&y=${normalizedY}`);
      if (response.ok) {
        const text = await response.text();
        setAsciiArt(text);
      } else {
        throw new Error('ASCII art not found.');
      }
    } catch (error) {
      console.error('Error fetching ASCII art:', error);
      setAsciiArt('Error fetching ASCII art.');
    }
  }, [normalizeAndRoundOrientation]);

  useEffect(() => {
    fetchAsciiArt(orientation.x, orientation.y);
  }, [orientation, fetchAsciiArt]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    event.preventDefault();
  };

  const handleMouseMove = useCallback(throttle((event) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    const sensitivityFactor = 1.5; // Adjust based on how fast/slow you want the rotation to be

    setOrientation((prev) => ({
      x: (prev.x + dy / sensitivityFactor) % 360,
      y: (prev.y - dx / sensitivityFactor) % 360,
    }));

    setDragStart({ x: event.clientX, y: event.clientY });
  }, 100), [isDragging, dragStart]); // 100ms throttle for smoother updates

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        userSelect: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        overflow: 'hidden',
        fontSize: '50%', // Adjusting font size to make ASCII art smaller
      }}
    >
      {asciiArt || 'Drag to rotate the cube.'}
    </div>
  );  
};

export default CubeViewer;
