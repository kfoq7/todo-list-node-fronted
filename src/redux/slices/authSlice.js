import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'
import { toast } from 'react-toastify'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  authorization: localStorage.getItem('authorization') || false,
  token: localStorage.getItem('token')
}

export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
  try {
    const response = await axiosFetch.post('/user/login', user)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
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
      toast.success('User logged')
    })
    builder.addCase(login.rejected, (state, action) => {
      toast.error(action.payload.message)
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
