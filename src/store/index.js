import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getData } from '../api/data';

const EXCHANGE_RATE_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
const BASE_EXCHANGE_RATES_ARCHIVE_URL = "https://api.privatbank.ua/p24api/exchange_rates?json&date=";

const ACTION_TYPES = {
  LOAD_DATA_REQUEST: 'LOAD_DATA_REQUEST',
  LOAD_DATA_FAILURE: 'LOAD_DATA_FAILURE',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOAD_ARCHIVE_DATA_SUCCESS: 'LOAD_ARCHIVE_DATA_SUCCESS',
  CONVERT_MONEY: 'CONVERT_MONEY',
  GET_INPUT_VALUE: 'GET_INPUT_VALUE',
  GET_INPUT_DATE: 'GET_INPUT_DATE',
};

export const loadDataSuccess = (data) => ({
  type: ACTION_TYPES.LOAD_DATA_SUCCESS,
  data,
});

export const loadArchiveDataSuccess = (data) => ({
  type: ACTION_TYPES.LOAD_ARCHIVE_DATA_SUCCESS,
  data,
});

export const loadDataFailure = err => ({
  type: ACTION_TYPES.LOAD_DATA_FAILURE,
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


export const getDataFromApi = () => (dispatch) => {
  //dispatch(loading());
  getData(EXCHANGE_RATE_URL)
    .then(data => {
    //dispatch(loading());
    dispatch(loadDataSuccess(data));
    //dispatch(loaded());
  })
};

export const getArchiveDataFromApi = (date) => (dispatch) => {
  //dispatch(loading());
  getData(BASE_EXCHANGE_RATES_ARCHIVE_URL +`${date}`)
    .then(data => {
      console.log(date);
      //dispatch(loading());
      dispatch(loadArchiveDataSuccess(data));
      //dispatch(loaded());
    })
};

const initialState = {
  baseExchangeRate: [],
  exchangeRate: [],
  isLoading: false,
  isLoaded: false,
  hasError: false,
  inputValue: null,
  convertValue: null,
  date: new Date(),
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOAD_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ACTION_TYPES.LOAD_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        baseExchangeRate: action.data,
        exchangeRate: action.data,
      }
    }
    case ACTION_TYPES.LOAD_ARCHIVE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        exchangeRate: action.data.exchangeRate,
      }
    }
    case ACTION_TYPES.LOAD_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    case ACTION_TYPES.GET_INPUT_VALUE: {
      return {
        ...state,
        inputValue: action.target.value,
      }
    }
    case ACTION_TYPES.CONVERT_MONEY: {
      return {
        ...state,
        convertValue: Number(state.inputValue) * Number(state.exchangeRate.find(item => item.currency === 'USD').purchaseRateNB),
      }
    }
    case ACTION_TYPES.GET_INPUT_DATE: {
      return {
        ...state,
        date: action.date,
      }
    }
    default: {
      return state;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
