import React, { Component } from 'react';
import axios from '../../axios';
import moment from 'moment';

import ExchangeChart from './exchangeChart';
import ExchangeSpreadMessage from './exchangeSpreadMessage';
import ExchangesSpreadBarChart from './exchangeSpreadBarChart';
import ExchangeTable from './exchangeTable';

import Spinner from '../../UI/Spinner';

class Exchange extends Component {
  constructor(props){
    super(props);
    this.state = {
      bitflyers: [],
      coinchecks: [],
      quoinexs:[],
      zaifs: [],
      btcboxs: [],
      bitbanks: [],
    }
    // console.log(process.env);
    // console.log('[App] constructor', this.state);
  }

  componentWillMount() {
    // this.fetchDataExchanges('componentWillMount');
    this.allExchangeTicker();
    // console.log('[App] componentWillMount', this.state);
  }

  componentDidMount(){
    this.appComponent = setInterval( () => this.allExchangeTicker(), 30000);
    // console.log('[App] componentDidMount', this.state);
  }

  componentWillUnmount(){
    clearInterval(this.appComponent);
  }

  allExchangeTicker = () => {
    this.fetchDataTickers('bitflyers', 'Bitflyer');
    this.fetchDataTickers('coinchecks', 'Coincheck');
    this.fetchDataTickers('quoinexs', 'Quoinex');
    this.fetchDataTickers('zaifs', 'Zaif');
    this.fetchDataTickers('btcboxs', 'Btcbox');
    this.fetchDataTickers('bitbanks', 'Bitbank');
  }

  fetchDataTickers = (brokers, Broker) => {
    this.brokers = brokers;
    axios.get(`/${brokers}/tickers`)
      .then(res => {
          let exchanges = [];
          exchanges[brokers] = res.data[Broker].map(fetchData => {
            let utcTime  = moment.utc(fetchData.datetime).toDate();
            return {
              ...fetchData,
              name: `${Broker}`,
              localTime: moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
            };
          });
          this.setState({ [brokers]: exchanges[brokers] });
        }
      ).catch(err => console.log(err));
  }

  render() {

    const { bitflyers, coinchecks, quoinexs, zaifs, btcboxs, bitbanks } = this.state;
    // console.log('[App] render isLoaded(ture)', this.state);
    if(!(bitflyers.length > 0 && coinchecks.length > 0 && quoinexs.length > 0 && zaifs.length > 0 && btcboxs.length > 0 && bitbanks.length > 0 )){
      return <Spinner className="container" />;
    }

    return (
      <div id="exchange">
        <ExchangeChart
          bitflyers={bitflyers}
          coinchecks={coinchecks}
          quoinexs={quoinexs}
          zaifs={zaifs}
          btcboxs={btcboxs}
          bitbanks={bitbanks}
        />
        <ExchangeSpreadMessage
          bitflyer={bitflyers[0]}
          coincheck={coinchecks[0]}
          quoinex={quoinexs[0]}
          zaif={zaifs[0]}
          btcbox={btcboxs[0]}
          bitbank={bitbanks[0]}
        />
        <ExchangesSpreadBarChart
          bitflyer={bitflyers[0]}
          coincheck={coinchecks[0]}
          quoinex={quoinexs[0]}
          zaif={zaifs[0]}
          btcbox={btcboxs[0]}
          bitbank={bitbanks[0]}
        />
        <ExchangeTable
          bitflyer={bitflyers[0]}
          coincheck={coinchecks[0]}
          quoinex={quoinexs[0]}
          zaif={zaifs[0]}
          btcbox={btcboxs[0]}
          bitbank={bitbanks[0]}
        />
      </div>
    );
  }
}

export default Exchange;
