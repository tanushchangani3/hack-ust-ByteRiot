import "./App.css";
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import info from "./info.json";
import MusicF from "./musicF";

function App() {
  const [currentSongId, setCurrentSongId] = useState(undefined);
  const [songs, setSongs] = useState([
    { title: "Song 1", time: 0 },
    { title: "Song 2", time: 0 },
  ]);
  const [timer, setTimer] = useState(0);
  const onTimeUpdate = (index, time) => {
    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs];
      updatedSongs[index].time = time;
      return updatedSongs;
    });
  };
  return (
    <Flex bg="#F7F7F7" overflow="hidden">
      <Grid
        templateColumns="repeat(10,1fr)"
        w="100vw"
        h="87vh"
        p="40px"
        gap="20px"
      >
        <GridItem
          colSpan={6}
          bg="#F4F4F4"
          style={{
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Flex bg="white" justifyContent="center">
            <Text color="grey">Sandbox view</Text>
          </Flex>
          <Image
            src={info[0].image}
            alt={info[0].name}
            className="image"
            style={{
              width: `${200 + 10 * timer}px`,
              height: `${200 + 10 * timer}px`,
              position: "absolute",
              // top: "220px",
              // left: "220px",
              top: "38%",
              left: "22%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Image
            src={info[1].image}
            alt={info[1].name}
            style={{
              width: "100px",
              height: "100 px",
              position: "absolute",
              // top: "270px",
              // left: "500px",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </GridItem>

        <GridItem
          colSpan={4}
          bg="white"
          style={{
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Flex bg="white" justifyContent="center">
            <Text color="grey">User view</Text>
          </Flex>
          <Flex
            direction="column"
            gap="10px"
            shadow="lx"
            rounded="lg"
            px="20px"
          >
            {info.map((item, index) => (
              <MusicF
                key={index}
                info={item}
                id={index}
                currentSongId={currentSongId}
                setCurrentSongId={setCurrentSongId}
                timer={timer}
                setTimer={setTimer}
              />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default App;
