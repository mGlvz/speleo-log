import React,{useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./addEdit.css";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialState = {
    cave: "",
    date: "",
    county: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const {cave, date, county} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        fireDb.child("logs").on("value", (snapshot) => {
            if(snapshot.val()!== null){
                setData({...snapshot.val()})
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]});
        }else {
            setState({...initialState});
        }

        return () => {
            setState({...initialState});
        }
    }, [id,data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cave || !date || !county) {
            toast.error("Please provide value in each input field")
        } else {
            //if there is not an id then a cave log is being added
            //".push state" is being used to add the log
            if (!id) {
                fireDb.child("logs").push(state, (err) => {
                    if (err){
                        toast.error(err);
                    } else {
                        toast.success("Log Added Successfully")
                    }
                });
            } else {
                //if there is an id then a cave log is being updated
                //".set state" is being used to update the log
                //an error message displays if error occurs
                fireDb.child(`logs/${id}`).set(state, (err) => {
                    if (err){
                        toast.error(err);
                    } else {
                        toast.success("Log Updated Successfully")
                    }
                });
            }
            //navigate to "/" brings you back to home page
            setTimeout(() => navigate("/"), 500);
        }
    }; 
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    };

    return (
        <div className="addEdit">
            <form className="addEditForm"
            onSubmit={handleSubmit} >
                <label htmlFor="cave">Cave</label>
                <input
                    type="text"
                    id="cave"
                    name="cave"
                    placeholder="Name of the cave..."
                    value={cave || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="date">Date</label>
                <input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="Date visited..."
                    value={date || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="county">County</label>
                <input
                    type="text"
                    id="county"
                    name="county"
                    placeholder="County..."
                    value={county || ""}
                    onChange={handleInputChange}
                />

                <input class="bg-blue-200 hover:bg-blue text-yellow font-bold py-2 px-1 border-b-1 border-blue-700 hover:border-blue-500 rounded ml-3 w-2/5 cursor-pointer" type="submit" value={id ? "Update" : "Save"}/>
            </form>
        </div>
    );
}

export default AddEdit;