import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      numberOfRow: 0,
      numberOfColumn: 0,
      data: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
  }

  //Add row and column click handler
  handleClick() {
    let numberOfColumn = 0;
    let numberOfRow = 0;
    let data = [];

    numberOfRow = this.refs.row.value;
    numberOfColumn = this.refs.column.value;

    for (var i = 0; i < numberOfRow; i++) {
      data.push([0])
        for (var j = 0; j < numberOfColumn; j++) {
            data[i][j] = 0;
        }
    }

    if(numberOfRow > 0 && numberOfColumn > 0) {
      this.refs.exportBtn.disabled = false;
    }
    
    this.setState({
      numberOfRow,
      numberOfColumn,
      data
    });
  }

  ////Export CSV Click handler
  onExportClick() {
    var html = document.querySelector("table").outerHTML;
    this.export_to_csv(html, "table.csv");
  }

  //Export to CSV function
  export_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
      for (var i = 0; i < rows.length-1; i++) {
        var row = [], cols = rows[i].querySelectorAll("input");
      
          for (var j = 0; j < cols.length; j++) {
              row.push(cols[j].value);
          }
          
      csv.push(row.join(","));    
    }
    this.download_csv(csv.join("\n"), filename);
  }

  //Download CSV method
  download_csv(csv, filename) {
      var csvFile;
      var downloadLink;

      csvFile = new Blob([csv], {type: "text/csv"});

      downloadLink = document.createElement("a");
      downloadLink.download = filename;
      downloadLink.href = window.URL.createObjectURL(csvFile);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <div className="userInput">
            <label>Row</label>
            <input type="text" ref="row" maxLength="2" onkeyup="this.value = this.value.replace(/[^a-z]/, '')" />
            <label>Column</label>
            <input type="text" ref="column" maxLength="2" onkeyup="this.value = this.value.replace(/[^a-z]/, '')" />
            <button onClick={this.handleClick}>Add</button>
            <button ref="exportBtn" onClick={() => this.onExportClick()}>Export to CSV</button>
          </div>
          {
            this.state.data.length > 0 &&
            <div className="display">
              <Table data={this.state.data} />
            </div>
          }
      </header>
      </div>
    );
  }
}

function Thead({ n, handleColumn }) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(<td><button onClick={() => handleColumn(i)}>Remove</button></td>);
  }
  return <thead><tr>{arr}</tr></thead>;
}

function Row({ row, i, handleRow }) {
  return (
    <tr>
      {row.map(cell => <EditableCell>{cell}</EditableCell>)} 
      <td><button onClick={() => handleRow(i)}>x</button></td>
    </tr>
  )
}

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.handleColumn = this.handleColumn.bind(this);
    this.handleRow = this.handleRow.bind(this);
  }

  handleColumn(n) {
    const newData = this.state.data.map(row => {
      return row.filter((el, i) => i !== n);
    });
    this.setState({ data: newData });
  }

  handleRow(n) {
    const newData = this.state.data.filter((el, i) => i !== n);
    this.setState({ data: newData });
  }

  render() {
      let { data } = this.state;
			if (!data.length) return <div></div>
      return (
        <div id="Table">
              <table>
              <Thead n={data[0].length} handleColumn={this.handleColumn} />
                <tbody>
                  {data.map((row, i) => <Row row={row} i={i} handleRow={this.handleRow} />)}
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