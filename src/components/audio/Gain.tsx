import { FunctionComponent, ReactNode, useMemo } from "react";
import useAudioContext from "../../hooks/useAudioContext";
import useConnect, { connectChildren, NodeProps } from "../../hooks/useConnect";

interface GainProps extends NodeProps {
  children?: ReactNode;
}

const Gain: FunctionComponent<GainProps> = ({ source, children }) => {
  const context = useAudioContext();
  const gain = useMemo(() => new GainNode(context), [context]);
  useConnect(gain, source);

  return <>{connectChildren(gain, children)}</>;
};

export default Gain;
