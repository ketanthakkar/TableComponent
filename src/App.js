import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let items = [...this.state.items];
    items.push({firstrow: "",  secondrow: ""});
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Add</button>
        <Table items={this.state.items} />
      </div>
    );
  }
}

class Table extends React {
  render() {
      const items = this.props.items;
      return (
        <div id="Table">
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Password</th>
              </tr>
              {items.map(item => {
                return (
                  <tr>
                    <td>{this.firstrow}</td>
                    <td>{this.secondrow}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
}

export default App;
