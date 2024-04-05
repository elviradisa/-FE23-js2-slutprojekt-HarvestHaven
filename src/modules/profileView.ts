import { getCommentsInProfile, allUsers, getYourUser } from "./fetch"; // Importera funktionen för att hämta användarens kommentarer
import { createAndAppend } from "./createAndAppend"; // Importera hjälpfunktionen för att skapa och lägga till element i DOM:en

//Hämtar den inloggade användaren
const loggedInUserID = localStorage.getItem('userId') as string;
console.log(loggedInUserID)

getYourUser(loggedInUserID).then(data => {
    const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
    const usernameInBody = document.querySelector('.myAccountUsername') as HTMLParagraphElement;

    usernameInHeader.textContent = data.username;
    usernameInBody.textContent = data.username;

    displayCommentsInProfile(data.comments, data.comments)
    console.log(data.comments)

    const loggedInUserProfileImage = localStorage.getItem('profileImage')
    const profileImage = document.getElementById('profilePicture') as HTMLImageElement;
    const profileImageX2 = document.getElementById('profilePicturex2') as HTMLImageElement;
    // const profileImgInBody = document.querySelector('profilePicture') as HTMLImageElement;


    if (loggedInUserProfileImage == 'pig') {
        const imageLink = new URL('../media/img/pig.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
        profileImageX2.src = imageLink.toString();
    } else if (loggedInUserProfileImage == 'cow') {
        const imageLink = new URL('../media/img/cow.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
        profileImageX2.src = imageLink.toString();
    } else {
        const imageLink = new URL('../media/img/chick.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
        profileImageX2.src = imageLink.toString();
    }
});

// Funktion för att fylla dropdown-listan med användarnamn
async function fillUserDropdown(): Promise<void> {
    try {
        console.log("Filling user dropdown..."); // Kontrollmeddelande för att se om funktionen körs

        const users = await allUsers(); // Hämta användaruppgifter från Firebase
        console.log("Users from Firebase:", users); // Kontrollera om data hämtas korrekt

        const userDropdown = document.getElementById("userDropdown") as HTMLSelectElement;

        if (userDropdown) {
            userDropdown.innerHTML = ""; // Rensa dropdown-listan innan fyllning

            for (const userId in users) {
                const username = users[userId].username;
                const option = document.createElement("option");
                option.value = userId;
                option.textContent = username;
                userDropdown.appendChild(option);
            }
        }

        console.log("User dropdown filled successfully.");
    } catch (error) {
        console.error("Error filling user dropdown:", error);
    }
}

// Funktion för att navigera till användarens profil
function navigateToUserProfile(userId: string): void {
    // Konstruera URL:en till användarens profil baserat på userId 
    const userProfileUrl = `http://localhost:1234/profileView.html?userId=${userId}`;
    // Navigera till den angivna URL:en
    window.location.href = userProfileUrl;
}

// Lägg till händelselyssnare för att navigera till användarens profil vid val i dropdown-listan
const userDropdown = document.getElementById("userDropdown");
if (userDropdown) {
    userDropdown.addEventListener("change", (event) => {
        const selectedUserId = (event.target as HTMLSelectElement).value;
        if (selectedUserId) {
            navigateToUserProfile(selectedUserId);
        }
    });
}

// Anropa funktionen för att fylla dropdown-listan när sidan laddas
fillUserDropdown();

// Definiera typen för en kommentar
type Comment = {
    commentContent: string;
    userId: string;
}

// // Funktion för att visa tre senaste kommentarerna på profilsidan
// function displayCommentsInProfile(comments: Comment[]) {
//     const commentSection = document.querySelector('.latestComments') as HTMLDivElement; // Hitta sektionen där kommentarerna ska visas

//     // Loopa genom varje kommentar
//     for (const comment of comments) {
//         // Skapa ett nytt element för varje kommentar
//         const eachCommentCard = document.createElement('div');
//         eachCommentCard.classList.add('commentCard'); // Lägg till en CSS-klass för styling

//         // Skapa ett element för att visa själva kommentaren
//         const commentContent = document.createElement('p');
//         commentContent.textContent = comment.commentContent;

//         // Skapa ett element för att visa användar-ID:t för kommentaren (kan vara användbart för framtida användning)
//         const commentUserId = document.createElement('span');
//         commentUserId.textContent = `User ID: ${comment.userId}`;

//         // Lägg till kommentar och användar-ID till det nya kortet
//         eachCommentCard.appendChild(commentContent);
//         eachCommentCard.appendChild(commentUserId);

//         // Lägg till det nya kortet till kommentarsektionen
//         commentSection.appendChild(eachCommentCard);
//     }
// }

// // Hämta och visa tre senaste kommentarerna när sidan laddas
// window.onload = async () => {
//     try {
//         // Anta att userId innehåller ID för den inloggade användaren
//         const userId = "current_user_id"; // Ersätt "current_user_id" med den faktiska inloggade användarens ID
//         const comments = await getCommentsInProfile(userId); // Hämta kommentarerna för den aktuella användaren från backenden
//         displayCommentsInProfile(comments); // Visa de senaste tre kommentarerna på profilsidan
//     } catch (error) {
//         console.error("Error fetching and displaying latest comments:", error);
//     }
// };




function displayCommentsInProfile(comments: any, commentContent: string) {
    for (const postId in comments) {
        const comment = comments[postId];
        createCommentsInProfile(postId, comment.postContent)
        // getCommentsInProfile(loggedInUserID, postId, comment)
        console.log(postId)
        console.log(comment.postContent)
        console.log(commentContent)
        console.log(comments[postId])
    }
}

function createCommentsInProfile(postId: string, comment: string) {
    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    eachCommentCard.id = postId
    console.log(eachCommentCard)

    const latestComments = createAndAppend(eachCommentCard, 'p', comment)
}



export { displayCommentsInProfile, Comment };
