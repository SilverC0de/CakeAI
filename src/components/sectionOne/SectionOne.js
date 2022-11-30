import React, {useState, useEffect} from 'react';
import axios from 'axios';

function SectionOne() {
    const[message, setMessage] = useState([])


    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res =>{
        setMessage([...message].concat(res.data))
      })
      .catch(error =>{
        console.log(error)
      })    

    }, [])
    
    const connectHandler =() =>{
        alert("Not yet connectetd")
    }
    const startHandler =() =>{
        alert("Bot not yet started")
    }

    const clearHandler =() =>{
        setMessage([])
    }
  
 

  return (
    <div className='text-left lg:h-[100vh] px-[3rem] py-[1rem] font-manrope'>
        <header className='flex justify-between items-center mb-[20px]'>
            <div className='left'>
                <span className='font-bold text-[28px]'>PancakeSwap</span>
            </div>
            <div className='right'>
                <span className='hidden md:inline-block'>Not connected</span>
                <button onClick={connectHandler} className='hover:opacity-80 bg-[#4C6EF5] ml-[15px] text-white rounded-md font-semibold py-[5px] px-[1rem]' >Connect</button>
            </div>
        </header>
        <main className='font-open '>
            <p className='text-[18px] '>
                Pancake & DogeBets Prediction 
            </p>
            <p>Enter your private test key to the input field. Your private key is securely stored on your local machine.</p>
            <p>Press set button to set private key.</p>
            <p>Press Start The Bot button to start the bot</p>
            <p>Don't close the browser. You can use any websites,</p>
            <p>but dont send any transaction from your wallet when the bot is working,</p>
            <p>because you break bot's timer</p>
            <p>Bot will automatically claim all your profit.</p>

            <p>IMPORTANT! Open Extensions - PancakeSwap testing Prediction Winner - Developer Mode ON - service worker.</p>
            <p>Otherwise the bot will sleep</p>
            <p>Good luck!</p>

            <div className='flex flex-wrap gap-10 mt-[20px]'>
                <div className='w-[100%] px-4 py-2 box-border overflow-scroll focus:outline-[#4C6EF5] h-[350px] border-[1.5px] border-gray200 bg-[#F4F6F8] rounded-lg'>
                   <ul>
                    {
                        message.map(log => <li key={log.id} className='mb-2 '>
                            {log.title}
                        </li>)
                    }
                  
                   
                   </ul>
                </div>
                <button onClick={startHandler} className='hover:opacity-80 py-[10px] md:w-[60%] font-semibold text-white rounded-md bg-[#4C6EF5]'>Start the bot</button>
                <button onClick={clearHandler} className='hover:opacity-80 font-manrope py-[10px] font-semibold bg-[#BABDC1] rounded-md w-[30%]'>Clear</button>
            </div>
        </main>
    </div>
  )
}

export default SectionOne