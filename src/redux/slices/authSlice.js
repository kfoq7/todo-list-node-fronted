import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  authorization: localStorage.getItem('authorization') || false,
  token: localStorage.getItem('token')
}

export const login = createAsyncThunk('auth/login', async user => {
  const response = await axiosFetch.post('/user/login', user)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.authorization = false
      state.token = ''
      state.user = null
      localStorage.clear()
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      state.authorization = true
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('authorization', true)
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
