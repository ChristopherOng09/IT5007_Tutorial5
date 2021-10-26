import React from 'react'
import './NavBar.css'

function CreateButtonBox(props) {
    return (<div className = "buttonStyle">
                <button onClick = {props.onClick}> {props.buttonType}</button>
            </div>)
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state =  {
            displayMode : props.displayMode
        }
    }

    render() {

        let temp = () => self.state.displayMode(false)

        if (!this.props.custCounter){
             temp = null
        }

        var self = this;
        
        let action = ["Wait List" , "Add new customer"]

        var company = <div className = "company"> <span>Hotel California</span> </div>

        var generateButton = action.map(function(decision , index) {

            if (decision == "Wait List") {
                return (<CreateButtonBox key = {index} buttonType = {decision} onClick = {() => self.state.displayMode(true)}/>)
                }

            else {
                return (<CreateButtonBox key = {index} buttonType = {decision} onClick = {temp}/>)
                }
            })

        return (<div className = "header">{company} {generateButton}</div>)
        
    }

}


export default NavBar