import { createStore } from 'redux';
import reducer from './reducer';

const state = createStore(reducer);

export default state;
