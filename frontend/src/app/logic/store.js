import { configureStore } from "@reduxjs/toolkit"
import sessionReducer from "./auth/session.reducer"

const store = configureStore({
  reducer: {
    session: sessionReducer,
  }
})

export default store