import { render } from "@testing-library/react";
import React from "react";
import "./DisplayCustomer.css"


const tableContents = ["#" , "Name" ,  "Email" , "Contact" , "Remarks" , "Time" , "Status"  , "Check In?"]


function CreateSelectStatusBox(props) {
    
    return(
        <select className = "selectBox" value = {props.statusValue} onChange = {props.onChange}>
            <option value = "Queuing">Queuing</option>
            <option value = "ReadyToCheckIn">Ready to Check In</option>
            <option value = "MissCall">Miss a Call</option>
        </select>
    )
}

function FillTableCell(props){
    //Ignore the last 4 fields of customer object
    let essentialField = Object.keys(props.customer).slice(0 ,-4)
    return (
        essentialField.map(function(field , index) {
            return (
                <td key = {index}>
                    {props.customer[field]}
                </td>
            )
        })
    )
}

class DisplayCustomer extends React.Component{
    constructor(props) {
        super(props);

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
    }

    handleStatusChange(event , i) {
        this.props.updateCustomerRecords(this.props.viewRoomType , "Status", i , event.target.value)
    }

    handleCheckBoxChange(event , i) {
        this.props.updateCustomerRecords(this.props.viewRoomType , "CheckInStatus" , i , event.target.checked)
    }

    render(){
        
      
        let waitingList = this.props.dataBaseRecords.waitingList
        var self = this;
        var tableBodies = <tbody></tbody>

        if (waitingList.length > 0) {

            tableBodies = <tbody>
                                {waitingList.map(function(customer , index){
                                    return (<tr key = {index}> 
                                                <td>{index + 1}</td>
                                                <FillTableCell key = {index} customer = {customer}/>
                                                <td>{customer.RegistrationTime}</td>
                                                <td><CreateSelectStatusBox statusValue = {customer.Status} onChange = {(event) => self.handleStatusChange(event , index)}/> </td>   
                                                <td><input type = 'checkbox' checked = {customer.CheckInStatus} onChange = {(event) => self.handleCheckBoxChange(event, index)}></input></td>
                                            </tr>)
                                })}
                          </tbody>

                                }

        var tableHeader = <thead>
                             <tr>
                                {tableContents.map(function(header , index) {
                                    return(<th key= {index}>{header}</th>)
                                })}
                            </tr>
                          </thead>
                               
                          
        return (<div className = "waitingList"> <table>{tableHeader}{tableBodies}</table></div>)
    }
}


export default DisplayCustomer