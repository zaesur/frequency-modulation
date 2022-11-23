import { FunctionComponent, useEffect, useRef } from "react";
import OscillatorController from "./OscillatorController";

const App: FunctionComponent = () => {
  const { current: context } = useRef(new AudioContext());
  const { current: oscillatorNodeOne } = useRef(new OscillatorNode(context));
  const { current: oscillatorNodeTwo } = useRef(new OscillatorNode(context));
  const { current: gainNode } = useRef(new GainNode(context));

  useEffect(() => {
    oscillatorNodeOne.connect(gainNode).connect(context.destination);
    oscillatorNodeTwo.connect(gainNode).connect(context.destination);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          oscillatorNodeOne.start(context.currentTime);
          oscillatorNodeTwo.start(context.currentTime);
        }}
      >
        Play
      </button>
      <OscillatorController context={context} oscillator={oscillatorNodeOne} />
      <OscillatorController context={context} oscillator={oscillatorNodeTwo} />
    </>
  );
};

export default App;
