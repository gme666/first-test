import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  DATE_SELECTED,
} from './types';

export const usageUpdate = ({ year, month, dateString, usage }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/usage/${year}/${month}/${dateString}`)
      .set({ dateString, usage })
      .then(() => {
        dispatch({ type: null });
        Actions.bigCalendar();
      });
  };
};

export const selectDate = ({ year, month, dateString }) => {
  Actions.editUsage();
  return {
    type: DATE_SELECTED,
    payload: { year, month, dateString }
  };
};

export const changeMonth = ({ year, month }) => {
  return {
    type: DATE_SELECTED,
    payload: { year, month }
  };
};
