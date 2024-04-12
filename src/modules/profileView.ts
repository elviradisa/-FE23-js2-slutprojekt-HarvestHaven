import { getCommentsInProfile, allUsers, getYourUser, get, getpostsFromUsers } from "./fetch"; // Importera funktionen för att hämta användarens kommentarer
import { createAndAppend } from "./createAndAppend"; // Importera hjälpfunktionen för att skapa och lägga till element i DOM:en

//Hämtar den inloggade användaren samt dess posts
const loggedInUserID = localStorage.getItem('userId') as string;
console.log(loggedInUserID)

getYourUser(loggedInUserID).then(data => {
    const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
    const usernameInBody = document.querySelector('.myAccountUsername') as HTMLParagraphElement;

    usernameInHeader.textContent = data.username;
    usernameInBody.textContent = data.username;

    const loggedInUserProfileImage = localStorage.getItem('profileImage')
    const profileImage = document.getElementById('profilePicture') as HTMLImageElement;
    const profileImageX2 = document.getElementById('profilePicturex2') as HTMLImageElement;

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
    displayPostsInProfile(loggedInUserID, 'forum1');
    displayPostsInProfile(loggedInUserID, 'forum2');
    displayPostsInProfile(loggedInUserID, 'forum3');
});

// Funktion för att fylla dropdown-listan med användarnamn
async function fillUserDropdown(): Promise<void> {
    try {
        console.log("Filling user dropdown..."); // Kontrollmeddelande för att se om funktionen körs

        const users = await allUsers(); // Hämta användaruppgifter från Firebase
        // console.log("Users from Firebase:", users); // Kontrollera om data hämtas korrekt

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

async function displayPostsInProfile(userId: string, forum: string) {
    const posts = await getpostsFromUsers(forum);

    userId = loggedInUserID;
    let postId: string;

    for (postId in posts) {

        var post = posts[postId];

        if (post.userID === loggedInUserID) {
            createCommentsInProfile(postId, post.postContent)
        }
    }
}

async function createCommentsInProfile(postId: any, postContent: string) {
    // const posts = await getpostsFromUsers('forum1', postId);

    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    eachCommentCard.id = postId

    const latestPosts = createAndAppend(eachCommentCard, 'p', postContent)
    localStorage.setItem('postId', postId)
}


export { Comment };
