import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import useAudioContext from "../hooks/useAudioContext";

interface FrequencyVisualizerProps {
  fftSize?: number;
  children: (target: AnalyserNode) => ReactNode;
}

const FrequencyVisualizer: FunctionComponent<FrequencyVisualizerProps> = ({
  fftSize = 128,
  children,
}) => {
  const context = useAudioContext();
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const analyser = useMemo(() => new AnalyserNode(context), [fftSize]);
  const bufferLength = analyser.frequencyBinCount;
  const data = useMemo(() => new Uint8Array(bufferLength), [bufferLength]);

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
  }, [data, analyser, bufferLength]);

  useEffect(() => {
    draw();

    return () => {
      requestAnimationFrame(() => {});
    }
  }, [draw]);

  return (
    <div>
      {children(analyser)}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FrequencyVisualizer;
