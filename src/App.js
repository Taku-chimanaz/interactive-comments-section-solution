import { useEffect, useState } from 'react';
import './App.css';
import { Comment } from './Comment';
import { CommentInput } from './Comment-Input';
import data from './data.json';

function App() {

  const localStorageComments = JSON.parse(localStorage.getItem('comments'));
  const localStorageUser = JSON.parse(localStorage.getItem('user'));

  const [currentUser, setCurrentUser] = useState(localStorageUser == null ? null : localStorageUser);
  const [comments, setComments] = useState(localStorageComments == null ? [] : localStorageComments);



  useEffect(() => {

    if (currentUser === null && comments.length === 0) {
      setComments(data.comments);
      setCurrentUser(data.currentUser);
      localStorage.setItem('comments', JSON.stringify(data.comments));
      localStorage.setItem('user', JSON.stringify(data.currentUser))
    }


  }, [])
  return (
    <div className="App">

      <section className="comments-section-container">
        <div className="comments-container">
          {
            comments.length > 0 &&
            comments.map(comment => {
              return (
                comment.replies !== undefined && comment.replies.length > 0 ?
                  <>
                    <Comment comment={comment} comments={comments} setComments={setComments} user={currentUser} parentCommentID={null} />
                    <div className="replies">
                      {
                        comment.replies.map(reply => {
                          return <Comment comment={reply} comments={comments} setComments={setComments} user={currentUser} parentCommentID={comment.id} />
                        })
                      }
                    </div>
                  </> :
                  <Comment comment={comment} comments={comments} setComments={setComments} user={currentUser} parentCommentID={null} />
              )

            })
          }
        </div>




        <CommentInput
          user={currentUser}
          setComments={setComments}
          comments={comments}
        />
      </section>

    </div>
  );
}

export default App;
