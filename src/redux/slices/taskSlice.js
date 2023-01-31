import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'

const initialState = {
  task: null
}

export const fetchUserTasks = createAsyncThunk(
  'task/fetchUserTasks',
  async user => {
    const { _id: userId, token } = user
    const response = await axiosFetch.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }
)

export const addTask = createAsyncThunk(
  'task/addTask',
  async ({ userId, task }) => {
    const response = await axiosFetch.post(`/user/${userId}/create-task`, task)
    return response.data
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.task = action.payload.task
    })

    builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
      state.task
    })
  }
})

export const {} = taskSlice.actions

export default taskSlice.reducer
