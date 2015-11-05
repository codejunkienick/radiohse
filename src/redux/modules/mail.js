const SEND = 'radiohse/mail/SEND';
const SEND_SUCCESS = 'radiohse/mail/SEND_SUCCESS';
const SEND_FAIL = 'radiohse/mail/SEND_FAIL';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND:
      return {
        ...state,
        sending: true
      };
    case SEND_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true,
      };
    case SEND_FAIL:
      return {
        ...state,
        sending: false,
        sent: false,
        error: action.error
      };
    default:
      return state;
  }
}


export function send(mail) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: (client) => client.post('/mail', {
      data: {
        mail: mail
      }
    })
  };
}
