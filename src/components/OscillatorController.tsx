import { FunctionComponent, useCallback, useEffect, useState } from "react";
import useAudioContext from "../hooks/useAudioContext";
import useOscillator from "../hooks/useOscillator";
import LogarithmicRange from "./LogarithmicRange";

interface OscillatorControllerProps {
  target?: AudioNode;
}

const OscillatorController: FunctionComponent<OscillatorControllerProps> = ({
  target,
}) => {
  const context = useAudioContext();
  const { oscillator, endNode, start, stop } = useOscillator(context);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hertz, setHertz] = useState(440);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(hertz, context.currentTime);
  }, [oscillator, hertz]);

  useEffect(() => {
    if (target) {
      endNode.connect(target);

      return () => endNode.disconnect(target);
    }
  }, [endNode, target]);

  const handleClick = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }

    setIsPlaying((isPlaying) => !isPlaying);
  }, [isPlaying]);

  return (
    <div>
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
      <label>
        <LogarithmicRange
          minimumValue={20}
          maximumValue={20000}
          defaultValue={hertz}
          onChange={setHertz}
        />
        {`Hz: ${hertz}`}
      </label>
    </div>
  );
};

export default OscillatorController;
