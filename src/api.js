const API_KEY = "4ca6b8ed3653e32c976956c690d80deea37962f7ade566452faf7b53d268f2b5";

const tickersHandlers = new Map();

const loadTickers = () => {
    if (tickersHandlers.size === 0) {
        return;
    }
    fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
            ...tickersHandlers.keys()
        ].join(",")}&tsyms=USD&api_key=${API_KEY}`
    )
        .then(r => r.json())
        .then(rawData => {
            const updatedPrices = Object.fromEntries(
                Object.entries(rawData).map(([key, value]) => [key, value.USD])
            );
            Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
                const handlers = tickersHandlers.get(currency) ?? [];
                handlers.forEach(fn => fn(newPrice));
            });
        });
};

export const subscribeToTicker = (ticker, cb) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, cb]);
};


export const unsubscribefromTicker = ticker => {
    tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

