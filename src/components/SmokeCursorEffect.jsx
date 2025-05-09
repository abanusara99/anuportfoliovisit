
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

const MAX_PARTICLES = 50; // Max particles at a time
const PARTICLE_LIFESPAN = 700; // ms, should match CSS animation duration
const INACTIVITY_TIMEOUT = 300; // ms: how long to wait before considering cursor idle
const IDLE_PARTICLE_INTERVAL = 150; // ms: interval to generate particles when idle

const SmokeParticle = ({ x, y, size, lifespan }) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    '--particle-lifespan': `${lifespan / 1000}s`, // Pass lifespan to CSS variable
  };
  return <div className="smoke-particle" style={style}></div>;
};

const SmokeCursorEffect = () => {
  const [particles, setParticles] = useState([]);
  const particleIdCounter = useRef(0);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const inactivityTimerRef = useRef(null);
  const idleParticleIntervalRef = useRef(null);
  const [isCursorInBody, setIsCursorInBody] = useState(true); // Assume cursor starts in body or will enter

  const addParticle = useCallback((x, y) => {
    const size = 30; // Smoke width set to 20px as per user request
    const newParticle = {
      id: particleIdCounter.current++,
      x,
      y,
      size,
      timestamp: Date.now(),
    };

    setParticles((prevParticles) => {
      const updatedParticles = [...prevParticles, newParticle];
      return updatedParticles.slice(-MAX_PARTICLES);
    });
  }, []);

  const startOrResetIdleTimers = useCallback(() => {
    // This function should only be called if isCursorInBody is true
    // The calling contexts (handleMouseMove, handleMouseEnterBody) will ensure this.
    // However, an explicit check here adds safety.
    if (!isCursorInBody) return;

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (idleParticleIntervalRef.current) {
      clearInterval(idleParticleIntervalRef.current);
      idleParticleIntervalRef.current = null;
    }

    inactivityTimerRef.current = setTimeout(() => {
      // Re-check isCursorInBody before starting interval, in case it changed during timeout
      if (!isCursorInBody) return;

      if (!idleParticleIntervalRef.current && lastMousePosition.current) {
        addParticle(lastMousePosition.current.x, lastMousePosition.current.y);
        addParticle(lastMousePosition.current.x, lastMousePosition.current.y);
        
        idleParticleIntervalRef.current = setInterval(() => {
          if (!isCursorInBody) { // Stop interval if cursor leaves
              if(idleParticleIntervalRef.current) clearInterval(idleParticleIntervalRef.current);
              idleParticleIntervalRef.current = null;
              return;
          }
          if (lastMousePosition.current) {
            addParticle(lastMousePosition.current.x, lastMousePosition.current.y);
            addParticle(lastMousePosition.current.x, lastMousePosition.current.y);
          }
        }, IDLE_PARTICLE_INTERVAL);
      }
    }, INACTIVITY_TIMEOUT);
  }, [addParticle, isCursorInBody]); // isCursorInBody is a dependency

  useEffect(() => {
    // Ensure this effect only runs on the client
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    const handleMouseMove = (event) => {
      if (!isCursorInBody) return; // Only process if cursor is in body

      const { clientX, clientY } = event;
      addParticle(clientX, clientY);
      addParticle(clientX, clientY);

      lastMousePosition.current = { x: clientX, y: clientY };
      startOrResetIdleTimers();
    };

    const handleMouseLeaveBody = () => {
      setIsCursorInBody(false);
      setParticles([]); // Clear particles immediately
      // Clear timers
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (idleParticleIntervalRef.current) {
        clearInterval(idleParticleIntervalRef.current);
        idleParticleIntervalRef.current = null;
      }
    };

    const handleMouseEnterBody = (event) => {
      setIsCursorInBody(true);
      lastMousePosition.current = { x: event.clientX, y: event.clientY };
      // When mouse enters, treat it as a "stop" to potentially start idle generation
      // if it remains still.
      startOrResetIdleTimers();
    };
    
    // Attach event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeaveBody);
    document.body.addEventListener('mouseenter', handleMouseEnterBody);
    
    // Initial check: if mouse is outside when component mounts (e.g. focus on devtools)
    // This is tricky; mouseenter/mouseleave are generally reliable for user interaction.
    // For simplicity, we rely on the initial state and events.
    // If `document.elementFromPoint` was used, it needs clientX/clientY which we don't have on mount
    // without a prior event.

    return () => {
      // Cleanup listeners
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.body) { // Ensure body exists during cleanup
        document.body.removeEventListener('mouseleave', handleMouseLeaveBody);
        document.body.removeEventListener('mouseenter', handleMouseEnterBody);
      }
      // Clear timers on unmount
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (idleParticleIntervalRef.current) clearInterval(idleParticleIntervalRef.current);
    };
  }, [addParticle, isCursorInBody, startOrResetIdleTimers]); // Dependencies for the main effect

  // Effect to clean up old particles that have finished their animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.filter(
          (p) => Date.now() - p.timestamp < PARTICLE_LIFESPAN
        )
      );
    }, PARTICLE_LIFESPAN / 2); // Check periodically

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Runs once on mount

  // Render particles only if cursor is in body or if there are particles still animating out.
  // Since particles are cleared immediately on mouseleave, this primarily means render if isCursorInBody = true.
  // If !isCursorInBody and particles.length is 0, we can return null.
  if (!isCursorInBody && particles.length === 0) {
    return null;
  }

  return (
    <>
      {particles.map((particle) => (
        <SmokeParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          lifespan={PARTICLE_LIFESPAN}
        />
      ))}
    </>
  );
};

export default SmokeCursorEffect;
