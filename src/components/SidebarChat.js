import React, { useState, useEffect } from 'react';
import '../css/sidebarChat.css'
import Avatar from '@material-ui/core/Avatar'
import db from '../firebase'
import { Link } from 'react-router-dom'

const SidebarChat = ({ addNewChat, name, id }) => {

    const [seed, setSeed] = useState('');
    const [message, setMessage] = useState([])

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => setMessage(snapshot.docs.map(doc => doc.data())))
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h4>{name}</h4>
                    <p>{message[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat} className="sidebarChat" >
                <h3>Add new Chat</h3>
            </div>
        );
}

export default SidebarChat;
