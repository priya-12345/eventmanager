import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEvent} from '../../actions/eventActions';


 class AddEvent extends Component {
state={
    name:'',
    description:'',
    location:'',
    errors:{}
};
onSubmit=(e)=>{
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


    const newEvent={
    
        name,description,location
    };

    ////SUBMIT EVENT ////
this.props.addEvent(newEvent);




/*const res=await axios.post('https://my-json-server.typicode.com/priya-12345/EventData/events/',newEvent);
 dispatch({type:'ADD_EVENT',payload:res.data});*/


  //clear state
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
                <div className="card-header">Add Event</div>
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
<input type="submit" value="Add Event" className="btn btn-light btn-block"/>
</form>
                    </div>
            </div>

)
  }}
      
  AddEvent.propTypes={
      addEvent:PropTypes.func.isRequired
  }
export default connect(null,{addEvent}) (AddEvent);