import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import _ from 'lodash'

class exchangesSpreadBarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      exchanges: [
        this.props.bitflyer,
        this.props.coincheck,
        this.props.quoinex,
        this.props.zaif,
        this.props.btcbox,
        this.props.bitbank,
      ],
    }
    // console.log('[ExchangesSpreadBarChart] constructor', this.state);
  }

  componentWillMount(){
    this.calcSpreadParsent(this.props);
    // console.log('[ExchangesSpreadBarChart] componentWillMount', this.state);
  }

  componentDidMount(){
    // this.calcSpreadParsent();
    // console.log('[ExchangesSpreadBarChart] componentDidMount', this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.calcSpreadParsent(nextProps);
    // console.log('[ExchangesSpreadBarChart] componentWillReceiveProps', this.state);
  }

  calcSpreadParsent = (element) => {
    const exchanges = [
      element.bitflyer,
      element.coincheck,
      element.quoinex,
      element.zaif,
      element.btcbox,
      element.bitbank
    ];
    const updateExchanges = _.map(exchanges, obj => {
      return {
        ...obj,
        spreadParsent: Math.floor(((1 - obj.bid / obj.ask) * 100) * 100) / 100
      }
    });
    this.setState({exchanges: updateExchanges});
  }

	render () {
    const {exchanges} = this.state;

    // console.log('[ExchangesSpreadBarChart] render', this.state);

  	return (
      <div id="exchange-spread-bar-chart" className="container mt-5">
        <h2>Exchange Spreads</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={1140} height={300} data={exchanges}
                margin={{top: 10, right: 10, left: 10, bottom: 10}}>
            <XAxis dataKey="name"/>
            <YAxis type="number" domain={['auto', 'auto']}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="spreadParsent" label="SpreadParsent" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default exchangesSpreadBarChart;