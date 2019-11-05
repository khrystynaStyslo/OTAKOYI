import { ACTION_TYPES } from './actionTypes';

function convertValue(first, second, value) {
  return (first * value / second);
}

function findCurrency(array, ccy, value) {
  return array.find(item => item[ccy] === value)
}

const initialState = {
  baseExchangeRate: [],
  exchangeRate: [],
  isLoading: false,
  isLoadingArchive: false,
  isLoadedArchive: false,
  isLoaded: false,
  hasError: false,
  inputValue: '',
  convertValue: null,
  date: new Date(),
  firstSelect: null,
  secondSelect: null,
  allSelected: false,
};

export function reducer(state = initialState, action = {}) {
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
        baseExchangeRate: action.data,
        exchangeRate: [...action.data, {
          "ccy":"UAH",
          "base_ccy":"UAH",
          "sale":1.0000000,
          "buy":1.0000000
        }]
      }
    }
    case ACTION_TYPES.LOAD_ARCHIVE_DATA_SUCCESS: {
      return {
        ...state,
        isLoadingArchive: false,
        isLoadedArchive: true,
        exchangeRate: action.data.exchangeRate,
        firstSelect: null,
        secondSelect: null,
      }
    }
    case ACTION_TYPES.LOAD_ARCHIVE_DATA_REQUEST: {
      return {
        ...state,
        isLoadingArchive: true,
      }
    }
    case ACTION_TYPES.LOAD_ARCHIVE_DATA_FAILURE: {
      return {
        ...state,
        isLoadingArchive: false,
        hasError: true,
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
        inputValue: action.target.value.replace(/[^0-9|.]/gi, ''),
      }
    }
    case ACTION_TYPES.CLEAR_INPUT_VALUE: {
      return {
        ...state,
        inputValue: "",
      }
    }
    case ACTION_TYPES.CONVERT_MONEY: {
      return {
        ...state,
        convertValue: state.baseExchangeRate.length+1 === state.exchangeRate.length
          ? convertValue(
            findCurrency(state.exchangeRate, 'ccy', state.firstSelect).sale,
            findCurrency(state.exchangeRate, 'ccy', state.secondSelect).buy,
            Number(state.inputValue),
          )
          : convertValue(
            Number(findCurrency(state.exchangeRate, 'currency', state.firstSelect).saleRateNB),
            Number(findCurrency(state.exchangeRate, 'currency', state.secondSelect).purchaseRateNB),
            Number(state.inputValue),
          )
      }
    }
    case ACTION_TYPES.GET_INPUT_DATE: {
      return {
        ...state,
        date: action.date,
      }
    }
    case ACTION_TYPES.GET_FIRST_SELECTED_VALUE: {
      return {
        ...state,
        firstSelect: action.value,
        allSelected: !!state.secondSelect,
      }
    }
    case ACTION_TYPES.GET_SECOND_SELECTED_VALUE: {
      return {
        ...state,
        secondSelect: action.value,
        allSelected: !!state.firstSelect,
      }
    }
    case ACTION_TYPES.SWAP_CURRENCY: {
      let tempCurrency = state.firstSelect;
      let tempValue = state.inputValue;
      return {
        ...state,
        firstSelect: state.secondSelect,
        secondSelect: tempCurrency,
        inputValue: state.convertValue,
        convertValue: tempValue,
      }
    }
    default: {
      return state;
    }
  }
}
