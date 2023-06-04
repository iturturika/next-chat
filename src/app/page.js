"use client"
import React from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Message from './components/message';
import axios from 'axios'

export default function Home() {
  const [message, setMessage] = React.useState('');
  const [chat, setChat] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  let element = document.querySelector('#area');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const chat = await axios.get('https://63c3d2698067b6bef6cedc41.mockapi.io/chat');
        setChat(chat.data);

      } catch (err) {
        return err;
      }
    }
    fetchData();

  }, [update]);

  const sendMessage = () => {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    axios.post('https://63c3d2698067b6bef6cedc41.mockapi.io/chat', {
      message: message,
      author: localStorage.getItem('author'),
      time: (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes)
    })
    .then((res) => {
      setUpdate(!update);
      setMessage('');
      setTimeout(() => {
        element.scrollTop = 1000000;
      }, 400)
    })
    .catch((err) => {
      return(err);
    })
  }

  return (
    <div className={styles.chatblock}>
      {      
        localStorage.getItem('author') ? 
        <>
          <div style={{width: '100%', display: 'flex', alignItems: 'center', borderBottom: '1px solid #727272'}}>
            <h1 className={styles.logo}>Next Chat</h1>
          </div>
          <div className={styles.messagearea} id='area'>
            {
              chat.map((item) => {
                return (
                  <Message author={item.author} text={item.message} sendBy={localStorage.getItem('author') === item.author ? 'me' : 'another'} key={item.id} time={item.time}/>
                )
              })
            }
          </div>
          <div style={{marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', borderTop: '1px solid #727272'}}>
            <textarea type='text' placeholder='Message' className={styles.input} value={message} onChange={(event) => {setMessage(event.target.value)}} style={message.length > 104 ? {height: '100px'} : null}></textarea>
            <span className={styles.button} onClick={sendMessage}>SEND</span>
          </div>
        </>
        :
        <div style={{marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', borderTop: '1px solid #727272'}}>
          <input type='text' placeholder='Name' className={styles.input} value={message} onChange={(event) => {setMessage(event.target.value)}} style={message.length > 104 ? {height: '100px'} : null}></input>
          <span className={styles.button} onClick={() => {localStorage.setItem('author', message)}}>Connect</span>
        </div>
      }
    </div>
  )
}
