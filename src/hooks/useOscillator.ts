import { useCallback, useEffect, useState } from "react";

const useOscillator = (
  context: AudioContext
): { oscillator: OscillatorNode; start: () => void; stop: () => void } => {
  const [oscillatorNode, setOscillatorNode] = useState(
    new OscillatorNode(context)
  );
  const [gainNode] = useState(new GainNode(context));

  const start = useCallback(() => {
    oscillatorNode.start(context.currentTime);
  }, [context, oscillatorNode]);

  const stop = useCallback(() => {
    oscillatorNode.stop(context.currentTime);

    setOscillatorNode(new OscillatorNode(context));
  }, [context, oscillatorNode]);

  useEffect(() => {
    oscillatorNode.connect(gainNode);

    return () => {
      oscillatorNode.disconnect();
    };
  }, [oscillatorNode, gainNode]);

  useEffect(() => {
    gainNode.connect(context.destination);

    return () => {
        gainNode.disconnect();
    }
  }, [gainNode, context]);

  return {
    oscillator: oscillatorNode,
    start,
    stop,
  };
};

export default useOscillator;
