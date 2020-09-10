import React, { Component } from "react";
import axios from "axios";

export default class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount() {
    if (this.state.list.length === 0) {
      axios.get("http://localhost:5000/api/data/currencies").then(res => {
        const list = res.data;
        this.setState({ list });
      });
    }
  }

  render() {
    const { list } = this.state;
    var index = 0;
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.label}</label>
        {/*<input name={this.props.label} onChange={this.props.onChange} list='currencies' className='data-block' />*/}
        <select onChange={this.props.onChange} id='currencies' name={this.props.label}>
          {list.map(item => (
            <option key={index++} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
