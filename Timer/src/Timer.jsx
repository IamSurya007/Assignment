import { useEffect } from "react";
import { useState } from "react";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import image from "./assets/image.png";
import { CiTimer } from "react-icons/ci";

const Timer = () => {
  const [isActive, setIsActive] = useState(true);
  const initialTime = 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [totalTime, setTotalTime] = useState(initialTime);
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft == 0 && isActive) {
      setIsActive(false);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  const reset = () => {
    setTimeLeft(0);
    setIsActive(false);
  };
  const toggle = () => {
    if(!isActive){
      setTimeLeft(totalTime);
      setIsActive(true);
    }
    else{
      setIsActive(false);
    }
  };
  const Add = () => {
    const newTime = timeLeft + 10;
    setTimeLeft(newTime);
    setTotalTime(newTime);
    setIsActive(true);
  };

  return (
    <div className=" justify-center  flex items-center h-screen">
      <div className=" flex items-center flex-col rounded-md shadow-lg border h-full w-full md:w-1/4 sm:w-1/2 ">
        <h1 className=" text-lg mt-28">Routine Startine in...</h1>
        <h6 className=" text-xs font-light text-gray-500">Subheading here</h6>
        <div className="   size-44 rounded-full items-center flex justify-center mt-16 text-2xl font-semibold ">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e6e6e6"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#6a1b9a"
              strokeWidth="5"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - timeLeft / totalTime)}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
            <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#333">
              {`${String(Math.floor(timeLeft / 60)).padStart(
                2,
                "0"
              )} : ${String(timeLeft % 60).padStart(2, "0")}`}
            </text>
          </svg>
        </div>

        <div className=" text-purple-600 gap-x-24 flex mt-7">
          <button
            className="px-5 py-2 gap-x-2 flex items-center rounded-full shadow-xl"
            onClick={Add}
          >
            <IoAddOutline />
            10 sec
          </button>
          <button
            className=" px-5 py-2 gap-x-2  rounded-full shadow-xl flex items-center  "
            onClick={reset}
          >
            <IoPlaySkipForwardOutline />
            Skip
          </button>
        </div>
        <div className=" text-purple-600 mt-1">
          <button
            className="p-4  rounded-full shadow-xl flex items-center "
            onClick={toggle}
          >
            {isActive ? (
              <CiPause1 style={{ fontSize: "18px", fontWeight: "bold" }} />
            ) : (
              <CiPlay1 style={{ fontSize: "18px" }} />
            )}
          </button>
        </div>
        <div className=" mr-auto mt-5 px-5 w-full ">
          <div className="bg-purple-100 rounded-lg p-4">
            <div className=" items-end flex">
              <p className=" text-base font-medium">Step 2</p>
              <p className=" text-sm">/3</p>
            </div>
            <div className=" flex mt-2">
              <img className=" size-14" src={image} alt="image" />
              <div className=" ml-4">
                <p>Cleansing</p>
                <div className=" flex items-center mt-2 ">
                  <div className=" flex gap-x-1 ">
                    <CiTimer className=" text-purple-700" />
                    <p className="text-sm">60 sec</p>
                  </div>
                  <button className=" ml-20 text-xs font-medium text-purple-900">
                    How to do
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
