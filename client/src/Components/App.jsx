import React from 'react' 
import Backend from './BackendV2'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {display : true};
    this.setDisplayPage = this.setDisplayPage.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state != nextState){
      return true
    }
  }

  setDisplayPage(status){
    this.setState({display: status});
  }

  render () {
    return (<Backend currentDisplayMode = {this.state.display} displayMode = {this.setDisplayPage}/>)
  }
}

export default App;
