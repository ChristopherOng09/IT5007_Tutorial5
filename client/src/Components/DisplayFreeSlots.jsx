import React from 'react'

class DisplayFreeSlots extends React.Component {
    
    render() {
        return( <span>No.free slots remaining: {this.props.customerCount}</span>)
    }


}


export default DisplayFreeSlots