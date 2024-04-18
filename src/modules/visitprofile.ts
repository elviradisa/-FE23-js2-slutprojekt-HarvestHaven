import { getCommentsInProfile, allUsers, getYourUser, get, getpostsFromUsers } from "./fetch"; // Importera funktionen för att hämta användarens kommentarer
import { createAndAppend } from "./createAndAppend"; // Importera hjälpfunktionen för att skapa och lägga till element i DOM:en

//Hämtar den inloggade användaren samt dess posts
const userId = localStorage.getItem('userId') as string;
console.log(userId)

getYourUser(userId).then(data => {
    const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;

    usernameInHeader.textContent = data.username;

    const loggedInUserProfileImage = localStorage.getItem('profileImage')
    const profileImage = document.getElementById('profilePicture') as HTMLImageElement;

    if (loggedInUserProfileImage == 'pig') {
        const imageLink = new URL('../media/img/pig.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    } else if (loggedInUserProfileImage == 'cow') {
        const imageLink = new URL('../media/img/cow.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    } else {
        const imageLink = new URL('../media/img/chick.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    }
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

function navigateToUserProfile(userId: any) {
    const profileSection = document.querySelector('.profileSection') as HTMLElement;
    const userDropdown = document.getElementById("userDropdown") as HTMLSelectElement;

    userDropdown.addEventListener('change', (event) => {
        event.preventDefault();
        let selectedUserId = (event.target as HTMLSelectElement).value;

        userId = selectedUserId;
        console.log(selectedUserId)
        // localStorage.setItem('selectedUserId', selectedUserId);

        getYourUser(selectedUserId).then(data => {
            console.log(data.username)
            const visitedProfileUsername = document.querySelector('.visitedProfileUsername') as HTMLParagraphElement;
            visitedProfileUsername.textContent = data.username;

            const profileImageX2 = document.getElementById('profilePicturex2') as HTMLImageElement;

            if (data.userImage == 'pig') {
                const imageLink = new URL('../media/img/pig.jpeg', import.meta.url)
                profileImageX2.src = imageLink.toString();
            } else if (data.userImage == 'cow') {
                const imageLink = new URL('../media/img/cow.jpeg', import.meta.url)
                profileImageX2.src = imageLink.toString();
            } else {
                const imageLink = new URL('../media/img/chick.jpeg', import.meta.url)
                profileImageX2.src = imageLink.toString();
            }

            displayPostsInProfile(selectedUserId, 'forum1');
            displayPostsInProfile(selectedUserId, 'forum2');
            displayPostsInProfile(selectedUserId, 'forum3');

        })
    })

}

///////////////////////////


///////////////////////////

// Anropa funktionen för att fylla dropdown-listan när sidan laddas
fillUserDropdown();
const selectedUserId = localStorage.getItem('selectedUserId') as string;
navigateToUserProfile('selectedUserId');

// Definiera typen för en kommentar
type Comment = {
    commentContent: string;
    userId: string;
}

async function displayPostsInProfile(userId: string, forum: string) {
    const posts = await getpostsFromUsers(forum);
    userId = userId;
    let postId: string;
    for (postId in posts) {

        var post = posts[postId];

        if (post.userID === userId) {
            createCommentsInProfile(postId, post.postContent)
        }
    }
}

async function createCommentsInProfile(postId: any, postContent: string) {
    // const posts = await getpostsFromUsers('forum1', postId);

    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;
    // commentSection.innerHTML = "";
    // commentSection.id = 'comment'

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    // eachCommentCard.id = postId


    const latestPosts = createAndAppend(eachCommentCard, 'p', postContent)
    localStorage.setItem('postId', postId)
}

export { Comment, navigateToUserProfile };
