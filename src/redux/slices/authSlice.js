import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  authorization: localStorage.getItem('authorization') || false,
  token: localStorage.getItem('token'),
  errors: null
}

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosFetch.post('/user/login', user)
    // toast.success("Succesfully logged in");
    return response.data    
  } catch (error) {
    // toast.error(error.response.data);
    return rejectWithValue(error.response.data)
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
    })
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      console.log(action.payload);
      state.errors = action.payload.message;
    }
    )
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
