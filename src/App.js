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

  //Add row and column click handler
  handleClick() {
    let numberOfColumn = 0;
    let numberOfRow = 0;

    numberOfRow = this.refs.row.value;
    numberOfColumn = this.refs.column.value;

    if(numberOfRow > 0 && numberOfColumn > 0) {
      this.refs.exportBtn.disabled = false;
    }

    var rowCount = Array.from({ length: numberOfRow }).map((_, rowIdx) => (
      <tr key={rowIdx}>{
        Array.from({length: numberOfColumn}).map((_, colIdx) => (
          <EditableCell key={colIdx}/>
        ))
      }
      <td>
        <input type="button" onClick={() => this.onDeleteEvent(rowIdx)} value="X" />
      </td>
      </tr>
      
    ));
    
    this.setState({
      numberOfRow,
      numberOfColumn,
      rowCount
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

  //Delete row handler
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
            <input type="text" ref="row" maxLength="2" onkeyup="this.value = this.value.replace(/[^a-z]/, '')" />
            <label>Column</label>
            <input type="text" ref="column" maxLength="2" onkeyup="this.value = this.value.replace(/[^a-z]/, '')" />
            <button onClick={this.handleClick}>Add</button>
            <button ref="exportBtn" disabled onClick={() => this.onExportClick()}>Export to CSV</button>
          </div>
          <div className="display">
            <Table rowCount={ this.state.rowCount } />
          </div>
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
              {rowCount}
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
