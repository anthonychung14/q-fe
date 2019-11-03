export const HEADERS = {
  headers: {
    Authorization: 'Bearer keyXl84W0rtRUuOEV', // SUPER SECRET KEY
  },
};

const AIRTABLE_APP_ID = 'appO4vBVgVx66KFPX';
const GIPHY_API_KEY = '5H93zHGj3Eg4pOv4BaV7oyJiO10O0r2X';

export const fetchAirtableApi = async resourceType => {
  const { records } = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/${resourceType}?view=Grid%20view`,
    HEADERS,
  )
    .then(r => r.json())
    .catch(e => e);

  return records;
};

export const fetchGiphy = async () => {
  const { data } = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`,
  )
    .then(r => r.json())
    .catch(e => {
      console.log(e, 'eeeee');
    });

  return data;
};

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
