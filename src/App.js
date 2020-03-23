import React, { Component } from "react";
import { render } from "react-dom";

import ReactDropzone from "react-dropzone";
import request from "superagent";
import Papa from 'papaparse'
class App extends Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      jsondata: undefined,
      name : undefined,
      marks : undefined,
      found : "No"
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData(result) {
    var data = result.data;
    this.setState({jsondata:data})
    console.log(data);
  }

  display = (e) =>{
        let name = e.target.value;
        this.setState({name:name})
        let jsondata = this.state.jsondata;
        let i,flag=0
        for(i in jsondata)
        {
          if((jsondata[i].Name==name)&&(name!="")){
            console.log(jsondata[i].Name)
            console.log(jsondata[i].Marks)
            flag=1
            break
          }
        }
        if(flag==1)
        {
         this.setState({found:"Yes"})
         this.setState({marks:jsondata[i].Marks})
        }
  }

  render() {
    console.log(this.state.csvfile);
    let result
    if(this.state.found=="Yes")
    {
      result = <div>Marks :  {this.state.marks}</div>
    }
    else{
      result = <div>Name not found</div>
    }
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
        <input type="text" placeholder = "Enter name" onChange = {(event => this.display(event))}/>
        <br></br>
        <div>
        {result}
        </div>
      </div>
    );
  }
}

export default App;