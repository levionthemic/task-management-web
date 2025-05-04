import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },

    updateCurrentNofitications: (state, action) => {
      state.currentNotifications = action.payload
    },

    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      state.currentNotifications.unshift(incomingInvitation)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload
      state.currentNotifications = Array.isArray(incomingInvitation) ? incomingInvitation.reverse() : []
    })

    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNofitications,
  addNotification
} = notificationsSlice.actions

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer