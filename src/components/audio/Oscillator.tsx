import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import useAudioContext from "../../hooks/useAudioContext";
import { connectChildren } from "../../hooks/useConnect";

interface OscillatorProps
  extends Pick<OscillatorOptions, "frequency" | "type"> {
  isPlaying: boolean;
  children?: ReactNode;
}

const Oscillator: FunctionComponent<OscillatorProps> = ({
  isPlaying,
  type,
  frequency = 440,
  children,
}) => {
  const context = useAudioContext();
  const [oscillator, setOscillator] = useState<OscillatorNode>();

  useEffect(() => {
    if (isPlaying) {
      const newOscillator = new OscillatorNode(context, { type, frequency });
      setOscillator(newOscillator);
      newOscillator.start(context.currentTime);
    }
  }, [isPlaying, context]);

  useEffect(() => {
    if (!isPlaying) {
      oscillator?.stop();
    }
  }, [isPlaying, oscillator]);

  useEffect(() => {
    oscillator?.frequency.setValueAtTime(frequency, context.currentTime);
  }, [oscillator, frequency]);

  useEffect(() => {
    if (oscillator && type) {
      oscillator.type = type;
    }
  }, [oscillator, type]);

  return <>{oscillator ? connectChildren(oscillator, children) : children}</>;
};

export default Oscillator;
