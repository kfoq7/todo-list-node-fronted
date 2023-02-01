import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFetch } from '../../axios'

const initialState = {
  tasks: [],
  isLoading: false,
  errors: null
}

export const fetchUserTasks = createAsyncThunk(
  'task/fetchUserTasks',
  async user => {
    const { userId, token } = user
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
  async ({ userId, token, task }) => {
    const response = await axiosFetch.post(
      `/user/${userId}/create-task`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  }
)

export const editTask = createAsyncThunk(
  'task/editTask',
  async ({ userId, taskId, task, token }) => {
    const response = await axiosFetch.put(`/task/${userId}/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ userId, taskId, token }) => {
    const response = await axiosFetch.delete(
      `/user/delete-task/${userId}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  }
)

export const updateStatusTask = createAsyncThunk(
  'task/updateStatusTask',
  async ({ userId, taskId, status, token }) => {
    const response = await axiosFetch.put(
      `/task/change-status/${userId}/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks
      state.errors = null
    })
    builder.addCase(addTask.rejected, (state, action) => {
      state.errors = action.error.message
    })

    builder.addCase(fetchUserTasks.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
      const { tasks } = action.payload
      state.tasks = tasks
      state.isLoading = false
      state.errors = null
    })
    builder.addCase(fetchUserTasks.rejected, (state, action) => {
      const { message } = action.error
      state.tasks = []
      state.isLoading = false
      state.errors = message
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { user } = action.payload
      state.tasks = user.tasks
    })

    builder.addCase(updateStatusTask.fulfilled, (state, action) => {
      const { user } = action.payload
      state.tasks = user.tasks
    })
  }
})

export const {} = taskSlice.actions

export default taskSlice.reducer
