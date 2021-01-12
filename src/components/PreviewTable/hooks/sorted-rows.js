import { useReducer, useEffect } from 'react';
import * as R from 'ramda';

const SORT_DESCENDING = 'SORT_DESCENDING';
const SORT_ASCENDING = 'SORT_ASCENDING';
const SET_ROWS = 'SET_ROWS';
const CLEAR_ROWS = 'CLEAR_ROWS';

const initialState = {
  rows: [],
  headerId: '',
  ascending: true,
};

const reducer = (state, { payload, type }) => {
  switch (type) {
    case SORT_ASCENDING: {
      const { headerId } = payload;
      return {
        ...state,
        rows: R.sort((a, b) => {
          switch (typeof a[headerId]) {
            case 'string':
              return a[headerId].localeCompare(b[headerId]);
            case 'number':
              return (a[headerId] - b[headerId]);
            case 'object':
              if (a[headerId] instanceof Date) {
                return (a[headerId].getTime() - b[headerId].getTime());
              }
              return 0;
            default:
              return 0;
          }
        }, state.rows),
        ascending: true,
        headerId,
      };
    }
    case SORT_DESCENDING: {
      const { headerId } = payload;
      return {
        ...state,
        rows: R.sort((b, a) => {
          switch (typeof a[headerId]) {
            case 'string':
              return a[headerId].localeCompare(b[headerId]);
            case 'number':
              return (a[headerId] - b[headerId]);
            case 'object':
              if (a[headerId] instanceof Date) {
                return (a[headerId].getTime() - b[headerId].getTime());
              }
              return 0;
            default:
              return 0;
          }
        }, state.rows),
        ascending: false,
        headerId,
      };
    }
    case SET_ROWS:
      return {
        ...state,
        rows: payload.rows,
        headerId: '',
        ascending: true,
      };
    case CLEAR_ROWS:
      return {
        ...state,
        rows: [],
        headerId: '',
        ascending: true,
      };
    default:
      return { ...state };
  }
};
const useSortedRows = (rows) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (rows && rows.length > 0) {
      dispatch({ type: SET_ROWS, payload: { rows } });
    }
    return () => {
      dispatch({ type: CLEAR_ROWS });
    };
  }, [rows]);

  const onSort = (headerId) => {
    const type = state.ascending && state.headerId === headerId ? SORT_DESCENDING : SORT_ASCENDING;
    console.log(type);
    console.log(headerId);
    dispatch({ type, payload: { headerId } });
  };

  useEffect(() => {
    console.log(state.rows);
  }, [state.rows]);

  return {
    sortedRows: state,
    onSort,
  };
};

export default useSortedRows;
