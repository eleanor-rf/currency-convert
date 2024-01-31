const fs = require("fs/promises");

const fetchKey = async () => {
  try {
    const key = await fs.readFile("./key.txt", "utf-8");
    return key;
  } catch (error) {
    console.log(error);
  }
};

const createHeaders = async () => {
  try {
    const apiKey = await fetchKey();
    const myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);
    return myHeaders;
  } catch (error) {
    console.error("Error creating headers:", error.message);
  }
};

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const from = "GBP";
const to = "USD";
const amount = 55.0;

const convertCurrency = async (to, from, amount) => {
  try {
    const headers = await createHeaders();
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      { ...requestOptions, headers }
    );
    const data = await response.json();
    const result = data.result;
    console.log(result.toFixed(2));
  } catch (error) {
    console.log(error);
  }
};

convertCurrency(to, from, amount);

const getSymbols = async () => {
  try {
    const headers = await createHeaders();
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/symbols",
      { ...requestOptions, headers }
    );
    const symbols = await response.json();
    const symbolsToString = JSON.stringify(symbols.symbols, null, 2);
    await fs.writeFile("symbols.js", "const symbols = " + symbolsToString);
    console.log("Symbols written to symbols.txt");
  } catch (error) {
    console.log(error);
  }
};
