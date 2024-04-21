import { allUsers, getYourUser, getpostsFromUsers } from "./fetch"; // Importera funktionen för att hämta användarens kommentarer
import { createAndAppend } from "./createAndAppend"; // Importera hjälpfunktionen för att skapa och lägga till element i DOM:en

//Hämtar den inloggade användaren samt dess posts
const userId = localStorage.getItem('userId') as string;
console.log(userId)

getYourUser(userId).then(data => {
    const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
    usernameInHeader.textContent = data.username;

    const profileImage = document.getElementById('profilePicture') as HTMLImageElement;

    if (data.userImage == 'pig') {
        const imageLink = new URL('../media/img/pig.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    } else if (data.userImage == 'cow') {
        const imageLink = new URL('../media/img/cow.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    } else {
        const imageLink = new URL('../media/img/chick.jpeg', import.meta.url)
        profileImage.src = imageLink.toString();
    }
});

// Funktion för att fylla dropdown-listan med användarnamn
async function fillUserDropdown(selectedUserId: string): Promise<void> {
    try {
        console.log("Filling user dropdown..."); // Kontrollmeddelande för att se om funktionen körs

        const users = await allUsers(); // Hämta användaruppgifter från Firebase
        // console.log("Users from Firebase:", users); // Kontrollera om data hämtas korrekt

        const userDropdown = document.getElementById("userDropdown") as HTMLSelectElement;

        if (userDropdown) {
            userDropdown.innerHTML = " "; // Rensa dropdown-listan innan fyllning

            for (const userId in users) {
                const username = users[userId].username;
                const option = document.createElement("option");
                option.value = userId;
                option.textContent = username;
                option.selected = (userId == selectedUserId);
                userDropdown.appendChild(option);
            }
        }
        console.log("User dropdown filled successfully.");
    } catch (error) {
        console.error("Error filling user dropdown:", error);
    }
}

function navigateToUserProfile(selectedUserId: string) {
    fillUserDropdown(selectedUserId).then(() => {
        const userDropdown = document.getElementById("userDropdown") as HTMLSelectElement;

        userDropdown.addEventListener('change', (event) => {
            let selectedUserId = (event.target as HTMLSelectElement).value;

            console.log(selectedUserId)

            if (userId) {
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
                    const visitedProfileUser = document.querySelector('.visitedProfileUser') as HTMLElement;
                    visitedProfileUser.innerHTML = `${data.username}'s latest posts:`

                    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;
                    commentSection.innerHTML = " ";
                    // (document.querySelector(".lastComments") as HTMLDivElement).innerHTML = "";

                    displayPostsInProfile(selectedUserId, 'forum1');
                    displayPostsInProfile(selectedUserId, 'forum2');
                    displayPostsInProfile(selectedUserId, 'forum3');

                })
            }

        })
        userDropdown.dispatchEvent(new Event("change"));
    })
}

///////////////////////////
///////////////////////////

const selectedUserId = (new URLSearchParams(window.location.search).get("userId") ?? localStorage.getItem('userId')) as string;
window.history.replaceState({}, document.title, "visitprofile.html");

// Anropa funktionen för att fylla dropdown-listan när sidan laddas
navigateToUserProfile(selectedUserId);

async function displayPostsInProfile(userId: string, forum: string) {
    const posts = await getpostsFromUsers(forum);
    // userId = userId;
    let postId: string;

    for (postId in posts) {

        var post = posts[postId];

        if (post.userID === userId) {
            createCommentsInProfile(postId, post.postContent)
        }
    }
}

async function createCommentsInProfile(postId: any, postContent: string) {

    const commentSection = document.querySelector('.latestComments') as HTMLDivElement;

    const eachCommentCard = createAndAppend(commentSection, 'div', ' ') as HTMLDivElement;
    eachCommentCard.id = postId

    const latestPosts = createAndAppend(eachCommentCard, 'p', postContent)
    localStorage.setItem('postId', postId)
}
