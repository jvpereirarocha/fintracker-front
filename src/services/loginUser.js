const USER_API = `${import.meta.env.BASE_API_URL}/users`

const getHeaders = (headers={}) => {
  if (Object.keys(headers).length === 0) {
    return new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })
  }
  
  const allHeaders = new Headers()
  for (var header in headers) {
    allHeaders.append(`${header}`, `${headers[header]}`)
  }
  return allHeaders
}

async function postToBackend(resource, data, headers) {
  const url = `${USER_API}/${resource}`
  try {
    const response = await fetch(url, {
      body: JSON.stringify({...data}),
      method: 'POST',
      headers: getHeaders(headers)
    })
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`)
    }
    const payload = await response.json();
    return payload
  } catch (error) {
    alert("Error! ", error)
  }
}

export default postToBackend;