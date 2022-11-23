import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

interface LogarithmicRangeProps {
  onChange: (value: number, position: number) => void;
  minimumPosition?: number;
  maximumPosition?: number;
  defaultValue?: number;
  minimumValue?: number;
  maximumValue?: number;
}

const LogarithmicRange: FunctionComponent<LogarithmicRangeProps> = ({
  onChange,
  minimumPosition = 0,
  maximumPosition = 100,
  defaultValue = 0,
  minimumValue = 5,
  maximumValue = 1600,
}) => {
  const initialPosition =
    minimumPosition + (Math.log(defaultValue) - Math.log(minimumValue));
  const [position, setPosition] = useState(initialPosition);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const newPosition = parseInt(event.target.value);
      setPosition(newPosition);
    },
    []
  );

  useEffect(() => {
    const scale =
      (Math.log(maximumValue) - Math.log(minimumValue)) /
      (maximumPosition - minimumPosition);
    const value = Math.round(
      Math.exp((position - minimumPosition) * scale + Math.log(minimumValue))
    );

    onChange(value, position);
  }, [position]);

  return (
    <input
      type="range"
      value={position}
      min={minimumPosition}
      max={maximumPosition}
      onChange={handleChange}
    />
  );
};

export default LogarithmicRange;
