import { FunctionComponent } from "react";
import { AudioContextProvider } from "../hooks/useAudioContext";
import FrequencyVisualizer from "./FrequencyVisualizer";
import OscillatorController from "./OscillatorController";

const App: FunctionComponent = () => (
  <AudioContextProvider value={new AudioContext()}>
    <OscillatorController>
      {(node) => <FrequencyVisualizer input={node} />}
    </OscillatorController>
    <OscillatorController>
      {(node) => <FrequencyVisualizer input={node} />}
    </OscillatorController>
  </AudioContextProvider>
);

export default App;
