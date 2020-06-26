import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteEvent} from '../../actions/eventActions';
import './Event.css';
import axios from 'axios';

 class Event extends Component {
     state={
         showEventInfo:false
     };
     onDeleteClick=id=>{
this.props.deleteEvent(id);
      } ;
    
    render() {
        const {id,name,description,location}=this.props.event;
        const {showEventInfo}=this.state;
    
return(

    <div className="card card-body mb-3">
    <h4>
        {name}{' '}
    <i 
    onClick={() =>
this.setState({showEventInfo:!this.state.showEventInfo})
    }
    
         className="fas fa-sort-down" style={{cursor:'pointer'}}
         />
         <i
         className="fas fa-times"
         style={{cursor:'pointer',float:
         'right',color:'red' }}  
         onClick={this.onDeleteClick.bind(this,id)}
         />  
         <Link to={`event/edit/${id}`} >
             <i 
             className="fas fa-pencil-alt"
             style={{
                 cursor:'pointer',
                 float:'right',
                 color:'black',
                 marginRight:'1rem'
             }}
             ></i>
         </Link>
    </h4>
    {showEventInfo ? (
    <ul className="list-group">
        <li className="list-group-item">Description: {description}</li>
        <li className="list-group-item">Location: {location}</li>
    </ul>
    ) : null }
</div>
)

                }}
           
Event.propTypes = {
   event:PropTypes.object.isRequired,
   deleteEvent:PropTypes.func.isRequired
   
};
export default connect(null,{deleteEvent})(Event);