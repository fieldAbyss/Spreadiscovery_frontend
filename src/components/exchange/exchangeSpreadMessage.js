import React, { Component } from 'react';
import { Card, Table } from 'semantic-ui-react';
import _ from 'lodash';

class ExchangeSpreadMessage extends Component {
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
      items: {
        base: {
          maxRate: {},
          minRate: {},
          maxSpread: {},
          minSpread: {}
        },
        highPriceSpread: {},
        highBidAskSpread: {}
      },
    }
    // console.log('[ExchangeSpreadMessage] constructor', this.state);
  }

  componentWillMount(){
    this.calcHighPriceSpread(this.props);
    // console.log('[ExchangeSpreadMessage] componentWillMount', this.state);
  }

  componentDidMount(){
    // console.log('[ExchangeSpreadMessage] componentDidMount', this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.calcHighPriceSpread(nextProps);
    // console.log('[ExchangeSpreadMessage] componentWillReceiveProps', this.state);
  }

  calcHighPriceSpread = (element) => {
    const exchanges = [
      element.bitflyer,
      element.coincheck,
      element.quoinex,
      element.zaif,
      element.btcbox,
      element.bitbank,
    ];
    const maxRate = _.maxBy(exchanges, (o) => {
      return o.bid;
    });
    const minRate = _.minBy(exchanges, (o) => {
      return o.ask;
    });
    const exchangeSpread = Math.floor(maxRate.bid - minRate.ask);
    const exchangeSpreadParsent = Math.floor((( 1 - minRate.ask / maxRate.bid ) * 100 ) * 100 ) / 100;

    const maxSpread = _.maxBy(exchanges, (o) => {
      return o.ask - o.bid;
    });
    const minSpread = _.minBy(exchanges, (o) => {
      return o.ask - o.bid;
    });
    const maxSpreadRate = Math.floor(maxSpread.ask - maxSpread.bid);
    const maxSpreadParsent = Math.floor((( 1 - maxSpread.bid / maxSpread.ask ) * 100 ) * 100 ) / 100;
    const minSpreadParsent = Math.floor((( 1 - minSpread.bid / minSpread.ask ) * 100 ) * 100 ) / 100;

    this.setState({
      items: {
        base: {
          maxRate,
          minRate,
          maxSpread,
          minSpread
        },
        highPriceSpread: {
          datetime: maxRate.localTime,
          spread: exchangeSpread,
          parsent: exchangeSpreadParsent,
          currency: maxRate.symbol,
          lowExchange: minRate.name,
          highExchange: maxRate.name,
        },
        highBidAskSpread: {
          datetime: maxSpread.localTime,
          spread: maxSpreadRate,
          parsent: maxSpreadParsent,
          minParsent: minSpreadParsent,
          currency: maxSpread.symbol,
          highExchange: maxSpread.name,
        }
      },
    });
  }

  // 小数->カンマ文字追加
  floatToInt = num => {
    return Math.floor(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  render(){
    const { items } = this.state;
    // console.log('[ExchangeSpreadMessage] render', this.state);
    return (
      <div id="exchange-spread-message" className="container mt-5">
        <h2>Top Spreads</h2>
        <Card.Group itemsPerRow={2}>
          <Card>
            <Card.Content textAlign="center" header="High Price Spread" />
            <Card.Content textAlign="center" meta={items.highPriceSpread.datetime} />
            <Card.Content textAlign="center">
              <Card.Description>Spread(¥): ¥{this.floatToInt(items.highPriceSpread.spread)}</Card.Description>
              <Card.Description>Spread(%): {items.highPriceSpread.parsent} %</Card.Description>
              <Card.Description>Currency: {items.highPriceSpread.currency}</Card.Description>
              <Card.Description>Low Exchange: {items.highPriceSpread.lowExchange}</Card.Description>
              <Card.Description>High Exchange: {items.highPriceSpread.highExchange}</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content textAlign="center" header="High Bid/Ask Spread" />
            <Card.Content textAlign="center" meta={items.highBidAskSpread.datetime} />
            <Card.Content textAlign="center">
              <Card.Description>Spread(¥): ¥ {this.floatToInt(items.highBidAskSpread.spread)}</Card.Description>
              <Card.Description>Spread(%): {items.highBidAskSpread.parsent} %</Card.Description>
              <Card.Description>Currency: {items.highBidAskSpread.currency}</Card.Description>
              <Card.Description>High Exchange: {items.highBidAskSpread.highExchange}</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <hr />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Currency</Table.HeaderCell>
              <Table.HeaderCell>Price Spread</Table.HeaderCell>
              <Table.HeaderCell>Last Low Price</Table.HeaderCell>
              <Table.HeaderCell>Low Exchange</Table.HeaderCell>
              <Table.HeaderCell>Last High Price</Table.HeaderCell>
              <Table.HeaderCell>High Exchange</Table.HeaderCell>
              <Table.HeaderCell>Low Bid/Ask Spread</Table.HeaderCell>
              <Table.HeaderCell>Low B/A Exchange</Table.HeaderCell>
              <Table.HeaderCell>High Bid/Ask Spread</Table.HeaderCell>
              <Table.HeaderCell>High B/A Exchange</Table.HeaderCell>
              </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan='10' textAlign="center">{items.base.maxRate.localTime}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{items.base.maxRate.symbol}</Table.Cell>
              <Table.Cell>{items.highPriceSpread.parsent} %</Table.Cell>
              <Table.Cell>¥ {this.floatToInt(items.base.minRate.ask)}</Table.Cell>
              <Table.Cell>{items.base.minRate.name}</Table.Cell>
              <Table.Cell>¥ {this.floatToInt(items.base.maxRate.bid)}</Table.Cell>
              <Table.Cell>{items.base.maxRate.name}</Table.Cell>
              <Table.Cell>{items.highBidAskSpread.minParsent} %</Table.Cell>
              <Table.Cell>{items.base.minSpread.name}</Table.Cell>
              <Table.Cell>{items.highBidAskSpread.parsent} %</Table.Cell>
              <Table.Cell>{items.base.maxSpread.name}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ExchangeSpreadMessage

