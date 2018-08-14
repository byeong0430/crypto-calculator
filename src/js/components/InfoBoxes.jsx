import React, { Component } from 'react';
import InfoBox from './InfoBox.jsx';

export default class InfoBoxes extends Component {
  render() {
    const { currentTrading, currentTransactions } = this.props;
    const cards = currentTrading.map(crypto => {
      const transactions = currentTransactions.filter(trans => trans.symbol === crypto.symbol);

      return (
        <InfoBox
          key={crypto.symbol}
          crypto={crypto}
          transactions={transactions[0]}
        />
      );
    });
    return (
      <section className='quick-stats row'>
        {cards}
      </section>
    );
  }
}