import { FunctionComponent } from "react";
import { AudioContextProvider } from "../hooks/useAudioContext";
import FrequencyVisualizer from "./FrequencyVisualizer";
import OscillatorController from "./OscillatorController";

const App: FunctionComponent = () => (
  <AudioContextProvider value={new AudioContext()}>
    <FrequencyVisualizer>
      {(target) => <OscillatorController target={target} />}
    </FrequencyVisualizer>
    <FrequencyVisualizer>
      {(target) => <OscillatorController target={target} />}
    </FrequencyVisualizer>
  </AudioContextProvider>
);

export default App;
