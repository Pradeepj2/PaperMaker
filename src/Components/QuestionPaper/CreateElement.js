import React, { Component } from 'react';
import  './QuestionPaper.css';
import SingleChoiceQuestion from '../QuestionButtons/SingleChoiceQuestion/SingleChoiceQuestionButton';
import MultipleChoiceQuestion from '../QuestionButtons/MultipleChoiceQuestion/MultipleChoiceQuestionButton';
import ParagraphQuestion from '../QuestionButtons/ParagraphQuestion/ParagraphQuestionButton';
import { connect } from 'react-redux';
import * as actions from '../../store/store/actions/index';
import axios from '../../axios/axios';
import Spinner from '../Spinner/Spinner';
import { Paper_Created , Paper_is_creating , logout } from '../../store/store/actions/auth';
import { Redirect , Link } from 'react-router-dom';

class CreateElement extends Component {
    state = {
        noOfSingleChoiceQuestion: 0,
        noOfMultipleChoiceQuestion: 0,
        noOfParagraphQuestion: 0,
        SingleClicked: false,
        MultipleClicked : false,
        ParagraphClicked: false,
        MakePaperClicked: false,
        Random : Math.floor(Math.random() * 10000),
        AllQuestionPaperShow: false,
        AllResponceShow: false, 
    }

  
    Logout = () => {
        this.setState({isShow : true})
       this.props.logout();
     }
    updateMakePaper = () => {
        // this.props.onCreating();
        axios.put('/Papers/paper'+ this.state.Random +'.json', {userId : this.props.userId}).then(res =>{
            // console.log("User")
            // this.props.onCreated();
            this.setState({ MakePaperClicked: true});    
      })      
    }
    updateSingleClickEvent = () => {
        let oldCount = this.state.noOfSingleChoiceQuestion;
        oldCount = oldCount - 1;
        this.setState({SingleClicked :false,noOfSingleChoiceQuestion : oldCount})
    }
    updateMultipleClickEvent = () => {
        let oldCount = this.state.noOfMultipleChoiceQuestion;
        if (oldCount > 0)
        oldCount = oldCount - 1;
        this.setState({ MultipleClicked: false, noOfMultipleChoiceQuestion: oldCount })
    }
    updatePragraphClickEvent = () => {
        let oldCount = this.state.noOfParagraphQuestion;
        if (oldCount > 0)
        oldCount = oldCount - 1;
        this.setState({ ParagraphClicked: false , noOfParagraphQuestion : oldCount})
    }
    
    updateNoOfSingleChoiceQuestion = () => {
        if (this.state.MultipleClicked || this.state.ParagraphClicked)
        {
            alert("Please Done Your Previous Task First Then Come Back !!!!");
            return;
        }
        this.setState({SingleClicked:true , noOfSingleChoiceQuestion : this.state.noOfSingleChoiceQuestion + 1});      
    }
    updateNoOfMultipleChoiceQuestion = () => {
        if (this.state.SingleClicked || this.state.ParagraphClicked)
        {
            alert("Please Done Your Previous Task First Then Come Back !!!!");
            return;
            }
            this.setState({ MultipleClicked:true , noOfMultipleChoiceQuestion : this.state.noOfMultipleChoiceQuestion + 1});
        }
        updateNoOfParagraphQuestion = () => {
            if (this.state.SingleClicked || this.state.MultipleClicked)
            {
                alert("Please Done Your Previous Task First Then Come Back !!!!");
                return;
            }
            this.setState({ParagraphClicked:true , noOfParagraphQuestion : this.state.noOfParagraphQuestion + 1});
        }
        
        updatehide = () => {
            this.setState({SingleClicked : false , MultipleClicked:false , ParagraphClicked : false})
        }
     
  render()
  {
    let RecordeshowButton = (this.state.noOfSingleChoiceQuestion || this.state.noOfMultipleChoiceQuestion || this.state.noOfParagraphQuestion)
   
       let finalData =
        <div>
             <div className="dropdown">
                   <div className = "dropbtn" >
                        <ion-icon size = "large" name="menu-outline"></ion-icon>
                            </div>
                            <div className="dropdown_content">
                                <Link style={{textDecoration : "none"}}  onClick={this.Logout} activeClassName ="logout" to = "/"><strong>Logout</strong></Link>
                                <Link style={{textDecoration : "none"}}  to ="/SeePapersAndResponce" ><strong>See All Responces And Papers</strong></Link>
                                <Link style={{textDecoration : "none"}}  to ="/createPapers" ><strong>Create Paper</strong></Link>
                            </div>
                </div>
                 <div className={`showDiv ${this.state.MakePaperClicked ? "hideDiv":"showDiv"}`}>
                    <div className="NavBar">
                    <button className="btnGrd" onClick={this.updateNoOfSingleChoiceQuestion} >Add Single Choice Question</button>
                    <button className="btnGrd" onClick={this.updateNoOfMultipleChoiceQuestion}>Add Multiple Choice Question</button>
                    <button className="btnGrd" onClick={this.updateNoOfParagraphQuestion}>Add Paragraph Question</button>
                    </div>
                 </div> 
                <div className='question_Content'>
                  <SingleChoiceQuestion isClicked={this.state.SingleClicked} cancle={this.updateSingleClickEvent} hide={this.updatehide} data={this.state}/> 
                  <MultipleChoiceQuestion isClicked={this.state.MultipleClicked} cancle={this.updateMultipleClickEvent} hide={this.updatehide}  data={this.state} noOfQues={this.state.noOfSingleChoiceQuestion}/> 
                  <ParagraphQuestion isClicked={this.state.ParagraphClicked} cancle={this.updatePragraphClickEvent} hide={this.updatehide} data={this.state} noOfQues={this.state.noOfMultipleChoiceQuestion + this.state.noOfSingleChoiceQuestion}/>
                </div> 
                {RecordeshowButton ?
                            <div>
                                 <button onClick={this.updateMakePaper} className = "makePaper">Make Paper</button>
                            </div>
                        : null}
                        <marquee  className = "msg">Do not add <span> ? </span> mark at the end of the question</marquee>
                   {this.state.MakePaperClicked  ? <Redirect exact to = "/succfull"/>: null}

       </div>

       if(this.props.loading)
       {
           finalData = <Spinner/>         
       }
       return  <div className="html">{finalData} </div>
  }
}
const mapPropsToState = state => {
    return{
        userId : state.reducer.userId,
        loading: state.reducer.loading,
        error: state.reducer.error,
    }
  } 
  
const mapDispathchToProps = dispatch => {
        return{
           onCreating : () => dispatch(Paper_is_creating()),
           onCreated : () => dispatch(Paper_Created()),
           logout : () => dispatch(logout()),
          }
  } 
export default connect(mapPropsToState , mapDispathchToProps)(CreateElement);