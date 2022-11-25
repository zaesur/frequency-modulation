import { FunctionComponent, useEffect, useRef } from "react";
import { AudioContextProvider } from "../hooks/useAudioContext";
import Synthesizer from "./Synthesizer";

const App: FunctionComponent = () => {
  const audioContextRef = useRef(new AudioContext());

  return (
    <AudioContextProvider value={audioContextRef.current}>
      <Synthesizer />
    </AudioContextProvider>
  );
};

export default App;
