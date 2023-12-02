export const arrangeComments = (comment) => {

    const sortedComment = comment.sort((a, b) => { return b.score - a.score });
    return sortedComment;
}

