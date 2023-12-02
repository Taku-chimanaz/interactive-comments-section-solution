import React, { useRef } from 'react';
import './css/Comment-Input.css';


export const CommentInput = ({ user, setComments, comments }) => {

    const image = user ? user.image.png.split('/') : '/';
    const commentRef = useRef();

    const sendComment = () => {
        const newComment = {
            id: Math.floor(Math.random() * 1000000000),
            content: commentRef.current.value,
            createdAt: new Date(),
            score: 0,
            user,
            replies: []
        };
        setComments([...comments, newComment]);
        localStorage.setItem('comments', JSON.stringify([...comments, newComment]))
        commentRef.current.value = "";
    }

    //const newImage = 
    return (

        <section className="comment-input">

            <div className="avatar-container">
                <img src={image[3]} alt="Avatar" />
            </div>

            <div className="comment-input-container">
                <textarea ref={commentRef} placeholder='Add a comment..'></textarea>
            </div>

            <button className="send-btn" onClick={sendComment}>
                send
            </button>
        </section>
    )
}

