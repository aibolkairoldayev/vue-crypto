const API_KEY = "4ca6b8ed3653e32c976956c690d80deea37962f7ade566452faf7b53d268f2b5";

export const loadTickers = tickers =>
    fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(",")}&api_key=${API_KEY} `
    )
        .then(r => r.json())
        .then(rawData =>
            Object.fromEntries(
                Object.entries(rawData).map(([key, value]) => [key, 1 / value])
            )
        );