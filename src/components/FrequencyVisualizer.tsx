import { FunctionComponent, useCallback, useEffect, useRef } from "react";

interface FrequencyVisualizerProps {
  context: AudioContext;
  input: AudioNode;
  fftSize?: number;
}

const FrequencyVisualizer: FunctionComponent<FrequencyVisualizerProps> = ({
  context,
  input,
  fftSize = 128,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { current: analyser } = useRef(new AnalyserNode(context, { fftSize }));
  const bufferLength = analyser.frequencyBinCount;
  const { current: data } = useRef(new Uint8Array(bufferLength));

  const draw = useCallback(() => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(data);

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d")!;

    canvasContext.fillStyle = "rgb(200, 200, 200)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = "rgb(0, 0, 0)";

    canvasContext.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.stroke();
  }, []);

  useEffect(() => {
    input.connect(analyser);
    draw();

    return () => {
      input.disconnect(analyser);
    };
  }, [input, draw]);

  return <canvas ref={canvasRef} />;
};

export default FrequencyVisualizer;
