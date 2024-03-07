
"use client"
import { useState, useEffect } from 'react';

const Home = () => {
  
  const calculateTimeLeft = () => {
      const difference = +new Date('2024-04-05') - +new Date();
      let timeLeft: { [key: string]: number } = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(
      calculateTimeLeft()
    );
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });
  
    const timerComponents: JSX.Element[] = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval as keyof typeof timeLeft]) {
        return;
      }
  
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval as keyof typeof timeLeft]} {interval}{' '}
        </span>
      );
    });
  

  return (
 <section className='h-screen w-screen flex flex-col gap-12 justify-start items-center mt-10'>

  <div className=' w-1/2 text-center text-white font-[inter]'>
code explore
challenges
  </div>
     <div className=' flex items-center justify-center gap-2 text-cyan-300 w-[80%]'>
      {timerComponents.length ? timerComponents : <span>Tempo esgotado!</span>}
    </div>
 </section>
  );
};

export default Home;
