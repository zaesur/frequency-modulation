import { createContext, useContext } from "react";

const AudioContext = createContext(new window.AudioContext());
export const AudioContextProvider = AudioContext.Provider;

const useAudioContext = () => {
  const context = useContext(AudioContext);

  return context;
};

export default useAudioContext;
