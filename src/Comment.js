import React, { useState } from 'react';
import './css/Comment.css';
import minusIcon from './images/icon-minus.svg';
import plusIcon from './images/icon-plus.svg';
import replyIcon from './images/icon-reply.svg';
import deleteIcon from './images/icon-delete.svg';
import editIcon from './images/icon-edit.svg';
import { ReplyInput } from './ReplyInput';
import { arrangeComments } from './sortArray'
import { calculateDate } from './calculateDate';
import { Modal } from './Modal';


export const Comment = ({ comment, comments, setComments, user, parentCommentID }) => {

    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showModalState, setShowModalState] = useState(false);
    const [choice, setChoice] = useState(null);
    const [btnType, setBtnType] = useState('')
    const image = comment.user.image.png.split('/');

    const openReplyInput = (btnType) => {
        setBtnType(btnType);
        setShowReplyInput(!showReplyInput);
    }

    const deleteComment = () => {


        setShowModalState(true);


    }

    const scoreUpOrDown = (scoreUp) => {

        if (parentCommentID === null) {
            const targetComment = comments.filter(comm => comm.id === comment.id)[0];
            const filteredComments = comments.filter(comm => comm.id !== comment.id);
            targetComment.score = scoreUp == 'up' ? comment.score + 1 : comment.score - 1;
            const newComments = [...filteredComments, targetComment];
            const sortedComments = arrangeComments(newComments)
            localStorage.setItem('comments', JSON.stringify(sortedComments));
            setComments(sortedComments);

        } else {
            const parentComment = comments.filter(comm => comm.id === parentCommentID)[0];
            const filteredComments = comments.filter(comm => comm.id !== parentCommentID);
            const targetReply = parentComment.replies.filter(reply => reply.id === comment.id)[0];
            const filteredReplies = parentComment.replies.filter(reply => reply.id !== comment.id);
            console.log(targetReply)
            targetReply.score = scoreUp == 'up' ? targetReply.score + 1 : targetReply.score - 1;
            const updatedReplies = arrangeComments([...filteredReplies, targetReply]);
            parentComment.replies = updatedReplies;
            const updatedComments = [...filteredComments, parentComment];
            const sortedComments = arrangeComments(updatedComments)
            localStorage.setItem('comments', JSON.stringify(sortedComments));
            setComments(sortedComments);
        }
    }

    return (
        <>
            {
                showModalState &&
                <Modal
                    setChoice={setChoice}
                    setShowModalState={setShowModalState}
                    setComments={setComments}
                    comment={comment}
                    comments={comments}
                    parentCommentID={parentCommentID}
                />
            }
            <article className="comment">

                <div className="comment__likes-container">

                    <div className="comment__likes-container__contents">

                        <button className="plus-icon-container" onClick={() => scoreUpOrDown('up')}>
                            <img
                                src={plusIcon}
                                alt="Plus Icon"
                            />
                        </button>

                        <p className='likes-counter'>
                            {comment.score}
                        </p>

                        <button className="minus-icon-container" onClick={() => scoreUpOrDown('down')}>
                            <img
                                src={minusIcon}
                                alt="Plus Icon"
                            />
                        </button>

                    </div>

                </div>

                <div className="comment__content-container">

                    <div className="comment__content-container__header">

                        <div className="comment__content-container__header__user-details">

                            <div className="user-avatar-container">
                                <img src={image[3]} alt="User Profile Avatar" />
                            </div>

                            <div className="user-username">
                                {comment.user.username}
                            </div>

                            <div className="comment-date">
                                {comment.createdAt.toString().includes("ago") ? comment.createdAt : calculateDate(comment.createdAt)}
                            </div>
                        </div>


                        {
                            comment.user.username === user.username ?
                                <>
                                    <button className="delete-reply-btn" onClick={deleteComment}>
                                        <div className="reply-icon-container">
                                            <img src={deleteIcon} alt="Reply Icon" />
                                        </div>
                                        <p style={{}}>Delete</p>
                                    </button>

                                    <button className="edit-reply-btn" onClick={() => openReplyInput('edit')}>
                                        <div className="reply-icon-container">
                                            <img src={editIcon} alt="Reply Icon" />
                                        </div>
                                        <p>Edit</p>
                                    </button>
                                </> :
                                <button className="comment-reply-btn" onClick={() => openReplyInput('reply')}>
                                    <div className="reply-icon-container">
                                        <img src={replyIcon} alt="Reply Icon" />
                                    </div>
                                    <p>Reply</p>
                                </button>
                        }


                    </div>

                    <p className="comment-text">
                        {comment.replyingTo ?
                            <p><span style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>{`@${comment.replyingTo}`}</span> {comment.content}</p>
                            :
                            comment.content
                        }
                    </p>
                </div>


            </article>

            {
                showReplyInput &&
                <ReplyInput
                    user={user}
                    btnType={btnType}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                    setShowReplyInput={setShowReplyInput}
                    commentID={parentCommentID === null ? comment.id : parentCommentID}
                    isParent={parentCommentID === null ? true : false}
                    replyingTo={comment.user.username}
                />
            }

        </>
    )
}
