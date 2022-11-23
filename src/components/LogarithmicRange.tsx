import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

const calculatePosition = (
  value: number,
  minimumPosition: number,
  maximumPosition: number,
  minimumValue: number,
  maximumValue: number
): number => {
  const scale =
    (Math.log(maximumValue) - Math.log(minimumValue)) /
    (maximumPosition - minimumPosition);
  const position = Math.round(
    (Math.log(value) - Math.log(minimumValue)) / scale + minimumPosition
  );

  return position;
};

const calculateValue = (
  position: number,
  minimumPosition: number,
  maximumPosition: number,
  minimumValue: number,
  maximumValue: number
): number => {
  const scale =
    (Math.log(maximumValue) - Math.log(minimumValue)) /
    (maximumPosition - minimumPosition);
  const value = Math.round(
    Math.exp((position - minimumPosition) * scale + Math.log(minimumValue))
  );

  return value;
};

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
  minimumValue = 0,
  maximumValue = 10000,
}) => {
  const [position, setPosition] = useState(
    calculatePosition(
      defaultValue,
      minimumPosition,
      maximumPosition,
      minimumValue,
      maximumValue
    )
  );

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const newPosition = parseInt(event.target.value);
      setPosition(newPosition);
    },
    []
  );

  useEffect(() => {
    const value = calculateValue(
      position,
      minimumPosition,
      maximumPosition,
      minimumValue,
      maximumValue
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
