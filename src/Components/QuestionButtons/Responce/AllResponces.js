import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import axios from "../../../axios/axios";
import { Paper_Created, Paper_is_creating } from "../../../store/store/actions/auth";
import Spinner from "../../Spinner/Spinner";
import  './button.css'
import ResponceFromServer from "./ResponceFromServer";
    class AllResponces extends Component {
    state = {
        ResponceCollection : null,
        tempId: null,
        Clicked : false
  }
  componentDidMount()
  {
        this.props.onCreating();
        let QueryParam = `?orderBy="userId"&equalTo="`+this.props.userId+`"` ;
        axios.get('/Responces.json' + QueryParam).then(res => {
        this.props.onCreated();
        this.setState({ ResponceCollection: res.data});
        }).catch(err => alert(err))
  }

     deside = (data) => {
        this.setState({ tempId: data.res , Clicked : true})
      }
    render() {   
        let Data = null;
        if (this.state.ResponceCollection != null){
            if(Object.keys(this.state.ResponceCollection).length === 0){
                alert("No Responce yet 😁😁")
                return null
            }
            let papers = Object.keys(this.state.ResponceCollection);
            Data = papers.map((res, i) => {
                return <div><button className="button_responce" onClick={(e) => this.deside({inner : e , res : res})} key = {i}>{res}</button></div>
            })
        } 
        
    let finalData =   
                         <div>
                                {!this.state.Clicked ? Data : null}
                        </div>

if(this.props.loading)
{
    finalData = <Spinner/>
}                  
return (
    <div className="questionDiv">
               {finalData}
               {this.state.tempId ? <ResponceFromServer id={this.state.tempId}/> : null}
            </div>
            )
        }
}

const mapPropsToState = state =>{
    return{
        loading : state.reducer.loading
    }
}

const mapDispathchToProps = dispatch =>{
    return{
        onCreated : () => dispatch(Paper_Created()),
        onCreating : () => dispatch(Paper_is_creating()),
    }
}

export default connect(mapPropsToState,mapDispathchToProps)(AllResponces);