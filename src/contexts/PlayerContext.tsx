import { createContext, useState, ReactNode, useContext } from "react";


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void; //Não recebe parametro e não tem retorno
    toggleLoop: () => void; //Não recebe parametro e não tem retorno
    toggleShuffle: () => void; //Não recebe parametro e não tem retorno
    clearPlayingState: () => void; //Não recebe parametro e não tem retorno
    setPlayingState: (state: boolean) => void;
    playNext: () => void; //Não recebe parametro e não tem retorno
    playPrevious: () => void; //Não recebe parametro e não tem retorno
    hasNext: boolean,
    hasPrevious: boolean,
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toggleLoop(){
      setIsLooping(!isLooping);
    }

    function toggleShuffle(){
      setIsShuffling(!isShuffling);
    }

    function clearPlayingState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }
  
    function setPlayingState(state: boolean){
      setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

    function playNext(){
        if (isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }

    }
  
    return(
        <PlayerContext.Provider 
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                isPlaying,
                isLooping,
                isShuffling,
                togglePlay,
                toggleLoop,
                toggleShuffle,
                clearPlayingState,
                setPlayingState,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () =>  {
    return useContext(PlayerContext);
}