export const calculateDate = (commentDate) => {

    const commentJSDate = new Date(commentDate).getTime();
    const currentDate = new Date().getTime();

    const timeDifference = currentDate - commentJSDate;
    const seconds = Math.floor(timeDifference / (1000));
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference >= 1 && daysDifference <= 29) {
        return `${daysDifference} ago`
    } else if (daysDifference > 29) {
        const months = Math.floor(daysDifference / 30);
        return `${months} ${months > 1 ? 'months' : 'month'} ago`
    } else {
        return `${seconds > 60 ? `${minutes} minutes ago` : `${seconds} seconds ago`}`
    }
}