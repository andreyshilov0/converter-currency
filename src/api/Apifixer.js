const BASE_URL = "https://api.apilayer.com/fixer/";
const API_KEY = process.env.REACT_APP_API_KEY;

const myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);

const requestOptions = {
  redirect: "follow",
  headers: myHeaders,
};

export const fixerAPI = {
  getSymbols() {
    return fetch(`${BASE_URL}symbols`, { ...requestOptions, method: "GET" })
      .then((res) => res.json())
      .catch((err) => {
        console.warn(err);
      });
  },
  getLatest(base) {
    return fetch(`${BASE_URL}latest?base=${base}`, {
      ...requestOptions,
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.warn(err);
      });
  },
};
