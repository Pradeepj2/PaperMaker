import React  from "react";
import './MakeSuccessfully.css';
import Button from "../Button/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const PaperCreatedSuccessfully = (props) => {
    return (
        <div className="container_successfull">
            <div className="content">
                <div className= "data">
                    <p>{props.content}</p>
                    {props.content === "Your Paper is Created Successfully" ?
                    <div>
                   <Link exact to = "/createPapers"><Button>Continue Creating</Button></Link>
                   <Link exact to = "/allPaperContainer"><Button>See All Papers</Button></Link>
                   </div> : 
                   <div>
                   <div>
                     <Link exact to = "/mainPage"><Button>Home</Button></Link>
                  </div>
                      *****  *******  ************     *****
                   </div>
                }
                </div>
            </div>
        </div>
    )
}

export default (PaperCreatedSuccessfully);