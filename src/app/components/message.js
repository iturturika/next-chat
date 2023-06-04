import React from 'react'
import styles from './message.module.css'

const Message = ({sendBy, text, time, author}) => {
  return (
    <div className={styles.message} style={sendBy === 'me' ? {marginLeft: 'auto', marginRight: 15} : sendBy === 'another' ? {marginLeft: 10, marginRight: 'auto'} : null}>
        {text}
      <div className={styles.info}>
        <span style={{color: '#727272', fontSize: 15}}>{author}</span>
        <span style={{color: '#727272', fontSize: 15}}>{time}</span>
      </div>
    </div>
  )
}

export default Message
