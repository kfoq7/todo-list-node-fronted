import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'

const initialState = {
  task: null
}

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
  }
})

export const {} = taskSlice.actions

export default taskSlice.reducer
