import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfRow: 0,
      numberOfColumn: 0,
      rowCount: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let numberOfColumn = 0;
    let numberOfRow = 0;

    numberOfRow = this.refs.row.value;
    numberOfColumn = this.refs.column.value;

    var rowCount = Array.from({ length: numberOfRow }).map((_, rowIdx) => (
      <tr key={rowIdx}>{
        Array.from({length: numberOfColumn}).map((_, colIdx) => (
          <EditableCell key={colIdx}/>
        ))
      }
      <td>
        <input  type="button" onClick={() => this.onDeleteEvent(rowIdx)} value="X" />
      </td>
      </tr>
      
    ));
    
    this.setState({
      numberOfRow,
      numberOfColumn,
      rowCount
    });
  }

  onDeleteEvent = id => {
    let rowCount = this.state.rowCount;
    rowCount.splice(id, 1);

    this.setState({
      rowCount
    });
  };
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <div className="userInput">
            <label>Row</label>
            <input type="number" ref="row" />
            <label>Column</label>
            <input type="number" ref="column" />
            <button onClick={this.handleClick}>Add</button>
          </div>
          <Table rowCount={ this.state.rowCount } />
        </header>
      </div>
    );
  }
}

class Table extends Component {
  render() {
      let rowCount = this.props.rowCount;
      return (
        <div id="Table">
          <table>
            <tbody>
              {rowCount}
            </tbody>
          </table>
        </div>
      );
    }
}

class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input type='text' />
      </td>
    );
  }
}

export default App;
