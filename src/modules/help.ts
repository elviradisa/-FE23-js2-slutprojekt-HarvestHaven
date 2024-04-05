import { postForum2, allUsers, getYourUser } from "./fetch.ts";

//Hämtar den inloggade användaren
const loggedInUserID = localStorage.getItem('userId') as string;
console.log(loggedInUserID)

getYourUser(loggedInUserID).then(data => {
  const usernameInHeader = document.querySelector('.username') as HTMLParagraphElement;
  const usernameInBody = document.querySelector('.myAccountUsername') as HTMLParagraphElement;
  usernameInHeader.textContent = data.username;
  usernameInBody.textContent = data.username;
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

// skapa ett inlägg
async function createPost(event: Event): Promise<void> {
  event.preventDefault();

  const postTitle = (document.getElementById("postTitle") as HTMLInputElement)?.value;
  const postContent = (document.getElementById("postContent") as HTMLTextAreaElement)?.value;

  if (postTitle && postContent) {
    try {
      // Skicka det nya inlägget till Firebase
      await postForum2({ postTitle, postContent });
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
      //Lägg in "USER ID på "kommentar:"
      commentElement.innerHTML = `
        <div>
          <h6>Kommentar:</h6>
          <p>${commentContent}</p>
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
    const posts = await getPosts();
    const postsList = document.getElementById("postsList");

    if (postsList) {
      postsList.innerHTML = ""; // Rensa tidigare inlägg

      for (const postId in posts.forum2[0].posts) {
        const post = posts.forum2[0].posts[postId];

        if (post) {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postTitle = post.postTitle;
          const postContent = post.postContent;
          const userId = post.userId; // Antag att detta är användarens ID som skapade inlägget

          postElement.innerHTML = `
            <div id="postsList"><div>
              <img src=""/>
              <h4 id="userID">${userId}</h4> <!-- Visar användarens ID -->
            </div>
            <div>
              <h5>${postTitle}</h5>
              <p>${postContent}</p>
            </div>
            <form id="commentForm_${postId}">
              <textarea id="commentInput_${postId}" placeholder="Innehåll"></textarea>
              <button class="commentBtn" data-post-id="${postId}" data-post-title="${postTitle}">Kommentera</button>
            </div>
            <div id="commentList_${postId}"></div>
            </form>`;

          postsList.appendChild(postElement);

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
                // Återställ kommentarfältet
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