const LOAD = 'radiohse/vote/LOAD';
const STOP = 'radiohse/vote/STOP';
const VOTE = 'radiohse/vote/VOTE';
const VOTE_SUCCESS = 'radiohse/vote/VOTE_SUCCESS';
const VOTE_FAIL = 'radiohse/vote/VOTE_FAIL';

const initialState = {
  loaded: false,
  streamEnabled: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        currentSong: action.songname,
        voted: false,
        streamEnabled: true,
      };
    case STOP:
      return {
        ...state,
        currentSong: action.songname,
        streamEnabled: false,
      };
    case VOTE:
      return {
        ...state,
        voting: true
      };
    case VOTE_SUCCESS:
      return {
        ...state,
        voting: false,
        voted: true
      };
    case VOTE_FAIL:
      return {
        ...state,
        voting: false,
        voteError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.vote.loaded;
}

export function load(songname) {
  return {
    type: LOAD,
    songname: songname
  };
}

export function voteSong(songname, vote) {
  console.log(songname + ' ' + vote);
  return {
    types: [VOTE, VOTE_SUCCESS, VOTE_FAIL],
    promise: (client) => client.post('/vote', {
      data: {
        songname: songname,
        vote: vote
      }
    })
  };
}

export function stopStream() {
  return {
    type: STOP,
    songname: 'Эфир окончен'
  };
}
