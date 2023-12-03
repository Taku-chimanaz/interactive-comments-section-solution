import React from 'react'
import { arrangeComments } from './sortArray'
import './css/Modal.css'

export const Modal = ({ setShowModalState, setComments, comments, comment, parentCommentID }) => {


    const deleteChoose = (e) => {
        const choice = e.target.innerHTML;


        if (choice === 'delete') {
            if (parentCommentID === null) {
                const newComments = arrangeComments(comments.filter(comm => comm.id !== comment.id));
                localStorage.setItem('comments', JSON.stringify(newComments));
                setComments(newComments);

            } else {
                // deleting reply to parent

                const repliedComment = comments.filter(comment => comment.id === parentCommentID)[0];
                const filteredComments = comments.filter(comment => comment.id !== parentCommentID);
                const newReplies = repliedComment.replies.filter(reply => reply.id !== comment.id);
                repliedComment.replies = arrangeComments(newReplies);
                localStorage.setItem('comments', JSON.stringify([...filteredComments, repliedComment]))
                setComments([...filteredComments, repliedComment]);
            }
        }
        setShowModalState(false)
    }
    return (

        <section className="modal">

            <div className="modal-contents">

                <p className="delete-comment">
                    delete comment
                </p>

                <p className="delete-warning">
                    are you sure you want to delete this comment?This will remove the comment and can't be undone
                </p>

                <div className="buttons-container">

                    <button className="cancel" onClick={(e) => deleteChoose(e)}>
                        no,cancel
                    </button>

                    <button className="delete" onClick={(e) => deleteChoose(e)}>
                        delete
                    </button>
                </div>
            </div>
        </section>
    )
}
