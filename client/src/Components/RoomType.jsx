import React from "react"


class RoomType extends React.Component {

    render() {
    return ( <select className = {this.props.style_} value = {this.props.value} onChange = {this.props.onChange}>   
                {this.props.roomType.map(function(room , index) {
                    return (<option key = {index} value = {room}> {room} </option>)
                })}
            </select> )
    }
}

export default RoomType;