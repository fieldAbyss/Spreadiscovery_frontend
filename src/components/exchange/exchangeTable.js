import React, { Component } from 'react';
import _ from 'lodash'
import { Table } from 'semantic-ui-react'

class ExchangeTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      column: null,
      exchanges: [
        this.props.bitflyer,
        this.props.coincheck,
        this.props.quoinex,
        this.props.zaif,
        this.props.btcbox,
        this.props.bitbank,
      ],
      direction: null,
    };
    // console.log('[ExchangeTable] constructor', this.state);
  }

  componentWillMount(){
    this.calcSpread(this.props);
    // console.log('[ExchangeTable] componentWillMount', this.state);
  }

  componentDidMount(){
    // this.calcSpread();
    // console.log('[ExchangeTable] componentDidMount', this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.calcSpread(nextProps);
    // console.log('[ExchangeTable] componentWillReceiveProps', this.state);
  }

  handleSort = clickedColumn => () => {
    const { column, exchanges, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        exchanges: _.sortBy(exchanges, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      exchanges: exchanges.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  // スプレッド計算
  calcSpread = (element) => {
    const exchanges = [
      element.bitflyer,
      element.coincheck,
      element.quoinex,
      element.zaif,
      element.btcbox,
      element.bitbank,
    ];
    const updateExchange = exchanges.map(obj => {
      return {
        ...obj,
        spread: obj.ask - obj.bid,
        spreadParsent: obj.bid / obj.ask
      }
    });
    this.setState({ exchanges: updateExchange });
  }

  // 小数->カンマ文字追加
  floatToInt = num => {
    return Math.floor(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  render() {
    // console.log('[ExchangeTable] render', this.state, this.props);
    const { column, exchanges, direction } = this.state;
    return (
      <div id="exchange-table" className="container mt-5">
        <h2>Exchanges Detail</h2>
        <Table sortable fixed striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
                Exchange
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'ask' ? direction : null} onClick={this.handleSort('ask')}>
                Ask
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'bid' ? direction : null} onClick={this.handleSort('bid')}>
                Bid
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'spread' ? direction : null} onClick={this.handleSort('spread')}>
                Spread
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'spreadParsent' ? direction : null} onClick={this.handleSort('spreadParsent')}>
                Spread (%)
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'baseVolume' ? direction : null} onClick={this.handleSort('baseVolume')}>
                Volume (24h)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(exchanges, ({ name, ask, bid, spread, spreadParsent, baseVolume }) => (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>¥ {this.floatToInt(ask)}</Table.Cell>
                <Table.Cell>¥ {this.floatToInt(bid)}</Table.Cell>
                <Table.Cell>¥ {this.floatToInt(spread)}</Table.Cell>
                <Table.Cell> {Math.floor(((1 - spreadParsent)*100)*100)/100}%</Table.Cell>
                <Table.Cell>{this.floatToInt(baseVolume)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}


export default ExchangeTable;