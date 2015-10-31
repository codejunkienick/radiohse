const LOAD = 'radiohse/vote/LOAD';
const VOTE = 'radiohse/vote/VOTE';
const VOTE_SUCCESS = 'radiohse/vote/VOTE_SUCCESS';
const VOTE_FAIL = 'radiohse/vote/VOTE_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        currentSong: action.songname,
        voted: false
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
