import React from "react";
import "./DisplayStatusText.css"



class DisplayStatusText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            custCounter: this.props.custCounter,
            msgCode: this.props.msgCode
        }
    }

    componentDidMount(){
            if (this.props.custCounter == 0){
                setTimeout( () => this.props.updateStatusCode(this.props.roomType , 2) , 3000)
            }
            else {
                setTimeout( () => this.props.updateStatusCode("deluxeRoom", 0) , 3000)
                setTimeout( () => this.props.updateStatusCode("premierRoom", 0) , 3000)
            }
    }

    render() {
        
        let msgText = <div></div>

        if (this.props.msgCode == 1){
            msgText = <span className  = 'success'> Customer Added successfully</span>
        }

        if (this.props.msgCode == 2) {
            msgText = <span className = 'failure'> Maximum capacity on waitlist. Unable to add more customer</span>
        }


        return (<div className = "feedback">{msgText}</div>)

    }

}

export default DisplayStatusText