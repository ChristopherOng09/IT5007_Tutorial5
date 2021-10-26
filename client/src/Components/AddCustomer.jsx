import React from "react";
import RoomType from "./RoomType";
import NavBar from "./NavBar"
import "./AddCustomer.css"

const status = ["Queuing", "Ready to Check In", "Miss a call"];
const registrationDetails =  ["Name" , "EmailAddress" , "Contact" , "Remarks"]
const advise = ["Enter Customer Name - Required" , "Enter email - This field is critical" , "Enter contact number - Required" , "Enter request by customer (if any)"]

function checkFormInput(customer_){

    let customer = JSON.parse(JSON.stringify(customer_));

    let status = true //assume no error in form
    let errMsg = "No error"
    if (customer.Name.length < 2) {
        status = false
        errMsg = "Please enter a valid customer Name" 
    }
   
    let contact  = Number(customer.Contact.split(" ").join(""))
    if (isNaN(contact) || (customer.Contact.length == 0 )) {
        status = false
        errMsg = "Please enter a valid contact number"
    }

    if (customer.EmailAddress.length < 2) {
        status = false;
        errMsg = "Please enter a valid email address. E.g example@gmail.com"
    }

    return {
        first: status,
        second: errMsg
    } 
}

function GenerateFormInput(props){
    return(
            <label>
                {props.purpose}
                <input type = "text" placeholder = {props.advise} name = {props.purpose} onChange = {props.onChange}/>
            </label> 
    )
}

class AddCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "" ,
            EmailAddress: "" ,
            Contact: "" ,
            Remarks: "" ,
            CheckInStatus: false,
            Status: status[0],
            Room: "deluxeRoom",
            RegistrationTime: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault()
        let validSubmit = checkFormInput(this.state)

        let customer = this.state
        customer.Contact = customer.Contact.split(" ").join("")
        customer.EmailAddress = customer.EmailAddress.split(" ").join("")

        if (validSubmit.first) {
            this.props.displayMode(true)
            this.props.updateRecords(customer, true)
        }
        else {
            alert(validSubmit.second)
        }
    }

    handleRoomChange(event){
        this.setState({Room: event.target.value})
    }

    handleOnChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        var self = this
        let roomType_ = ["deluxeRoom" , "premierRoom"]

        if (this.props.dataBaseRecords.deluxeRoom.custCounter == 0) {
            roomType_ = ["premierRoom"]
        }
        
        if (this.props.dataBaseRecords.premierRoom.custCounter == 0 ){
            roomType_ = ["deluxeRoom"]
        }

        let navBar = <NavBar displayMode = {this.props.displayMode} custCounter = {1}/>
 
        var generateForm = <form onSubmit = {self.handleSubmit}>
            {registrationDetails.map(function(purpose_ , index){
                return (<GenerateFormInput key = {index} purpose = {purpose_} advise = {advise[index]} onChange = {self.handleOnChange} />)
            })}
            <label>Room Type </label>
            <RoomType style_ = {"roomTypeStyle"} value = {this.state.Room} onChange = {this.handleRoomChange} flag = {"1"} roomType = {roomType_}/>
            <input type="submit" value="Submit" />  
        </form>

        return (<div>{navBar}{generateForm}</div>)

    }
}

export default AddCustomer