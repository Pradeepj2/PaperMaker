import React,{Component} from "react";
import  './SingleChoise.css';
import axios from "../../../axios/axios";
import { Route } from "react-router-dom";
import PaperCreatedSuccessfully from "../../MakeSuccessfully/MakeSuccessfully";
import Auth from "../../Login_Form/Auth";
class SingleChoiceQuestion extends Component{

    
    state = {
        isChoise: false,
        inputValue: '',
        isInputDone: false,
        options: [],
        inputQuestion : "",
        final: [],
        Responce : [],
        isDeleteVisible : false,
        isPreviewClicked: false,
        PreviewShow: false,
        heading: true,
        currQuesNo: 1,
        check : false
    }
    
    shouldComponentUpdate(newProps){
        if(!this.props.data.MakePaperClicked)
        {
            return true;
        }
         return !(this.props.data.MakePaperClicked === newProps.data.MakePaperClicked);
    }

    addChoises = () => {
        this.setState({ isChoise: true,PreviewShow : false })
    }
    
    delChoises = () => {
        if (this.state.options.length === 0)
            this.setState({isDeleteVisible:false})
        else
        {
            let oldOption = [];
            let check = 0;
            for (let i = 0; i < this.state.options.length; i++) {
                    if (!document.getElementById(i).checked){
                        oldOption = [...oldOption, this.state.options[i]];
                    }
                       else {
                        document.getElementById(i).checked = false;
                        check = 1;
                    }
                }
            
            if (check === 0) alert("Please Select First");

             if (oldOption.length === 0)
            this.setState({isPreviewClicked:false,PreviewShow : false})
            this.setState({ options: oldOption});
        }
    } 
    
    onSave = () => {
        if (this.state.inputValue.length === 0)
        {
            alert("Add option First");
            return;
        }
        let newOption = this.state.inputValue;
        let newOptions = [...this.state.options, newOption];
        this.setState({options : newOptions , isChoise: false , PreviewShow : true , inputValue : ''})
    }

    onChangeHandler = (event) => {
        this.setState({inputValue : event.target.value})
    }

    updateAnswer = (e) => {

        let tempResponce = [...this.state.Responce];
        
        for (let p = 0; p < tempResponce.length; p++)
        {
            if (tempResponce[p].QuestionState === e.QuestionStatement)
            {
                tempResponce[p].QuesAnswer = e.optionsChoice;
                this.setState({Responce: tempResponce})
                return null;
            }
        }

        let answer = {
            QuestionState : e.QuestionStatement,
             QuesAnswer : e.optionsChoice,
        }
        
         let oldArray = [...this.state.Responce , answer]
        this.setState({Responce: oldArray });
    }
    
    inputQuestionData = (e) => {
        this.setState({ inputQuestion: e.target.value })
    }

    preView = () => {
        this.setState({isPreviewClicked : !this.state.isPreviewClicked})
    }

    finalAdd = () => {
        if (this.state.inputQuestion === null || this.state.inputQuestion.length === 0)
        {
            alert("Enter Question")
            return null;
        }
          
        if (this.state.options.length === 0)
        {
            alert("Please add Some Option First then submit");
            return null;
        }

        let tempData = {
            Question: this.state.inputQuestion,
            optionValue: this.state.options,
            Type : "Single Choice Question"
        }

        
        let newData = [...this.state.final, tempData];
        this.setState({ final: newData, PreviewShow: false, isInputDone: true, isChoise: false, options: [], isPreviewClicked: false,inputQuestion : "" , answer : ""  , currQuesNo : this.state.currQuesNo + 1}); 
        this.props.hide();
    }
    clear = () => {
        this.setState({ PreviewShow : false , isInputDone: true , isChoise: false , options : [] , isPreviewClicked : false});
    }

    render() {    
    if (this.props.data.MakePaperClicked)
    {
        if(this.props.data.noOfSingleChoiceQuestion === 0) return null;
        let DummyData = this.state.final;
        axios.post('/Papers/paper' + this.props.data.Random  +'.json' , DummyData).catch(err=> alert(err))         
        }
        let choise = null;
        if (this.state.isChoise) {
            choise = <div><input placeholder="Enter Option" className="input" style={{width : "70%"}} onChange={(e) => this.onChangeHandler(e)} type='text' value={this.state.inputValue} />
                <div className="Btn"><button className="save" onClick={this.onSave} >Save</button></div>
            </div>
        }
        let preView = null;

        if(this.state.isPreviewClicked)
        {
            preView = this.state.options.map((itr, i) =>
            {
                return (
                    <div className="previewOptions">
                        <input type="radio" id={i} key= {i} className="Radio" />
                        <span>{ itr }</span>
                    </div>
                )
            }) 
        }


        let isInputData = null;  
        if (this.state.isInputDone) {
            isInputData = (this.state.final).map((singleObject, i) => {
                let option = null;
             option = singleObject.optionValue.map((optionValues, k) => {
                 return (<div key={i}><input type="radio" className="Radio" name={i + 1} key={k} id={k} onChange={() =>this.updateAnswer({optionsChoice : optionValues ,QuestionStatement :singleObject.Question})}/><span className="finalOption">{optionValues}</span></div>) 
                })
                return (
                    <div>
                        <p className={`heading ${i===0 ? "showHeading":"hideHeading"}`}>Single Choice Questions</p>
                        <div style={{ backgroundColor: (i + 1) % 2 === 0 ? "#8c00ff0a" : "#f7ff3d33" }} key={i}>
                            <div className="singleChoiseQuestion">
                                <span style={{ display: "inlineBlock" }}>Question:{i + 1} </span>
                                <span className="Question" id={i}>{singleObject.Question} ?
                                    <div className="finalOption">
                                        {option}
                                    </div>
                                </span>
                                <span className="responce">Your Selected Answer is <span style={{ color: "black" }}>{this.state.Responce.map((res) => {
                                    if (res.QuestionState === singleObject.Question)
                                    {
                                       return res.QuesAnswer
                                     }
                                   })}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        return (
                            <div>
                                <div className={`Singles ${this.props.isClicked ?"show":"hide"}`}>
                                <p className="QuestionType">Single Choise Question</p>
                                      <input className="input" type='text' placeholder="Enter Single Correct Question Statement" onChange={this.inputQuestionData} value={this.state.inputQuestion}/>
                          <div className="Btn">
                                <button onClick={this.addChoises} className="add">Add Option</button>
                                <button onClick={this.delChoises} className="delete" style={{display : this.state.isPreviewClicked ? "block" : "none"}}>Delete--</button>
                        <button onClick={this.preView} style={{ display: this.state.PreviewShow ? "block" : "none" }} className="preView">Preview</button>
                                <button onClick={this.finalAdd} className="submit">Submit</button>
                                <button className="cancle" onClick={ (e) => (this.props.cancle(),this.clear)}>CANCLE</button>
                    </div>
                                {choise}
                                {preView}
                                </div>
                             
             {isInputData}
                 
        </div>            

        );
    }
}
       
export default SingleChoiceQuestion;