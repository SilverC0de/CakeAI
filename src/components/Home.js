import React, {useState, useEffect} from 'react';
import { ethers } from "ethers";
import axios from 'axios';

function SectionOne() {
    const [address, setAddress] = useState('Not connected');
    const [connectButton, setConnectButton] = useState('Connect');
    const[message, setMessage] = useState([])

   
    const updateTerminal = (log) => {
        setMessage([log, ...message])
    }

    const connectHandler = async () => {
        setMessage(['Metamask connection initialized', ...message])
        

        try {

            const { ethereum } = window;
            if(!ethereum){
                setMessage(['Please download metamask extension on your web browser', ...message])
                setMessage(['Connection terminated', ...message])
            }
      
            const accounts = await ethereum.request({
              method: 'eth_requestAccounts'
            })
      
            const chainID = await ethereum.request({
              method: 'eth_chainId'
            });
      
            setAddress(chainID)
           
            if(chainID == '0x38'){
                //BSC chain ID is 0x38
                setAddress(accounts[0])
                setConnectButton('Connected')
                setMessage(['Connected to address ' + accounts[0], ...message])    
            } else {
                setMessage(['Please connect to BSC network', ...message])
            }

            // setCurrentAccount(accounts[0]);
            // mintCallback();
          } catch(e){
            setMessage(['Metamask connection terminated', ...message])
        }
    }

    const startHandler = () => {
        updateTerminal('Bot system initiated')
    }

    const clearHandler =() =>{
        setMessage([])
    }
  
 

  return (
    <div className='text-left lg:h-[100vh] px-[3rem] py-[1rem] font-manrope'>
        <header className='flex justify-between items-center mb-[20px]'>
            <div className='left'>
                <span className='font-bold text-[40px]'>CakeAi 🍰</span>
            </div>
            <div className='right'>
                <span className='hidden md:inline-block text-[#7f7f7f] text-[14px]'><i>{address}</i></span>
                <button onClick={connectHandler} className='hover:opacity-70 bg-[#4C6EF5] ml-[15px] text-white rounded-md font-semibold py-[5px] px-[1rem]'>{connectButton}</button>
            </div>
        </header>
        <main className='font-open '>
            <p className='text-[22px] px-[4px] py-[1rem]'>
            PancakeSwap Prediction Bot
            </p>

            <p className='text-[14px] px-[12px] py-[4px]'>
                🛠 Connect your Metamask wallet
            </p>

            <p className='text-[14px] px-[12px] py-[4px]'>
                💰 Make sure you have enough BNB on your Metamask wallet
            </p>

            <p className='text-[14px] px-[12px] py-[4px]'>
               📈 Every 5 minutes, the bot places bet with <b>0.2BNB</b>
            </p>

            <p className='text-[14px] px-[12px] py-[4px]'>
                🧵 You will see status of bets as they occur
            </p>

            <p className='text-[14px] px-[12px] py-[4px]'>
               🚀 Good luck
            </p>
           

            <div className='flex flex-wrap gap-10 mt-[20px]'>
                <div className='w-[100%] px-4 py-2 box-border overflow-scroll focus:outline-[#4C6EF5] h-[420px] border-[1.5px] border-gray200 bg-[#F4F6F8] rounded-lg'>
                   <ul>
                    {
                        message.map(log => <li className='mb-2 text-[13px] '>
                            {log}
                        </li>)
                    }
                  
                   
                   </ul>
                </div>
                <button onClick={startHandler} className='hover:opacity-70 font-manrope py-[10px] font-semibold bg-[#4C6EF5] rounded-md w-[68%] text-white'>Start the bot</button>
                <button onClick={clearHandler} className='hover:opacity-70 font-manrope py-[10px] font-semibold bg-[#c8cbce] rounded-md w-[28%] text-white'>Clear logs</button>
            </div>
        </main>
    </div>
  )
}

export default SectionOne