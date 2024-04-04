<<<<<<< Updated upstream
import { get, getCommentsInProfile, getYourUser } from "./fetch.ts";
import { createAndAppend } from "./createAndAppend.ts";
=======
import { getCommentsInProfile } from "./fetch.ts"; // Importera funktionen för att hämta användarens kommentarer
import { createAndAppend } from "./createAndAppend.ts"; // Importera hjälpfunktionen för att skapa och lägga till element i DOM:en
>>>>>>> Stashed changes

// Definiera typen för en kommentar
type Comment = {
    commentContent: string;
    userId: string;
}

<<<<<<< Updated upstream
const loggedInUserID = localStorage.getItem('userId');
console.log(loggedInUserID)

getYourUser(loggedInUserID).then(data => {
    const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
    const usernameInBody = document.querySelector('.myAccountUsername') as HTMLParagraphElement;
    usernameInHeader.textContent = data.username;
    usernameInBody.textContent = data.username;
});

=======
// Funktion för att visa kommentarer på profilsidan
function displayCommentsInProfile(comments: Comment[]) {
    const commentSection = document.querySelector('.latestComments') as HTMLDivElement; // Hitta sektionen där kommentarerna ska visas
>>>>>>> Stashed changes

    // Loopa genom varje kommentar
    for (const comment of comments) {
        // Skapa ett nytt element för varje kommentar
        const eachCommentCard = createAndAppend(commentSection, 'div', '') as HTMLDivElement;
        eachCommentCard.classList.add('commentCard'); // Lägg till en CSS-klass för styling
        // Skapa ett element för att visa själva kommentaren
        const commentContent = createAndAppend(eachCommentCard, 'p', comment.commentContent);
        // Skapa ett element för att visa användar-ID:t för kommentaren (kan vara användbart för framtida användning)
        const commentUserId = createAndAppend(eachCommentCard, 'span', `User ID: ${comment.userId}`);
    }
}

// Hämta användarens kommentarer från backenden när sidan laddas
window.onload = async () => {
    try {
        const userId = "current_user_id"; // Ersätt "current_user_id" med den faktiska inloggade användarens ID
        const comments = await getCommentsInProfile(userId); // Hämta användarens kommentarer från backenden
        displayCommentsInProfile(comments); // Visa kommentarerna på profilsidan
    } catch (error) {
        console.error("Error fetching and displaying comments:", error);
    }
};


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
