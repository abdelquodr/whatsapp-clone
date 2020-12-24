import React, { useState, useEffect } from 'react';
import '../css/chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider';
import firebase from 'firebase'

const Chat = () => {
    const [seed, setSeed] = useState();
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue()


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h4>{roomName}</h4>
                    {/* <p>{new Date(messages[messages.length - 1]?.timestamp.toDate()).toUTCString()}</p> */}
                    {console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', messages[messages.length - 1])}
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) =>
                    <p className={`chat__message ${true && "chat__receiver"}`}>
                        <span className="chat__name"> {message.name}</span>
                        {message.message}
                        <span className="chat__timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                )}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form >
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
