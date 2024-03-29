import { post } from "./fetch.ts";

// skapa ett inlägg
async function createPost(event: Event): Promise<void> {
  event.preventDefault();

  const postTitle = (document.getElementById("postTitle") as HTMLInputElement)?.value;
  const postContent = (document.getElementById("postContent") as HTMLTextAreaElement)?.value;

  if (postTitle && postContent) {
    try {
      // Skicka det nya inlägget till Firebase
      await post({ postTitle, postContent });
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

      for (const postId in posts.forum1[0].posts) {
        const post = posts.forum1[0].posts[postId];

        if (post) {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postTitle = post.postTitle;
          const postContent = post.postContent;

          postElement.innerHTML = `
            <div id="postsList"><div>
              <img src=""/>
              <h4 id="userID">${postId}</h4>
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