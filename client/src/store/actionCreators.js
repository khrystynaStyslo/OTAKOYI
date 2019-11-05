import { getData } from "../api/data";
import { ACTION_TYPES } from "./actionTypes";

const EXCHANGE_RATE_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

export const loadDataRequest = () => ({
  type: ACTION_TYPES.LOAD_DATA_REQUEST,
});

export const loadDataSuccess = (data) => ({
  type: ACTION_TYPES.LOAD_DATA_SUCCESS,
  data,
});

export const loadArchiveDataSuccess = (data) => ({
  type: ACTION_TYPES.LOAD_ARCHIVE_DATA_SUCCESS,
  data,
});

export const loadDataFailure = () => ({
  type: ACTION_TYPES.LOAD_DATA_FAILURE,
});

export const loadArchiveDataRequest = () => ({
  type: ACTION_TYPES.LOAD_ARCHIVE_DATA_REQUEST,
});

export const loadArchiveDataFailure = () => ({
  type: ACTION_TYPES.LOAD_ARCHIVE_DATA_FAILURE,
});

export const convertMoney = () => ({
  type: ACTION_TYPES.CONVERT_MONEY,
});

export const getInputValue = ({target}) => ({
  type: ACTION_TYPES.GET_INPUT_VALUE,
  target,
});

export const getInputDate = (date) => ({
  type: ACTION_TYPES.GET_INPUT_DATE,
  date,
});

export const getFirstSelectValue = ({target}) => ({
  type: ACTION_TYPES.GET_FIRST_SELECTED_VALUE,
  value: target.value,
});

export const getSecondSelectValue = ({target}) => ({
  type: ACTION_TYPES.GET_SECOND_SELECTED_VALUE,
  value: target.value,
});

export const clearInput = () => ({
  type: ACTION_TYPES.CLEAR_INPUT_VALUE,
});

export const swapCurrency = () => ({
  type: ACTION_TYPES.SWAP_CURRENCY,
});

export const getDataFromApi = () => (dispatch) => {
  setTimeout(() => {
    getData(EXCHANGE_RATE_URL)
      .then(data => {
        dispatch(loadDataSuccess(data));
      })
      .catch(() => {
        dispatch(loadDataFailure());
      });
  }, 700)
};

export const getArchiveDataFromApi = (date) => (dispatch) => {
  dispatch(loadArchiveDataRequest());
  setTimeout(() => {
    getData(`/api/archiveData?date=${encodeURIComponent(date)}`)
      .then(data => {
        dispatch(loadArchiveDataSuccess(data));
      })
      .catch(() => {
        dispatch(loadArchiveDataFailure());
      });
    dispatch(loadArchiveDataRequest());
  }, 500)
};
