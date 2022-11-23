import { FunctionComponent, useEffect, useState } from "react";
import FrequencyVisualizer from "./FrequencyVisualizer";
import LogarithmicRange from "./LogarithmicRange";

interface OscillatorControllerProps {
  context: AudioContext;
  oscillator: OscillatorNode;
}

const OscillatorController: FunctionComponent<OscillatorControllerProps> = ({
  context,
  oscillator,
}) => {
  const [hertz, setHertz] = useState(440);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(hertz, context.currentTime);
  }, [oscillator, hertz]);

  return (
    <>
      <label>
        <LogarithmicRange
          minimumValue={20}
          maximumValue={20000}
          defaultValue={hertz}
          onChange={setHertz}
        />
        {`Hz: ${hertz}`}
      </label>
      <FrequencyVisualizer context={context} input={oscillator} />
    </>
  );
};

export default OscillatorController;
