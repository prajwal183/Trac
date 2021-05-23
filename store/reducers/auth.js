import { LOGIN, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  userName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        userName:action.user
      };
      case LOGOUT:
        return initialState;
    default:
      return state;
  }
};
