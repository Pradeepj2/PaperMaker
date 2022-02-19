import React, { Component } from 'react';
import './QuestionPaper.css';
import AllQuestions from '../DataFromServer/AllPapers';
import AllResponces from '../QuestionButtons/Responce/AllResponces';
import  * as actions from '../../store/store/actions/index'
import { Link , Route } from 'react-router-dom';
import { connect } from 'react-redux';
 class AdminElement extends Component {
    state = {
        MakePaperClicked: false,
        AllQuestionPaperShow: false,
        AllResponceShow: false,
    } 
 
    Logout = () => {
        this.setState({isShow : true})
       this.props.logout();
     }

    AllPapersToggle = () => {
        this.setState({AllQuestionPaperShow : true, AllResponceShow : false})
    }
    
    AllResponceToggle = () => {
        this.setState({AllQuestionPaperShow : false, AllResponceShow : true})
    }

  render() {
    let CreateButton = (this.state.AllQuestionPaperShow ||  this.state.AllResponceShow )
            return   <div className="html">
            <div className="dropdown">
                    <div className = "dropbtn" >
                            <ion-icon size = "large" name="menu-outline"></ion-icon>
                    </div>
                    <div className="dropdown_content">
                        <Link style={{textDecoration : "none"}} onClick={this.Logout} to = "/"><strong>Logout</strong></Link>
                        <Link  style={{textDecoration : "none"}} to ="/SeePapersAndResponce"><strong>See All Responces And Papers</strong></Link>
                        <Link  style={{textDecoration : "none"}}  to ="/createPapers"><strong>Create Paper</strong></Link>
                    </div>
                    </div>
    {!this.state.AllQuestionPaperShow && !this.state.AllResponceShow ?  <div className="NavBar">
        <button className="btnGrd" onClick={this.AllPapersToggle}>All Papers</button>
        <button className="btnGrd" onClick={this.AllResponceToggle} >All Responces</button>
        </div>:null}
        {this.state.AllQuestionPaperShow ? <AllQuestions idToken = {this.props.idToken} userId = {this.props.userId}/> : null}
        {this.state.AllResponceShow ? <AllResponces userId = {this.props.userId}/> : null}
     </div>
  }
}

const mapPropsToState = state =>{
    return{
        userId : state.reducer.userId,
        idToken : state.reducer.idToken,
    }
}

const mapDispathchToProps = dispatch =>{
    return{
        logout : () => dispatch(actions.logout()),
    }
}

export default connect(mapPropsToState , mapDispathchToProps)(AdminElement)
