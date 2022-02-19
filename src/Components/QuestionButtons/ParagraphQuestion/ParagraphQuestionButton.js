import React, { Component } from "react";
import  '../SingleChoiceQuestion/SingleChoise.css'
import axios from "../../../axios/axios";
class ParagraphQuestion extends Component{
    state = {
        inputValue: "",
        isInputDone: false,
        inputQuestion : '',
        final: [],
        currQuesNo: this.props.noOfQues + 1,
        Responce : []
    }

    // shouldComponentUpdate(newProps){
    //     if(!this.props.data.MakePaperClicked)
    //     {
    //         return true;
    //     }
    //      return !(this.props.data.MakePaperClicked === newProps.data.MakePaperClicked);
    // }
   
    inputQuestionData = (e) => {
        this.setState({ inputQuestion: e.target.value })
    }
    updateResponce = (e) => {
        let tempResponce = this.state.Responce;
        for (let i = 0; i < tempResponce.length; i++)
        {
            if(tempResponce[i].QuestionState === e.QuesStatement)
            {
                tempResponce[i].QuesAnswer = e.innerData.target.value;
                this.setState({ Responce: tempResponce })
                return null;
            }
        }
        let temp = {
            QuestionState: e.QuesStatement,
            QuesAnswer : e.innerData.target.value
        }

        let updatedResponce = [...this.state.Responce , temp]

        this.setState({Responce : updatedResponce})
        
    }
    finalAdd = () => {
        if (this.state.inputQuestion === null || this.state.inputQuestion.length === 0)
           {  
                alert("Enter Question");
                return;
           } 
        let tempData = {
            Question: this.state.inputQuestion,
            innerData: this.state.inputValue,
            Type : "Paragraph Type Question"
        }
        let newData = [...this.state.final, tempData];
        this.setState({ final: newData, isInputDone: true, inputQuestion: "", inputValue: "", currQuesNo: this.state.currQuesNo + 1}); 
        this.props.hide();
    }
    render() {
    if (this.props.data.MakePaperClicked)
    {
        if(this.props.data.noOfParagraphQuestion === 0) return null;
            let DummyData = this.state.final;        
            axios.post('/Papers/paper' + this.props.data.Random  +'.json' , DummyData).then(
                res =>{
                    console.log("Para")
                    console.log(DummyData)
                }
            ).catch(err=> alert(err))  
        }
        let isInputData = null;
        if (this.state.isInputDone){
            isInputData = (this.state.final).map((singleObject, i) =>
            {
                return (
                    <div key={i} style={{ backgroundColor: (this.props.noOfQues + i + 1) % 2 === 0 ? "#8c00ff0a" : "#f7ff3d33" }}>
                          <p className={["heading", i===0 ? "showHeading" : "hideHeading"].join(' ')}>Paragraph Type Questions</p>
                        <div className={"singleChoiseQuestion"} >      
                    <div>Question:{this.props.noOfQues + i + 1} </div>
                          <div className={"Question"} id={i}>
                            {singleObject.Question} ?
                            <div><textarea  placeholder="Enter Your Answer" style={{resize:"none" , marginTop : "13px"}} cols="20" rows="5" onChange={(e) => this.updateResponce({QuesStatement : singleObject.Question , innerData : e})}></textarea></div>
                          </div>
                        </div>
                   </div>                
    );     
            })
        }

        return (
                    <div>
                        <div className={["Singles", this.props.isClicked  ? "show" : "hide"].join(" ")}>
                        <p className={"QuestionType"}>Paragraph Type Question</p>
                        <input type='text' placeholder="Enter Single Correct Question Statement" className={"input"} onChange={this.inputQuestionData} value = {this.state.inputQuestion} />
                        <div className={"Btn"}><button onClick={this.finalAdd}  className={"submit"}>Submit</button>
                        <button className={"cancle"} onClick={this.props.cancle}>CANCLE</button>
                        </div>
                        </div>
                         {isInputData}
        </div>

        );
    }
}

export default ParagraphQuestion;

