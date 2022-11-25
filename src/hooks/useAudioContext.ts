import { createContext, useContext } from "react";

const _AudioContext = createContext(new AudioContext());
export const AudioContextProvider = _AudioContext.Provider;

const useAudioContext = () => {
  const context = useContext(_AudioContext);

  return context;
};

export default useAudioContext;
