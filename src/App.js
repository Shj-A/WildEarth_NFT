import logo from './logo.svg';
import { useState,useEffect } from 'react';
import React from 'react';

import { BrowserRouter, Route, Routes, useParams,useNavigate} from 'react-router-dom';
import { Navbar,Container, Nav, Alert, Button } from 'react-bootstrap';
import Animal from './pages/Animal';
import Homepage from './pages/Homepage';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Buy from './pages/Buy.js';
import ScrollToTop from './ScrollTop';

import {ACCESS_KEY_ID, SECRET_ACCESS_KEY} from './apikey';
import Caver from 'caver-js';
import './App.css';

const CHAIN_ID = '1001'; //테스트넷

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID +":"+ SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value:CHAIN_ID}
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn",option));

let account;

async function connect() {
  const accounts = await window.klaytn.enable();
  account = accounts[0];
  caver.klay.getBalance(account)
      .then(function (balance) {
          document.getElementById("connectButton").style.display = "none";
          document.getElementById("profileLink").innerHTML = 'Profile';
          document.getElementById("btmConnectButton").disabled = "true";
          document.getElementById("btmProfileLink").disabled = "true";
          document.getElementById("myWallet").innerHTML = `${account}`;
          // document.getElementById("myKlay").innerHTML = `잔액: ${caver.utils.fromPeb(balance, "KLAY")} KLAY`
      });

  // await check_status();
}

function App() {
  let nav_st = {background:"#FFFFFF", fontWeight: 'bold'};
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navBarTop" variant="light" fixed='top' style={nav_st}>
          <Container className="navBarContainer">
          <Navbar.Brand href="/" className="navLogo">
            <img src = "\img\logo_cap.png" alt={logo} width = '160' height= '72' marginRight = '20px' textAlign = 'center'/>
          </Navbar.Brand>
          <Nav className = "me-auto">
            <Nav.Link variant='secondary' disabled id="myWallet"></Nav.Link>
            <Nav.Link className="navLinkAnimal" href="/Animal">Animal</Nav.Link>
            <Nav.Link className="navLinkExplore" href="/Explore">Explore</Nav.Link>
            <Nav.Link className="navLinkProfile" href="/Profile" id='profileLink'></Nav.Link>
            {/* <Nav.Link href="/Login">Login</Nav.Link> */}
            <Nav.Link className='navLinkConnect' variant='secondary' onClick={connect} id="connectButton">Connect</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <br></br>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='Animal' element={<Animal/>}/>
            <Route path='Explore' element={<Explore/>}/>
            <Route path='Buy/:NFTid' element={<Buy/>} />
            <Route path='Profile' element={<Profile/>}/>
            <Route path='/Login' element={<Login/>}/>
          </Routes>
        
        <ScrollToTop>
          <Routes>
              <Route path='Buy/:NFTid' element={<Buy/>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
       
       <div className='btmBar' fixed='bottom'>
                <div className='btmBarTop'>
                    <Navbar bg="#aaaaaa" variant="dark">
                        <Container className='btmNav'>
                        <Navbar.Brand href="/" className="navLogo">
                            <img src = "\img\logo_cap.png" alt={logo} width = '160' height= '72' marginRight = '20px' textAlign = 'center'/>
                        </Navbar.Brand>
                        <Nav className="btmTab">
                            <Nav.Link href="/Animal" style={{color:"#393939", fontWeight:"bold", marginRight:"20%"}}>Animal</Nav.Link>
                            <Nav.Link href="/Explore" style={{color:"#393939", fontWeight:"bold", marginRight:"20%"}}>Explore</Nav.Link>
                            <Nav.Link href="/Profile" id='btmProfileLink' style={{color:"#393939", fontWeight:"bold", marginRight:"20%"}}>Profle</Nav.Link>
                            <Nav.Link  id="btmConnectButton" onClick={connect} style={{color:"#393939", fontWeight:"bold", marginRight:"50%"}}>Connect</Nav.Link>
                        </Nav>
                        </Container>
                    </Navbar>
                </div>
                <div className='btmBarMid'>
                    <div className='btmBarMidLine'></div>
                </div>
                <div className='btmBarBtm'>
                    <div class='logoCont'>
                        <a  href = "http://dongguk.edu/main">
                            <img src = "\img\dongguk_logo.png" width = '234' height= '76'  textAlign = 'center'></img>
                        </a>
                    </div>
                    <div className='git' style={{textAlign:"left",fontWeight:"bold",fontSize:"24px",color:"#393939"}}>
                        gitHub <br/>
                        <div className='gitAdd' >
                            <div className='gitAddLeft' style={{marginRight:"7%"}}>
                                github.com/banghyun <br/>
                                github.com/Heejun <br/>
                                github.com/zoonong <br/>
                            </div>
                            <div className='gitAddRight'>
                                github.com/suhwan <br/>
                                github.com/ssangjun <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
  );
}
export default App;
