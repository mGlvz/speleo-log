 import React from 'react';
 import { BrowserRouter, Routes, Route} from 'react-router-dom';
 import './App.css';
 import AddEdit from './pages/addEdit';
 import Home from './pages/home';
 import View from './pages/view';
 import { ToastContainer} from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
 import Header from './components/header/header';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path= "/" 
          element = {<Home/>} />
          <Route path = "/add" 
          element = {<AddEdit/>} />
          <Route path = "/update/:id" 
          element = {<AddEdit/>} />
          <Route path = "/view/:id" 
          element = {<View/>} />
        </Routes>
      </div>
    </BrowserRouter>
    
    
  );
}

export default App;
