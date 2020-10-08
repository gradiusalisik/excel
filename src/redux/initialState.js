import {storage} from '@core/utils';
import {defaultStyles, defaultTitleHeader} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'someText' }
  stylesState: {},
  currentText: '',
  currentHeader: defaultTitleHeader,
  currentStyles: defaultStyles,
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
