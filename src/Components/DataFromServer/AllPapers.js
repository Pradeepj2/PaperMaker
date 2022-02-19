import React, { Component } from "react";
import axios from "../../axios/axios";
import  '../QuestionButtons/Responce/button.css';
import { connect } from "react-redux";
import { Paper_Created , Paper_is_creating } from "../../store/store/actions/auth";
import DataFromServer from './DataFromAndToServer'
import Spinner from "../Spinner/Spinner";
class AllQuestions extends Component {
    state = {
        PaperCollection: null,
        tempId: null,
        Clicked : false,
  }

   componentDidMount()
   {
      this.props.onCreating();
      let QueryParam = `?orderBy="userId"&equalTo="`+this.props.userId+`"` ;
      axios.get(`/Papers.json` + QueryParam).then(res =>{
          this.props.onCreated();
        this.setState({ PaperCollection: res.data });
      }).catch(err => alert(err))
  }
     deside = (data) => {
        this.setState({ tempId: data.res , Clicked : true})
    }
    render() {
        let SpQues = null;
        if (this.state.tempId != null)
        {
            SpQues = <DataFromServer id={this.state.tempId}/>
        }
        let Data = null;
        if (this.state.PaperCollection != null){
            if(Object.keys(this.state.PaperCollection).length === 0){
                alert("You have not created any paper yet 😁😁")
                return null
            }
            let papers = Object.keys(this.state.PaperCollection);
            Data = papers.map((res, i) => {
                return <button className="buttonCopy" onClick={(e) => this.deside({inner : e , res : res})} key = {i}><span>{res}</span></button>
            })
        } 
        
        let finalData = 
                        <div>
                        {this.state.tempId ? <h2 style={{ textAlign: "center" , marginTop : "114px" ,fontSize : "1.5rem" , color :"black" }}>Question Paper Set : {this.state.tempId}</h2> : null} 
                        {!this.state.Clicked ? 
                            <div className="container_AllPaper">
                            {Data}
                            </div>
                        : SpQues}
                        </div>


        if(this.props.loading)
        finalData = <Spinner/>  

        return (
            <div className="html">
               {finalData}
            </div>
            )
    }
}

const mapDispathchToProps = dispatch =>{
    return{
        onCreating : () => dispatch(Paper_is_creating()),
        onCreated : () => dispatch(Paper_Created()),
    }
}
const mapPropsToState = state => {
    return{
        loading: state.reducer.loading
   }
}
export default connect(mapPropsToState , mapDispathchToProps)(AllQuestions);