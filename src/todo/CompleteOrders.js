import React from 'react'
import Header from './Header'
import Footer from './Footer';
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios';  
import paginationFactory from 'react-bootstrap-table2-paginator';

const api = 'http://localhost:8081/complete'



class CompleteOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          id:0, 
          columns: [        {            
                              dataField: 'orderId',            
                              text: 'Id'  ,
                              sort: true          
                            },             
                            {           
                              dataField: 'startCity',  
                              text: 'Start City',  
                              sort:true  
                            }, {  
                              dataField: 'destinationCity',  
                              text: 'Destination City',  
                              sort: true  
                            },  
                            {  
                              dataField: 'vehicleName',  
                              text: 'Vehicle',  
                              sort: true  
                            },  
                            {  
                              dataField: 'cargoName',
                              text: 'Cargo',  
                              sort: true  
                            },  
                            {  
                              dataField: 'cargoWeight',  
                              text: 'Cargo Weight',  
                              sort: true  
                            }]
        };
        this.componentDidMount=this.componentDidMount.bind(this)
      }


    
      componentDidMount() {    
        
                        axios.get(api).then(response => {    
        
                          console.log(response.data);    
        
                          this.setState({    
        
                                items: response.data,
                                isLoaded: true  
        
                          });    
        
                        });    
        
                      } 

      

      render() {
          if(!this.state.isLoaded){
              return <div>Wait</div>
          }
          else{
        return(
            <div>
          <Header/>
                        <div class="row" className="hdr">    

                        <div class="col-sm-12 btn btn-info">    
                        Complete Orders  

                         </div>    

                          </div>    

                        <div  style={{ marginTop: 20 }}>  

                        <BootstrapTable   

                        striped  

                        hover  

                        keyField='id'   

                        data={ this.state.items }   

                        columns={ this.state.columns}
                          
                        pagination={ paginationFactory() }
                        
                         >
                           </BootstrapTable>  
                      </div> 
        <Footer/>
        </div>
        );
    }
}
}
  
  export default CompleteOrders;