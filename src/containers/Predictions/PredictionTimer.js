import React, { useState, useEffect } from 'react';

function PredictionTimer({ kickoffTime }) {
  const [countdown, setCountdown] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let timerId = startCountdown(kickoffTime);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [kickoffTime]);

  const startCountdown = (kickoffTime) => {
    return setInterval(() => {
      const now = new Date();
      const timeLeft = kickoffTime - now;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        setIsLocked(true);
        setCountdown('Match has started or has ended');
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  return (
    <div>
      <p>Time until kickoff: {countdown}</p>
      {isLocked && <p>Prediction is locked as the match is about to start, in progress, or has ended.</p>}
    </div>
  );
}

export default PredictionTimer;
