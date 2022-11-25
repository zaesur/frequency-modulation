import { FunctionComponent, useState } from "react";
import Destination from "./audio/Destination";
import Gain from "./audio/Gain";
import Oscillator from "./audio/Oscillator";
import LogarithmicRange from "./LogarithmicRange";

const Synthesizer: FunctionComponent = () => {
  const [hertz, setHertz] = useState(440);
  const [type, setType] = useState<OscillatorType>();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button onClick={() => setIsPlaying((isPlaying) => !isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <select onChange={(e) => setType(e.target.value as OscillatorType)}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
        <option value="sawtooth">Sawtooth</option>
      </select>
      <LogarithmicRange
        onChange={setHertz}
        defaultValue={hertz}
        minimumValue={20}
        maximumValue={20000}
      />
      <Oscillator isPlaying={isPlaying} frequency={hertz} type={type}>
        <p>{"Oscillator"}</p>
        <Gain>
          <p>{"Gain"}</p>
        </Gain>
        <Destination>
          <p>{"Destination"}</p>
        </Destination>
      </Oscillator>
    </>
  );
};

export default Synthesizer;
