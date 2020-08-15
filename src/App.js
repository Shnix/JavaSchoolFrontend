import React from 'react'
import Router from './todo/Router'

class App extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return(
      <div>
        <Router/>
      </div>
    )
};
}

export default App;
