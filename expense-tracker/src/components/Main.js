import React, { Component } from 'react';
import "./main.css";
import fire from '../config/Fire';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Tracker from './Tracker/Tracker';
import Spinner from "../assets/loader.gif";


export default class Main extends Component {

    state = {
        user: 1,
        loding: true,
        formSwitcher: false
    }

    componentDidMount(){
        this.authListener();
    }


    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user});
            }else{
                this.setState({user: null});
            }
        });
    }

    formSwitcher = (action) => {
        console.log(action);
        this.setState({
            formSwitcher: action === "register" ? true : false
        });
    }


    render() {

        const form = !this.state.formSwitcher ? <Login /> : <Register />;


        if(this.state.user === 1){
            return (
                <div className="mainBlock">
                    <div className="Spinner">
                        <img  
                            src={Spinner}
                            alt="Spinner"
                            className="ImgSpinner" 
                        />
                    </div>
                </div>
            )
        }


        return (
            <>
            {!this.state.user ? 
            (<div className="mainBlock">
            {form }
            {!this.state.formSwitcher ? 
            (
                <span className="underline">
                Not registered?
                <button className="linkbtn" 
                onClick={()=> this.formSwitcher(!this.state.formSwitcher ? "register" : "login")}>
                    Create an Account
                </button>
            </span>) : (
                <span className="underline">
                Already registered?
                <button className="linkbtn" 
                onClick={()=> this.formSwitcher(!this.state.formSwitcher ? "register" : "login")}>
                    Sign in here
                </button>
            </span>
            )
            }
            </div>) : (<Tracker />)
            }
            </>
        );
    }
}

