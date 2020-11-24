import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Container, Header, Button, Input, Segment } from "semantic-ui-react";

import ResultsTable from "./components/ResultsTable";
import ModalWindow from "./components/ModalWindow";
import { getRandomNumber, cubesFactory, ROUND_TIME, PLAYGROUND_SIZE, CUBE_SIZE } from "./utils";

function App() {
  const [timer, setTimer] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(ROUND_TIME);
  const [cubes, setCubes] = useState([]);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState(JSON.parse(localStorage.getItem('results')) || []);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);
  
  const stopTimer = useCallback(() => {
    setIsTimerOn(false);
    clearInterval(timer);
  }, [timer])

  useEffect(() => {
    if (!time) {
      setCubes([]);
      stopTimer();
      setTime(ROUND_TIME);
      setIsModalOpen(true);
      setIsGameStarted(false);
      console.log('Game Over!!!');
    }
  }, [time, stopTimer]); 

  const toggleTimer = () => {
    if (isTimerOn) {
      stopTimer();
    } else {
      setTimer(setInterval(() => setTime(time => time - 1), 1000));
      setIsTimerOn(true);
    }
  }

  const startNewGame = useCallback(() => {
    clearInterval(timer);
    setIsGameStarted(true);
    setCubes(cubesFactory(10));
    setPoints(0);
    setTime(ROUND_TIME);
    setTimer(setInterval(() => setTime(time => time - 1), 1000));
    setIsTimerOn(true);
  }, [timer]);

  const cubeClickHandler = index => {
    const allCubes = cubes.filter((_, idx) => idx !== index)
      .concat(cubesFactory(getRandomNumber(0, 2)));
    setCubes(allCubes.length ? allCubes : cubesFactory(10));
    setPoints(points => points + 1);
  }

  const modalCloseHandler = name => {
    setResults([...results, { name, points }]);
    setIsModalOpen(false);
    setPoints(0);
  }

  return <>
    <Container textAlign="center">
      <Header as='h1'>Cube Crusher</Header>
      <Segment inverted>
        <Input label='Points' value={points} disabled className="mr-10" />
        <Input label='Time' value={time} disabled />
      </Segment>
      {isGameStarted && <Button primary active={isTimerOn} onClick={toggleTimer}>Pause</Button>}
      <Button primary onClick={startNewGame}>{isGameStarted ? 'New Game' : 'Start'}</Button>
    </Container>

    <ResultsTable results={results} />

    <main className={`playground ${isTimerOn ? '' : 'playground--disabled'}`} style={PLAYGROUND_SIZE}>
      {cubes.map((cube, index) => <div key={cube.id}
        style={{ top: cube.top, left: cube.left, backgroundColor: cube.color, ...CUBE_SIZE }}
        className="cube"
        color={cube.color}
        onMouseDown={() => cubeClickHandler(index)} // удобней кликать по блокам чем при onClick
      />)}
    </main>

    <ModalWindow closeHandler={modalCloseHandler} isModalOpen={isModalOpen} points={points} />
  </>;
}

export default App;
