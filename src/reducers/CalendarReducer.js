import {
  DATE_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
  year: 2017,
  month: 10,
  dateString: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATE_SELECTED:
      return action.payload;
    default:
      return state;
  }
};
