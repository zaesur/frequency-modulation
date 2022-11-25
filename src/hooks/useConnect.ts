import {
  ReactNode,
  FunctionComponentElement,
  isValidElement,
  Children,
  cloneElement,
  useEffect,
} from "react";
import Destination from "../components/audio/Destination";
import Gain from "../components/audio/Gain";

export interface NodeProps {
  source?: AudioNode;
}

const isConnectNode = (
  child: ReactNode
): child is FunctionComponentElement<NodeProps> => {
  return (
    isValidElement(child) && (child.type === Gain || child.type === Destination)
  );
};

const findPreviousAudioNode = (
  children: Array<ReactNode>,
  index: number
): FunctionComponentElement<NodeProps> | undefined =>
  children.slice(0, index).reverse().find(isConnectNode);
  
export const connectChildren = (source: AudioNode, children?: ReactNode) => {
  const childArray = Children.toArray(children);
  const newChildren = Children.map(children, (child, index) =>
    isConnectNode(child)
      ? cloneElement(child, {
          source:
            findPreviousAudioNode(childArray, index)?.props.source ?? source,
        })
      : child
  );

  return newChildren;
};

const useConnect = (target: AudioNode, source?: AudioNode) => {
  useEffect(() => {
    source?.connect(target);

    return () => source?.disconnect(target);
  }, [source, target]);
};

export default useConnect;
