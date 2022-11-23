import { FunctionComponent, useCallback, useEffect, useRef } from "react";

const audioContext = new window.AudioContext();

// Oscillator
const oscillator = new OscillatorNode(audioContext);
const gainNode = new GainNode(audioContext);

// Analyser
const analyser = new AnalyserNode(audioContext, { fftSize: 2048 });
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Connect
oscillator
  .connect(gainNode)
  .connect(analyser)
  .connect(audioContext.destination);

oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
oscillator.start();

const Equalizer: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const draw = useCallback(() => {
    requestAnimationFrame(draw);

    const canvasContext = canvasRef.current.getContext("2d")!;
    const canvas = canvasRef.current;

    analyser.getByteTimeDomainData(dataArray);

    canvasContext.fillStyle = "rgb(200, 200, 200)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = "rgb(0, 0, 0)";

    canvasContext.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
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
    audioContext.resume();
    draw();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Equalizer;
