import React from 'react'
import Footer from './Footer'
import Table from './Table'
import Header from './Header'

class Drivers extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <body>
      <Header/>
        <Table/>
       <Footer/>
    </body>
    )
};
}

export default Drivers;