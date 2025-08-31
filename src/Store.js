import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/paste-slice'
export default configureStore({
    reducer: {
        paste: pasteReducer
      }
})