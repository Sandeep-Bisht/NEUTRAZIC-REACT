import { createStore } from "redux";
// import createSagaMiddleware from 'redux-saga'
import rootReducer from "../rootreducer"
// import {rootSaga} from '../rootsaga'

// const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
rootReducer,
// applyMiddleware(sagaMiddleware),
);
// sagaMiddleware.run(rootSaga)