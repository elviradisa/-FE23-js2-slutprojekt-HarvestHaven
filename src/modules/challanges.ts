import { postForum3, getYourUser, allUsers } from "./fetch.ts";

//Hämtar den inloggade användaren
const loggedInUserID = localStorage.getItem('userId') as string;
console.log(loggedInUserID)

getYourUser(loggedInUserID).then(data => {
  const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
  usernameInHeader.textContent = data.username;

  const loggedInUserProfileImage = localStorage.getItem('profileImage')
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
async function fillUserDropdown(): Promise<void> {
  try {
    const users = await allUsers(); // Hämta användaruppgifter från Firebase
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
function navigateToUserProfile(selectedUserId: string): void {
  // Konstruera URL:en till användarens profil baserat på userId 
  const userProfileUrl = `./visitprofile.html?userId=` + selectedUserId;
  // Navigera till den angivna URL:en
  window.location.href = userProfileUrl;
}
// Lägg till händelselyssnare för att navigera till användarens profil vid val i dropdown-listan
const userDropdown = document.getElementById("userDropdown");
if (userDropdown) {
  userDropdown.addEventListener("change", (event) => {
    let selectedUserId = (event.target as HTMLSelectElement).value;
    if (selectedUserId) {
      navigateToUserProfile(selectedUserId);
      localStorage.setItem('selectedUserId', selectedUserId)
    }
  });
}

fillUserDropdown();

// Funktion för att skapa inlägg
async function createPost(event: Event): Promise<void> {
  event.preventDefault();

  const postTitle = (document.getElementById("postTitle") as HTMLInputElement)?.value;
  const postContent = (document.getElementById("postContent") as HTMLTextAreaElement)?.value;

  if (postTitle && postContent) {
    try {
      const user = await getYourUser(loggedInUserID);
      // Ersätt loggedInUsername med användarnamnet för den inloggade användaren
      const loggedInUsername = user.username;
      await postForum3({ userID: loggedInUserID, postTitle, postContent, username: loggedInUsername });

      // Återställ formuläret
      (document.getElementById("postTitle") as HTMLInputElement).value = "";
      (document.getElementById("postContent") as HTMLTextAreaElement).value = "";

      updatePostList();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
}

// Funktion för att skapa en kommentar
async function createComment(postId: string, postTitle: string, commentContent: string): Promise<void> {
  try {
    const commentList = document.getElementById(`commentList_${postId}`);
    if (commentList) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const user = await getYourUser(loggedInUserID);
      const username = user.username;
      commentElement.innerHTML = `
      <div>
        <h6>Kommentar av ${username}:</h6>
        <p>${commentContent}</p>
        <button class="deleteCommentBtn" data-comment-id="${postId}">Delete</button>
      </div>`;
      commentList.appendChild(commentElement);
    } else {
      console.error(`Error: Could not find comment list for post ID ${postId}`);
    }
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}

// Uppdatera inläggslistan
async function updatePostList(): Promise<void> {
  try {
    const posts = await getPosts(); // Hämta alla inlägg från Firebase
    const postsList = document.getElementById("postsList");

    if (postsList) {
      postsList.innerHTML = ""; // Rensa tidigare inlägg

      // Loopa igenom alla inlägg
      for (const postId in posts.forum3[0].posts) {
        const post = posts.forum3[0].posts[postId];

        if (post) {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postTitle = post.postTitle;
          const postContent = post.postContent;
          const userId = post.userID;

          // Hämta användaruppgifter för författaren av inlägget
          const user = await getYourUser(userId);
          const username = user ? user.username : "Unknown User";

          postElement.innerHTML = `
            <div class="post">
              <div>
                <h4 class="username">Posted by: ${username}</h4>
              </div>
              <div>
                <h5>${postTitle}</h5>
                <p>${postContent}</p>
              </div>
              <form id="commentForm_${postId}">
                <textarea id="commentInput_${postId}" placeholder="Innehåll"></textarea>
                <button class="commentBtn" data-post-id="${postId}" data-post-title="${postTitle}">Kommentera</button>
              </form>
              <div id="commentList_${postId}"></div>
            </div>`;

          postsList.prepend(postElement);

          // Ladda och visa kommentarerna för den aktuella posten
          const comments = await getCommentsForPost(postId);
          const commentListElement = postElement.querySelector(`#commentList_${postId}`);
          if (commentListElement && comments) {
            comments.forEach((comment: any) => {
              const commentElement = document.createElement("div");
              commentElement.classList.add("comment");
              commentElement.innerHTML = `
                <div>
                  <h6>Kommentar av ${comment.username}:</h6>
                  <p>${comment.commentContent}</p>
                  <button class="deleteCommentBtn" data-comment-id="${comment.commentId}">Delete</button>
                </div>`;
              commentListElement.appendChild(commentElement);
            });
          }

          // Lägg till händelselyssnare för klickhändelse på kommentarknappen
          const commentBtn = postElement.querySelector(".commentBtn") as HTMLButtonElement;
          commentBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Förhindra standardbeteendet för knappen
            const postId = commentBtn.dataset.postId?.toString(); // Hämta postId från dataset på kommentarknappen
            const postTitle = commentBtn.dataset.postTitle; // Hämta postTitle från dataset på kommentarknappen
            if (postId && postTitle) {
              const commentInput = document.getElementById(`commentInput_${postId}`) as HTMLInputElement;
              const commentContent = commentInput.value.trim();
              if (commentContent) {
                createComment(postId, postTitle, commentContent); // Anropa createComment med postId och postTitle
                // Återställ kommentarinput
                commentInput.value = "";
              }
            } else {
              console.error("Error: Could not extract postId or postTitle from dataset");
            }
          });
        }
      }
    }
  } catch (error) {
    console.error("Error updating post list:", error);
  }
}

// Funktion för att hämta kommentarer för en specifik post
async function getCommentsForPost(postId: string): Promise<any[]> {
  try {
    // Hämta kommentarerna för den aktuella posten från databasen
    const response = await fetch(
      `https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/forum1/0/comments/${postId}.json`
    );
    const data = await response.json();
    if (data) {
      // Konvertera kommentar-objekten till en array för enklare hantering
      return Object.keys(data).map((commentId) => ({
        commentId,
        ...data[commentId],
      }));
    } else {
      return []; // Returnera en tom array om det inte finns några kommentarer
    }
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    return []; // Returnera en tom array om det uppstår ett fel
  }
}

// Lägg till för formulärets submit-händelse
const postForm = document.getElementById("postForm");
if (postForm) {
  postForm.addEventListener("submit", createPost);
}

// Funktion för att hämta inlägg från Firebase
async function getPosts(): Promise<any> {
  const response = await fetch(
    "https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  const data = await response.json();
  return data;
}

// Uppdatera inläggslistan vid sidans laddning
window.onload = updatePostList;