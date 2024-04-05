import { getCommentsInProfile } from "./fetch.ts"; // Importera funktionen för att hämta användarens kommentarer

// Definiera typen för en kommentar
type Comment = {
    commentContent: string;
    userId: string;
}

function displayCommentsInProfile(comments: Comment[]) {
    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;
    commentSection.innerHTML = ''; // Rensa tidigare innehåll

    // Visa bara de tre senaste kommentarerna
    const latestComments = comments.slice(0, 3);

    for (const comment of latestComments) {
        const eachCommentCard = document.createElement('div');
        eachCommentCard.classList.add('commentCard');

        const commentContent = document.createElement('p');
        commentContent.textContent = comment.commentContent;

        const commentUserId = document.createElement('span');
        commentUserId.textContent = `User ID: ${comment.userId}`;

        eachCommentCard.appendChild(commentContent);
        eachCommentCard.appendChild(commentUserId);

        commentSection.appendChild(eachCommentCard);
    }
}

// Hämta och visa tre senaste kommentarerna när sidan laddas
window.onload = async () => {
    try {
        const userId = "current_user_id"; // Ersätt med den faktiska inloggade användarens ID
        const comments = await getCommentsInProfile(userId);
        displayCommentsInProfile(comments.slice(0, 3)); // Visa bara de tre senaste kommentarerna
    } catch (error) {
        console.error("Error fetching and displaying latest comments:", error);
    }
    
};

export { displayCommentsInProfile, Comment };
