import thunk from "redux-thunk"
import { createStore, applyMiddleware, combineReducers} from "redux"
import auth from './auth/authReducer'
import app from './app/appReducer'
import settings from './settings/settingsReducer'
import {composeWithDevTools} from "redux-devtools-extension"

const reducer = combineReducers({
  auth,
  app,
  settings
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export type StoreType = ReturnType<typeof reducer>