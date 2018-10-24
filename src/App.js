import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfRow: 0,
      numberOfColumn: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let numberOfColumn = 0;
    let numberOfRow = 0;

    numberOfRow = this.refs.row.value;
    numberOfColumn = this.refs.column.value;
    
    this.setState({
      numberOfRow,
      numberOfColumn
    });
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <div>
            <label>Row</label>
            <input type="number" ref="row" />
            <label>Column</label>
            <input type="number" ref="column" />
            <button onClick={this.handleClick}>Add</button>
          </div>
          <Table numberOfColumn={ this.state.numberOfColumn } numberOfRow={ this.state.numberOfRow } />
        </header>
      </div>
    );
  }
}

class Table extends Component {
  render() {
      const numberOfColumn = this.props.numberOfColumn;
      const numberOfRow = this.props.numberOfRow;
      return (
        <div id="Table">
          <table>
            <tbody>
              <TableCells numberOfColumn={ numberOfColumn } numberOfRow={ numberOfRow }></TableCells>
            </tbody>
          </table>
        </div>
      );
    }
}

class TableCells extends Component {

  onDeleteEvent = rowIdx => {
    
  };

  render() {
      
      var numberOfRow = this.props.numberOfRow;
      var numberOfColumn = this.props.numberOfColumn;
      
      var rows = Array.from({length: numberOfRow}).map((_, rowIdx) => (
        <tr key={rowIdx}>{
          Array.from({length: numberOfColumn}).map((_, colIdx) => (
            <EditableCell key={colIdx}/>
          ))
        }
        <td>
          <input type="button" onClick={this.onDeleteEvent(rowIdx)} value="X" />
        </td>
        </tr>
      ))
      
 
      return (<tbody>{rows}</tbody>);
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
