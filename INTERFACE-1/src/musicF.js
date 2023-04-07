import { useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";

const MusicF = ({
  info,
  id,
  currentSongId,
  setCurrentSongId,
  timer,
  setTimer,
}) => {
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
  const [timerIntervalId, setTimerIntervalId] = useState(undefined);

  useEffect(() => {
    const sec = parseInt(info.timeofthesong.split(":")[1]);
    const min = parseInt(info.timeofthesong.split(":")[0]);
    setTime({
      min: min,
      sec: sec,
    });
  }, [info.timeofthesong]);

  useEffect(() => {
    let interval;
    if (id === currentSongId && isPlaying) {
      interval = setInterval(() => {
        const currSec = seconds + 1;
        setSeconds(currSec);
        const min = Math.floor(currSec / 60);
        const sec = Math.floor(currSec % 60);
        setCurrTime({
          min: min,
          sec: sec,
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [id, currentSongId, isPlaying, seconds]);

  const playingButton = () => {
    if (id === currentSongId) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        // Start the timer
        setTimer(0);
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        // Save the interval ID in state so we can clear it later
        setTimerIntervalId(interval);
      } else {
        // Stop the timer
        clearInterval(timerIntervalId);
      }
    } else {
      setIsPlaying(true);
      setCurrentSongId(id);
      setSeconds(0);
      setCurrTime({ min: 0, sec: 0 });
    }
  };
  return (
    <React.Fragment>
      <Flex
        direction="column"
        p="10px"
        bg="white"
        style={{
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 0.1), -2px -2px 2px rgba(0, 0, 0, 0.1), 2px -2px 2px rgba(0, 0, 0, 0.1), -2px 2px 2px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{info.name}</Text>

        <Flex>
          {currTime.min}:{currTime.sec}/{time.min}:{time.sec}
        </Flex>

        <Input
          id={id}
          type="range"
          min="0"
          max={time.min * 60 + time.sec}
          value={seconds}
          onChange={(e) => {
            setSeconds(e.target.value);
            setCurrTime({
              min: Math.floor(e.target.value / 60),
              sec: Math.floor(e.target.value % 60),
            });
          }}
        />

        <Flex justify="center">
          <Button border="none" bg="none">
            <IconContext.Provider
              value={{
                size: "3em",
                color: "black",
              }}
            >
              <BiSkipPrevious />
            </IconContext.Provider>
          </Button>
          {!isPlaying ? (
            <Button onClick={playingButton} border="none" bg="none">
              <IconContext.Provider value={{ size: "3em", color: "black" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </Button>
          ) : (
            <Button onClick={playingButton} border="none" bg="none">
              <IconContext.Provider value={{ size: "3em", color: "black" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </Button>
          )}
          <Button border="none" bg="none">
            <IconContext.Provider value={{ size: "3em", color: "black" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </Button>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default MusicF;
