import React from 'react'
import './DeleteCustomer.css'


class DeleteCustomer extends React.Component{

    constructor(props) {
        super(props);

        this.removeCheckedInCustomer = this.removeCheckedInCustomer.bind(this)
    }


    removeCheckedInCustomer(){
        var self = this
        let tempRecords = this.props.dataBaseRecords.waitingList
        let tempArr = [];
        tempRecords.forEach(function(customer , index){
            if (customer.CheckInStatus) {
                tempArr.push(index)
            }
        })
        self.props.deleteCustomerRecord(self.props.viewRoomType ,tempArr)
    }

    render() {
      return(<button className = 'button' onClick = {this.removeCheckedInCustomer}>Remove Checked in Customer</button>)
    }
}


export default DeleteCustomer