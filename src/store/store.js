import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from '../features/userInfo/userInfoSlice'


export default configureStore({
  reducer: {userInfo: userInfoSlice}
})