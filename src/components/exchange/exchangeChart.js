import React, { Component } from 'react';
import _ from 'lodash';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area } from 'recharts';

class ExchangeChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    // console.log('[ExchangeChart] constructor', this.state);
  }

  componentWillMount(){
    // this.setState({ data: _.reverse(this.props.btcboxs) });
    this.combineRateData(this.props);
    // console.log('[ExchangeChart] componentWillMount', this.state);
  }

  // componentDidMount(){
  //   console.log('[ExchangeChart] componentDidMount', this.state);
  // }

  componentWillReceiveProps(nextProps) {
    // this.setState({ data: _.reverse(nextProps.btcboxs) });
    this.combineRateData(nextProps);
    // console.log('[ExchangeChart] componentWillReceiveProps', this.state);
  }

  addAverageRate = (broker) => {
    return broker.map(obj => {
      return {
        ...obj,
        avg: Math.floor((obj.ask + obj.bid) / 2)
      }
    });
  }

  combineRateData = (element) => {
    let { bitflyers, coinchecks, quoinexs, zaifs, btcboxs, bitbanks } = element;
    bitflyers = this.addAverageRate(bitflyers);
    const renameBitflyers = _.reverse(bitflyers).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Bitflyer-${key}`;
      });
    });
    coinchecks = this.addAverageRate(coinchecks);
    const renameCoinchecks = _.reverse(coinchecks).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Coincheck-${key}`;
      });
    });
    quoinexs = this.addAverageRate(quoinexs);
    const renameQuoinexs = _.reverse(quoinexs).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Quoinex-${key}`;
      });
    });
    zaifs = this.addAverageRate(zaifs);
    const renameZaifs = _.reverse(zaifs).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Zaif-${key}`;
      });
    });
    btcboxs = this.addAverageRate(btcboxs);
    const renameBtcboxs = _.reverse(btcboxs).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Btcbox-${key}`;
      });
    });
    bitbanks = this.addAverageRate(bitbanks);
    const renameBitbanks = _.reverse(bitbanks).map(obj => {
      return _.mapKeys(obj, (value, key) => {
        return `Bitbank-${key}`;
      });
    });

    let exchanges = [];
    for(let i = 0; i < renameBitflyers.length; i++){
      exchanges[i] = _.assignIn(renameBitflyers[i], renameCoinchecks[i], renameQuoinexs[i], renameZaifs[i], renameBtcboxs[i], renameBitbanks[i]);
    }
    this.setState({ data: exchanges });
  }

  render(){
    let { data } = this.state;

    // console.log('[ExchangeChart] render', this.state);
    return(
      <div id="exchange-chart" className="container">
        <h2 className="mt-5">Exchanges Chart</h2>
        <ResponsiveContainer width="100%" height={480}>
          <LineChart width={1140} height={480} data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Bitflyer-localTime" />
            <YAxis type="number" domain={['auto', 'auto']}/>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="linear" dataKey="Bitflyer-avg" stroke="#ff6384" dot={false}/>
            <Line type="linear" dataKey="Coincheck-avg" stroke="#36a2eb" dot={false}/>
            <Line type="linear" dataKey="Quoinex-avg" stroke="#cc65fe" dot={false}/>
            <Line type="linear" dataKey="Zaif-avg" stroke="#ffce56" dot={false}/>
            <Line type="linear" dataKey="Btcbox-avg" stroke="#8884d8" dot={false}/>
            <Line type="linear" dataKey="Bitbank-avg" stroke="#82ca9d" dot={false}/>
            <Brush dataKey="Bitflyer-localTime">
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey="Bitflyer-baseVolume" stroke="#ff7300" fill="#ff7300" dot={false} />
              </AreaChart>
            </Brush>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ExchangeChart