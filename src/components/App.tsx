import { FunctionComponent, useRef } from "react";
import FrequencyVisualizer from "./FrequencyVisualizer";
import OscillatorController from "./OscillatorController";

const App: FunctionComponent = () => {
  const { current: context } = useRef(new AudioContext());

  return (
    <>
      <div>
        <OscillatorController context={context}>
          {(node) => <FrequencyVisualizer context={context} input={node} />}
        </OscillatorController>
      </div>
      <div>
        <OscillatorController context={context}>
          {(node) => <FrequencyVisualizer context={context} input={node} />}
        </OscillatorController>
      </div>
    </>
  );
};

export default App;
