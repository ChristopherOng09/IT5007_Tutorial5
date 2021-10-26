import React from 'react'
import "./InfoBar.css"
import RoomType from './RoomType'
import DeleteCustomer from './DeleteCustomer'
import DisplayFreeSlots from './DisplayFreeSlots'

class InfoBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {selectValue: this.props.currentPageViewType,
                      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                     }

        this.handleRoomChange = this.handleRoomChange.bind(this)
    }
    
    handleRoomChange(event){
        this.setState({selectValue: event.target.value})
        this.props.updateRoomTypeView(event.target.value)
    }

    getDate(){
        const d = new Date();
        let day = this.state.days[d.getDay()];
        let day_ = <span>{day}</span>
        return (day_)
    }

    getTime(){
        const d = new Date();
        let time = d.toLocaleTimeString();
        let time_ = <span>{time}</span>
        return (time_)
    }

    render() {
        return ( 
                <div className = "roomInfo"> 
                    <RoomType style_ = {"selectBox"} value = {this.state.selectValue} onChange = {this.handleRoomChange} flag = {"0"} roomType = {["deluxeRoom" , "premierRoom"]}/>
                    {this.getDate()}
                    {this.getTime()}
                    <DisplayFreeSlots customerCount = {this.props.customerCount}/>
                    <DeleteCustomer dataBaseRecords = {this.props.dataBaseRecords} deleteCustomerRecord = {this.props.deleteCustomerRecord} viewRoomType = {this.props.viewRoomType}/>
                </div>)
    }

}

export default InfoBar