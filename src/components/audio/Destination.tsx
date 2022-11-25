import { FunctionComponent, ReactNode, useEffect } from "react";
import useAudioContext from "../../hooks/useAudioContext";
import useConnect, { NodeProps } from "../../hooks/useConnect";

interface DestinationProps extends NodeProps {
  children?: ReactNode;
}

const Destination: FunctionComponent<DestinationProps> = ({
  source,
  children,
}) => {
  const context = useAudioContext();
  useConnect(context.destination, source);

  return <>{children}</>;
};

export default Destination;
