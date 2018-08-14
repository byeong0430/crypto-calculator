const quadCryptos = [
  { name: 'Bitcoin', symbol: 'btc' },
  { name: 'Bitecoin Cash', symbol: 'bch' },
  { name: 'Ethereum', symbol: 'eth' },
  { name: 'Litecoin', symbol: 'ltc' }
];

const itemsToShow = [
  { name: 'last', type: 'fiat' },
  { name: 'volume', type: 'crypto' },
  { name: 'low', type: 'fiat' },
  { name: 'high', type: 'fiat' }
];

const getResponse = url => {
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}

const getCurrentTrades = async (url, name, react) => {
  const data = await getResponse(url);
  const [symbol, fiat] = data.book.split('_');
  const trading = { name, symbol, fiat, ...data.tradeResult };

  react.setState(oldState => {
    const currentTrading = [...oldState.currentTrading, trading];
    return { ...oldState, currentTrading }
  });
};

const getTransactions = async (url, name, react) => {
  const data = await getResponse(url);
  const [symbol, fiat] = data.book.split('_');
  const transactions = { name, symbol, fiat, transactions: [...data.transResult] };

  react.setState(oldState => {
    const currentTransactions = [...oldState.currentTransactions, transactions];
    return { ...oldState, currentTransactions }
  });
};

module.exports = {
  quadCryptos,
  itemsToShow,
  getCurrentTrades,
  getTransactions
}