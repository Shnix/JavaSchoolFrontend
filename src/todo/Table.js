import React from 'react';
import Driver from './Driver'



class Table extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
      return(
    <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Status</th>
                  <th>Driver Type</th>
                  <th>Working Hours</th>
                  <th>Vehicle №</th>
                  <th>Current City</th>
                  <th>Order</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
                <Driver/>
            </table>
            </div>
    );
}
}

export default Table;