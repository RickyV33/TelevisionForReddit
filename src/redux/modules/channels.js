import { createSelector } from 'reselect'

import { channelNames } from './channelNames.js'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/channels/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/channels/GET_NEXT_VIDEO'
const ADD_NEXT_VIDEOS = 'TelevisionForReddit/channels/ADD_NEXT_VIDEOS'
const UPDATE_AFTER = 'TelevisionForReddit/channels/UPDATE_AFTER'

const initialState = {
  currentChannelId: 0,
  0: {
    name: 'hot',
    next: [],
    current: '',
    previous: [],
    after: null,
    id: 0
  }
}

function createChannel (id, nameId) {
  const templateChannel = {
    nameId: 0,
    id: 0,
    next: [],
    current: '',
    previous: [],
    after: null
  }
  return {
    ...templateChannel,
    nameId,
    id
  }
}

function createChannels (channelNames, count) {
  let id
  const initialState = {
    byId: {},
    allIds: []
  }

  return channelNames.allIds.reduce((accum, nameId) => {
    id = count++
    accum.byId[id] = createChannel(id, nameId)
    accum.allIds.push(id)
    return accum
  }, initialState)
}

export default function reducer (state = createChannels(channelNames, 0), action) {
  const currentChannelId = state.currentChannelId
  const currentChannel = state[currentChannelId]

  switch (action.type) {
    case GET_PREVIOUS_VIDEO:
      // return {
      //   ...state,
      //   [currentChannelId]: {
      //     ...currentChannel,
      //     next: [currentChannel.current, ...currentChannel.next],
      //     current: currentChannel.previous.slice(-1).pop(),
      //     previous: currentChannel.previous.slice(0, previous.length - 1)
      //   }
      // }

    case GET_NEXT_VIDEO:
      // return {
      //   ...state,
      //   [currentChannelId]: {
      //     ...currentChannel,
      //     previous: current ? [...previous, current] : initialState.previous,
      //     current: currentChannel.next[0],
      //     next: currentChannel.next.slice(1)
      //   }
      // }

    case ADD_NEXT_VIDEOS:
      // return {
      //   ...state,
      //   [currentChannelId]: {
      //     ...currentChannel,
      //     next: [...currentChannel.next, ...action.videos]
      //   }
      // }

    case UPDATE_AFTER:
      // return {
      //   ...state,
      //   [currentChannelId]: {
      //     ...currentChannel,
      //     after: action.after
      //   }
      // }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const getPreviousVideo = () => ({ type: GET_PREVIOUS_VIDEO })

export const getNextVideo = () => ({ type: GET_NEXT_VIDEO })

export const addNextVideos = videos => ({ type: ADD_NEXT_VIDEOS, videos })

export const updateCurrentChannelId = channelId => ({ type: UPDATE_CURRENT_CHANNEL_ID, channelId })

export const updateAfter = after => ({ type: UPDATE_AFTER, after })

/**
 * Selectors
 */

// const currentChannelId = state => state.entities.channels.currentChannelId
// const channels = state => state.entities.channels
//
// export const selectCurrentChannel = createSelector(
//   [currentChannelId, channels],
//   (currentChannelId, channels) => channels[currentChannelId])
