import React, { useRef, useState } from 'react';
import './css/Reply.css';
import { arrangeComments } from './sortArray';


export const ReplyInput = ({ user, btnType, comment, setComments, comments, commentID, replyingTo, isParent, setShowReplyInput }) => {

    const image = user.image.png.split('/');
    const [commentValue, setCommentValue] = useState(btnType === 'edit' ? comment.content : '');

    const sendComment = () => {

        if (commentValue.length === 0) {
            return
        }

        const newComment = {
            id: Math.floor(Math.random() * 1000000000),
            content: commentValue,
            createdAt: new Date(),
            score: 0,
            replyingTo,
            user,
            replies: []
        };

        const repliedComment = comments.filter(comment => comment.id === commentID)[0];
        const filteredComments = comments.filter(comment => comment.id !== commentID);
        repliedComment.replies = [...repliedComment.replies, newComment];
        const sortedComments = arrangeComments([...filteredComments, repliedComment]);
        setComments(sortedComments);
        localStorage.setItem('comments', JSON.stringify(sortedComments))
        setShowReplyInput(false);
    }

    const editComment = () => {
        const newComment = comment
        if (commentValue.length === 0) {
            return
        }

        // editing original comment
        if (isParent == true) {
            newComment.content = commentValue;
            const filteredComments = comments.filter(comm => comm.id !== comment.id);
            const sortedComments = arrangeComments([...filteredComments, newComment]);
            setComments(sortedComments);
            localStorage.setItem('comments', JSON.stringify(sortedComments));
            setShowReplyInput(false);

        } else {
            // editing reply to comment
            const repliedComment = comments.filter(comment => comment.id === commentID)[0];
            const filteredComments = comments.filter(comment => comment.id !== commentID);
            const replies = repliedComment.replies.filter(reply => reply.id !== comment.id);
            newComment.content = commentValue;
            const updatedComments = [...replies, newComment];
            repliedComment.replies = arrangeComments(updatedComments);
            const sortedComments = arrangeComments([...filteredComments, repliedComment])
            setComments(sortedComments);
            localStorage.setItem('comments', JSON.stringify(sortedComments));
            setShowReplyInput(false);
        }


    }

    //const newImage = 
    return (

        <section className="reply-input">

            <div className="avatar-container">
                <img src={image[3]} alt="Avatar" />
            </div>

            <div className="reply-input-container">
                <textarea value={commentValue} placeholder={`@${replyingTo} `} onChange={e => setCommentValue(e.target.value)}></textarea>
            </div>

            <button className="send-btn" onClick={btnType === 'reply' ? sendComment : editComment}>
                {btnType === 'edit' ? btnType : 'Reply'}
            </button>
        </section>
    )
}

