import React, { Component } from 'react';
//import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
//import {v1 as uuid} from 'uuid';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getEvent,updateEvent} from '../../actions/eventActions';


 class EditEvent extends Component {
state={
    name:'',
    description:'',
    location:'',
    errors:{}
};

UNSAFE_componentWillReceiveProps(nextProps,nextState)
{
    const {name,description,location}=nextProps.event;
    this.setState({
        name, 
        description,
        location
    });

}
componentDidMount(){
    const {id}=this.props.match.params;
    this.props.getEvent(id);
}


onSubmit=e=>{
    e.preventDefault();
    const{name,description,location}=this.state;
//check for errors

if(name===''){
    this.setState({errors: {name:'Name is required'}});
    return;
}

if(description===''){
    this.setState({errors: {description:'Description is required'}});
    return;
}

if(location===''){
    this.setState({errors: {location:'Location is required'}});
    return;
}


   const {id}=this.props.match.params;

   const updEvent={
   id, name,
    description,
    location
    
    }
/////UPDATE EVENT////
this.props.updateEvent(updEvent);



 /* const res=await axios.put(`https://my-json-server.typicode.com/priya-12345/EventData/events/${id}`,updEvent);
  dispatch({type:'UPDATE_EVENT',payload:res.data});*/
   
  //CLEAR STATE
  this.setState({
        name:'',
        description:'',
        location:'',
        errors:{}
    });
    this.props.history.push('/');
};
onChange=(e)=>this.setState({[e.target.name]:e.target.value});

    render() {
        const{ name,description,location,errors}=this.state;
      
return(
<div className="card mb-3">
                <div className="card-header">Edit Event</div>
                <div className="card-body">
<form onSubmit={this.onSubmit}>
<TextInputGroup
label="Name"
name="name"
placeholder="Enter Name"
value={name}
onChange={this.onChange}
errors={errors.name}
/>

<TextInputGroup
label="Description"
name="description"
placeholder="Enter Description"
value={description}
onChange={this.onChange}
errors={errors.description}
/>

<TextInputGroup
label="Location"
name="location"
placeholder="Enter Location"
value={location}
onChange={this.onChange}
errors={errors.location}
/>
<input type="submit" value="Update Event" className="btn btn-light btn-block"/>
</form>
                    </div>
            </div>

)

                }}
   EditEvent.propTypes={
       event:PropTypes.object.isRequired,
       getEvent:PropTypes.func.isRequired
   }
                const mapStateToProps=state=>({
                    event:state.event.event
                });

               

export default connect(mapStateToProps,{getEvent,updateEvent}) (EditEvent);