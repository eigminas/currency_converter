import React, { Component } from "react";
import Currency from "./Currency";
import axios from "axios";
export default class Convert extends Component {
  constructor(props) {
    super(props);
    this.state = { from: "", to: "", amount: 0, result: 0.0, show: false };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      show: false,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { from, to, amount } = this.state;
    this.setState({
      show: true,
    });
    axios
      .get(`http://localhost:5000/api/operations/convert/${from}/${to}/${amount}`)
      .then(res =>
        this.setState({
          result: res.data.toPrecision(3),
        })
      )
      .catch(err => console.warn(err));
    e.target.reset();
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} autoComplete='off'>
          <Currency onChange={this.onChange} label='from' />
          <Currency onChange={this.onChange} label='to' />
          <div>
            <label htmlFor='amount'>Amount</label>
            <input onChange={this.onChange} className='data-block' type='text' id='amount' name='amount' />
            <input id='convert' type='submit' value='Convert' />
          </div>
        </form>
        {this.state.show ? (
          <p>
            {this.state.amount} {this.state.from} equals {this.state.result} {this.state.to}
          </p>
        ) : null}
      </React.Fragment>
    );
  }
}
