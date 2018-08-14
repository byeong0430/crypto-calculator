import '../scss/application.scss';
import React, { Component } from 'react';
import MainHeader from './components/MainHeader.jsx';
import InfoBoxes from './components/InfoBoxes.jsx';
import cryptos from '../../libs/cryptos';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiat: 'cad',
      currentTrading: [],
      currentTransactions: []
    };
  }

  componentDidMount = () => {
    cryptos.quadCryptos.forEach(eachCrypto => {
      const orderBookId = `${eachCrypto.symbol}_${this.state.fiat}`;
      const tradeUrl = `/api/quadrigacx/current-trades/${orderBookId}`;
      cryptos.getCurrentTrades(tradeUrl, eachCrypto.name, this);

      const transactionUrl = `/api/quadrigacx/transactions/${orderBookId}`;
      cryptos.getTransactions(transactionUrl, eachCrypto.name, this);
    });
  }

  render() {
    return (
      <div className='container'>
        <header>
          <MainHeader />
        </header>
        <main>
          <InfoBoxes
            currentTrading={this.state.currentTrading}
            currentTransactions={this.state.currentTransactions}
          />
        </main>
      </div >
    );
  }
}