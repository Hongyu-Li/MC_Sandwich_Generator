const defaultHeaders = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

export function webApi (url, method, data) {
  return fetch(url, { method: method, body: JSON.stringify(data), ...defaultHeaders })
}
