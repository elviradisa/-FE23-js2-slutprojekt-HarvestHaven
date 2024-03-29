import { get, getCommentsInProfile } from "./fetch.ts";
import { createAndAppend } from "./createAndAppend.ts";

type Comment = {
    commentContent: string,
    userId: string

}


function displayCommentsInProfile(comments: Comment) {
    for (const commentId in comments) {
        const comment = comments[commentId];
        createCommentsInProfile(comment, commentId)

        console.log(comments)
    }
}

function createCommentsInProfile(comment: string, commentId: string) {
    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    eachCommentCard.id = commentId
    // console.log(eachCommentCard.id)

    const latestComments = createAndAppend(eachCommentCard, 'p', comment)
}

// function getUserInfo(userId: string) {
//     // get()
//     const username = document.querySelector('.username') as HTMLParagraphElement;
//     username.innerText = userId
//     let id = userId
//     console.log(id);
// }

// function displayUsername(username: Comment) {


// }



export { displayCommentsInProfile }
export { Comment }
