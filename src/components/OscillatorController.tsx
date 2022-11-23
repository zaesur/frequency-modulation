import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import useAudioContext from "../hooks/useAudioContext";
import useOscillator from "../hooks/useOscillator";
import LogarithmicRange from "./LogarithmicRange";

interface OscillatorControllerProps {
  children?: (node: AudioNode) => ReactNode;
}

const OscillatorController: FunctionComponent<OscillatorControllerProps> = ({
  children,
}) => {
  const context = useAudioContext();
  const { oscillator, start, stop } = useOscillator(context);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hertz, setHertz] = useState(440);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(hertz, context.currentTime);
  }, [oscillator, hertz]);

  return (
    <div>
      <button
        onClick={() => {
          (isPlaying ? stop : start)();

          return setIsPlaying((isPlaying) => !isPlaying);
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <label>
        <LogarithmicRange
          minimumValue={20}
          maximumValue={20000}
          defaultValue={hertz}
          onChange={setHertz}
        />
        {`Hz: ${hertz}`}
      </label>
      {children ? children(oscillator) : null}
    </div>
  );
};

export default OscillatorController;
