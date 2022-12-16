import React, {useState, useEffect} from "react";
import fireDb from "../firebase";
import {useParams, Link} from "react-router-dom";
import "./view.css"

const View = () => {
    const [user, setUser] = useState({});

    //useParams is used to get the id from the view page
    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`logs/${id}`).get().then((snapshot) => {
            if(snapshot.exists()) {
                setUser({...snapshot.val()});
            } else {
                setUser ({});
            }
        });
    }, [id]);
    
    console.log("user", user);

    return (
        <div className="view">
            <div className="card">
                <div className="card-header">
                    <p>Cave Log Details</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Cave: </strong>
                    <span>{user.cave}</span>
                    <br/>
                    <br/>
                    <strong>Date: </strong>
                    <span>{user.date}</span>
                    <br/>
                    <br/>
                    <strong>County: </strong>
                    <span>{user.county}</span>
                    <br/>
                    <br/>
                    <Link to="/">
                        <button className="btn btn-edit">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default View;