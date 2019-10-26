export const checkStatus = response => {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
};

export const createRequest = (options = {}) => {
  // const authenticated =
  //   options.authenticated !== undefined ? options.authenticated : true;
  const method = options.method || 'GET';
  let body = options.body ? options.body : false;

  const base = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // if (authenticated) {
  //   base.headers.Authorization = `JWT ${AuthToken.get()}`;
  // }

  if (body) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
    base.body = body;
  }

  return base;
};

export const fetchJSON = async (url, request = createRequest()) =>
  fetch(url, request)
    .then(checkStatus)
    .then(res => res.json());
