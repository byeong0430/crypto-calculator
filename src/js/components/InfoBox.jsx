import React, { Component } from 'react';
import humanizeDuration from 'humanize-duration';
import LineChart from './LineChart.jsx';

import cryptos from '../../../libs/cryptos';

export default class InfoBox extends Component {
  createCardText = cryptocurrency => {
    return cryptos.itemsToShow.map((item, index) => {
      const name = (item.name === 'last') ? 'Last Trade' : item.name.replace(/^\w/, word => word.toUpperCase());
      const currency = (item.type === 'crypto') ? cryptocurrency.symbol : cryptocurrency.fiat;
      const text = `${name} ${parseFloat(cryptocurrency[item.name]).toFixed(2)} ${currency.toUpperCase()}`;
      return (
        <div key={index}>
          <span>{text}</span>
        </div>
      );
    })
  }

  processData() {
    const transArr = this.props.transactions.transactions;
    // re-order array by asc
    const sortedTransactions = transArr.sort((prev, cur) => {
      return parseInt(prev.date) - parseInt(cur.date);
    });

    const result = [];
    sortedTransactions.forEach((el, index) => {
      const x = index;
      const y = parseInt(el.price);
      result.push({ x, y });
    })
    return result;
  }

  render() {
    const { crypto } = this.props;
    const timeDiff = (new Date()).getTime() - (crypto.timestamp * 1000);
    return (
      <article className={`card ${crypto.name.toLowerCase()} col-sm-3`}>
        <div className='card-body'>
          <header className='card-title'>
            <h4><strong>{crypto.name}</strong></h4>
          </header>
          <main className='card-text'>
            {this.createCardText(crypto)}
          </main>
          <footer>
            <div className='graph'>
              {this.props.transactions && <LineChart data={this.processData()} />}
            </div>
            <div className='update-stat'>
              <em>{`updated ${humanizeDuration(timeDiff)} ago`}</em>
            </div>
          </footer>
        </div>
      </article>
    );
  }
}