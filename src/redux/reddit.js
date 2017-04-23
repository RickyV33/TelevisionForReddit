import axios from 'axios'
import qs from 'qs'

const normalize = (accum, video) => {
  accum.mappedToId[video.id] = video
  accum.sortedById.push(video.id)
  return accum
}

const request = (network, channel, accessToken, after = null) => {
  const url = `https://oauth.reddit.com/r/${subreddit}/${channel}`
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    param: {
      after
    }
  }

  return axios(url, options).then(response => {
    const initialValue = { mappedToId: {}, sortedById: [] }
    return response.data.data.children
      .filter(entry => entry.data.domain.match(/^(youtube.com|youtu.be)$/))
      .reduce(normalize, initialValue)
  }).catch(error => { console.error('request -> ', error) })
}

export function authorize () {
  const url = 'https://www.reddit.com/api/v1/access_token'
  const data = qs.stringify({
    'device_id': 'DO_NOT_TRACK_THIS_DEVICE',
    'grant_type': 'https://oauth.reddit.com/grants/installed_client'
  })
  const options = {
    headers: {
      // Basic (ClientId + SecretId) -> SecretId is empty string
      Authorization: 'Basic MWVqUU8wU0swZzlpZnc6'
    }
  }

  return axios.post(url, data, options).then(response => response.data).catch(error => error)
}
