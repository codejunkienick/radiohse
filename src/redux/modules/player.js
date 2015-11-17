const LOAD = 'reactivecast/player/LOAD';
const PLAY = 'reactivecast/player/PLAY';
const PAUSE = 'reactivecast/player/PAUSE';
const STOP = 'reactivecast/player/STOP';
const UPDATE_VOLUME = 'reactivecast/player/UPDATE_VOLUME';

const initialState = {
  loaded: false,
  volume: 0.6
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        playing: false,
      };
    case PAUSE:
      return {
        ...state,
        playing: false, 
        paused: true,
      }
    case PLAY:
      return {
        ...state,
        playing: true,
        audio: action.audio,
        track: action.track
      }
    case STOP:
      return {
        ...state,
        playing: false,
        audio: null,
        paused: null,
        track: null,
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.volume
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.player.loaded;
}

export function load(streams) {
  return {
    type: LOAD,
  };
}

export function play(audio, track) {
  return {
    type: PLAY,
    track: track,
    audio: audio
  }
}

export function stop() {
  return {  
    type: STOP,
  }
} 

export function pause() {
  return {
    type: PAUSE,
  }
}

export function updateVolume(volume) {
  return {
    type: UPDATE_VOLUME,
    volume: volume
  }
}
