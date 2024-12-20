const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`

const getHeaders = (headers={}) => {
  if (Object.keys(headers).length === 0) {
    return new Headers({
      "Content-Type": "application/json",
      "X-Fintracker-Origin": "frontend",
    })
  }
  
  const allHeaders = new Headers()
  for (var header in headers) {
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

async function getToBackend(resource, queryParams={}) {

}

export const requestToBackend = {
  post: postToBackend,
  get: getToBackend,
  put: putToBackend,
}