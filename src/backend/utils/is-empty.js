import * as R from 'ramda';

const isEmpty = (obj) => R.keys(obj).length === 0;

export default isEmpty;
