const LOAD = 'reactivecast/vote/LOAD';
const UPDATE = 'reactivecast/vote/UPDATE';
const STOP = 'reactivecast/vote/STOP';
const VOTE = 'reactivecast/vote/VOTE';
const VOTE_SUCCESS = 'reactivecast/vote/VOTE_SUCCESS';
const VOTE_FAIL = 'reactivecast/vote/VOTE_FAIL';

const initialState = {
  loaded: false,
  streamEnabled: false,
  currentSong: 'Эфир окончен'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        currentSong: action.songname,
        streamEnabled: true,
        voted: false,
      };
    case UPDATE:
      return {
      ...state,
      voted: false
      }
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

export function isVoted(globalState, songname) {
  return globalState.vote.voted && globalState.vote.songname === songname;
}

export function update() {
  return {
    type: UPDATE
  }
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
