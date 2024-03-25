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

        // console.log(comments[commentId])
    }
}

function createCommentsInProfile(comment: string, commentId: string) {
    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    eachCommentCard.id = commentId
    // console.log(eachCommentCard.id)


    const latestComments = createAndAppend(eachCommentCard, 'p', comment)

    // console.log(commentSection)
    // console.log(latestComments)
    // console.log(eachCommentCard)


    // console.log(user)
}



export { displayCommentsInProfile }
export { Comment }
