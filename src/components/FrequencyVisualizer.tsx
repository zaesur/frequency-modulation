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

const drawBar = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  data: Uint8Array
) => {
  analyser.getByteFrequencyData(data);

  const canvasContext = canvas.getContext("2d")!;
  const bufferLength = data.length;

  canvasContext.fillStyle = "rgb(0, 0, 0)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = data[i];

    canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    canvasContext.fillRect(
      x,
      canvas.height - barHeight / 2,
      barWidth,
      barHeight / 2
    );

    x += barWidth + 1;
  }
};

const drawWave = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  data: Uint8Array
) => {
  analyser.getByteTimeDomainData(data);

  const canvasContext = canvas.getContext("2d")!;
  const bufferLength = data.length;

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
};

const FrequencyVisualizer: FunctionComponent<FrequencyVisualizerProps> = ({
  fftSize = 2048,
  children,
}) => {
  const context = useAudioContext();
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const analyser = useMemo(() => new AnalyserNode(context), [fftSize]);
  const bufferLength = analyser.frequencyBinCount;
  const data = useMemo(() => new Uint8Array(bufferLength), [bufferLength]);

  const draw = useCallback(() => {
    requestAnimationFrame(draw);
    drawWave(canvasRef.current, analyser, data);
  }, [data, analyser]);

  useEffect(() => {
    draw();

    return () => {
      requestAnimationFrame(() => {});
    };
  }, [draw]);

  return (
    <div>
      {children(analyser)}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FrequencyVisualizer;
