import { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return ()=> clearInterval(interval);
  }, [isActive, time]);
  const toggle=()=>{
    setIsActive(!isActive);
  };
  const reset= ()=>{
    setTime(0);
    setIsActive(false)
  }
  return (
    <div className=" justify-center  flex items-center h-screen">
      <div className=" flex items-center flex-col rounded-md border-black border h-4/5 w-1/4">
        <div className=" border-2 size-44 rounded-full items-center flex justify-center mt-3 border-black">
          {String(Math.floor((time/1000)%60)).padStart(2, '0')}:
          {String(Math.floor(time%1000)).slice().padStart(2, '0')}
        </div>
        <div className=" gap-x-3 flex mt-auto mb-4">
          <button className="  bg-blue-500 px-5 py-2 rounded-md" onClick={toggle}>{isActive? 'stop': 'start'}</button>
          <button className=" px-5 py-2 rounded-md bg-red-500" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
