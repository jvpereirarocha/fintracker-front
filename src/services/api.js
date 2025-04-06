const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`

const getDefaultHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-Fintracker-Origin': "frontend"
  }
}

const getHeaders = (headers={}) => {
  if (Object.keys(headers).length === 0) {
    return new Headers({...getDefaultHeaders()})
  }
  
  const defaultHeaders = getDefaultHeaders()
  const allHeaders = new Headers({...defaultHeaders})
  for (var header in headers) {
    if (header in defaultHeaders) {
      continue;
    }
    allHeaders.append(`${header}`, `${headers[header]}`)
  }
  return allHeaders
}

async function postToBackend(resource, data, headers={}) {
  const url = `${BASE_URL}/${resource}`
  try {
    const response = await fetch(url, {
      body: JSON.stringify({...data}),
      method: 'POST',
      headers: getHeaders(headers)
    })
    const statusCode = response.status;
    const payload = await response.json();
    return {payload, statusCode}
  } catch (error) {
    alert("Error! ", error)
  }
}

async function putToBackend(resource, data, headers={}) {
  const url = `${BASE_URL}/${resource}`
  try {
    const response = await fetch(url, {
      body: JSON.stringify({...data}),
      method: 'PUT',
      headers: getHeaders(headers)
    })
    const statusCode = response.status;
    const payload = await response.json();
    return {payload, statusCode}
  } catch (error) {
    alert("Error! ", error)
  }
}

export function buildQueryParams(queryParams) {
  let params = ''
  Object.keys(queryParams).forEach((key, index) => {
    if (index === 0) {
      params += `?${key}=${queryParams[key]}`
    } else {
      params += `&${key}=${queryParams[key]}`
    }
  })
  return params
}

async function getToBackend(resource, headers={}, queryParams=null) {
  const urlResource = `${BASE_URL}/${resource}`
  const url = queryParams !== null ? `${urlResource}${buildQueryParams(queryParams)}` : urlResource
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(headers)
    })
    const statusCode = response.status
    const payload = await response.json()
    return { payload, statusCode }
  } catch (error) {
    alert('Error! ', error)
  }
}

export const requestToBackend = {
  post: postToBackend,
  get: getToBackend,
  put: putToBackend,
}