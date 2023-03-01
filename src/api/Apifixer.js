const baseURL = "https://api.apilayer.com/fixer/";
const apikey = process.env.REACT_APP_API_KEY;

var myHeaders = new Headers();
myHeaders.append("apikey", apikey);

var requestOptions = {
  redirect: "follow",
  headers: myHeaders,
};

export const fixerAPI = {
  getSymbols() {
    return fetch(`${baseURL}symbols`, { ...requestOptions, method: "GET" })
      .then((res) => res.json())
      .catch((err) => {
        console.warn(err);
      });
  },
  getLatest(base) {
    return fetch(`${baseURL}latest?base=${base}`, {
      ...requestOptions,
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.warn(err);
      });
  },
};
