import React from "react";
import InfoBar from "./InfoBar"
import DisplayCustomer from "./DisplayCustomer"
import DisplayStatusText from "./DisplayStatusText"
import NavBar from "./NavBar"

class DisplayHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { roomType: this.props.currentPageViewType }
        this.updateRoomTypeView = this.updateRoomTypeView.bind(this)
    }

    updateRoomTypeView(data){
        this.setState({roomType: data})
    }

    render() {

        let tempRecords;

        switch(this.state.roomType) {
            case 'deluxeRoom' :
                tempRecords = this.props.dataBaseRecords.deluxeRoom
                break;
            case 'premierRoom':
                tempRecords = this.props.dataBaseRecords.premierRoom
                break;
            default:
                return (null)
        } 

        return (<div>
                    <NavBar displayMode = {this.props.displayMode} custCounter = {tempRecords.custCounter}/>
                    
                    <InfoBar customerCount = {tempRecords.custCounter} 
                             updateRoomTypeView = {this.updateRoomTypeView} 
                             dataBaseRecords = {tempRecords} 
                             viewRoomType = {this.state.roomType} 
                             deleteCustomerRecord = {this.props.deleteCustomerRecord}  
                             currentPageViewType = {this.state.roomType}
                             />

                    <DisplayStatusText msgCode = {tempRecords.msgCode} 
                                       updateStatusCode = {this.props.updateStatusCode} 
                                       custCounter = {tempRecords.custCounter}
                                       roomType = {this.state.roomType}    
                                       />       

                    <DisplayCustomer dataBaseRecords = {tempRecords} 
                                     viewRoomType = {this.state.roomType} 
                                     updateRoomTypeView = {this.updateRoomTypeView}  
                                     updateCustomerRecords = {this.props.updateCustomerRecords}
                                     deleteCustomerRecord = {this.props.deleteCustomerRecord}     
                                     />
                </div>
            )
    }
}

export default DisplayHomePage;
