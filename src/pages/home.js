import React, { useState, useEffect} from "react";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import "./home.css";
import { toast } from "react-toastify";
import DeleteIcon from "../components/deleteIcon/deleteIcon";
import PlusIcon from "../components/plusIcon/plusIcon";
import ViewIcon from "../components/viewIcon/viewIcon";

const Home = () => {
    const [data, setData] = useState({});

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
    }, []);

    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete?")){
            fireDb.child(`logs/${id}`).remove((err) => {
                if(err) {
                    toast.error(err);
                }else {
                    toast.success("Log deleted successfully");
                }
            });
        }
    }

    return (
        <div className="home">
            <table>
                <thead>
                    <tr>
                        <th className="first">No.</th>
                        <th>Cave</th>
                        <th>Date</th>
                        <th>County</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id,index) => {
                        return (
                            <tr key={id}>
                                <th scope = "row">{index + 1}</th>
                                <td>{data[id].cave}</td>
                                <td>{data[id].date}</td>
                                <td>{data[id].county}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button class="bg-blue hover:bg-blue text-yellow text-sm sm:text-x font-bold py-1 px-1 border-b-1 border-blue-700 hover:border-blue-500 rounded ml-3 w-1/4 cursor-pointer"> Edit
                                            {/* <PlusIcon></PlusIcon> */}
                                        </button>
                                    </Link>
                                    <button class="bg-blue hover:bg-blue text-yellow text-sm sm:text-x font-bold py-1 px-1 border-b-1 border-blue-700 hover:border-blue-500 rounded ml-3 w-1/4 cursor-pointer" onClick={() => onDelete(id)}>
                                        <DeleteIcon></DeleteIcon>
                                    </button>
                                    <Link to={`/view/${id}`}>
                                        <button class="bg-blue hover:bg-blue text-yellow text-sm sm:text-x font-bold py-1 px-1 border-b-1 border-blue-700 hover:border-blue-500 rounded ml-3 w-1/4 cursor-pointer">
                                            <ViewIcon></ViewIcon>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Home;