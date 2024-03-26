import { post } from "./fetch.ts";

 // Hämta knappen för att besöka profilen
const visitProfileBtn = document.getElementById('visitProfileBtn') as HTMLButtonElement;

// Lägg till händelselyssnare för klickhändelse på knappen
visitProfileBtn.addEventListener('click', () => {
  // Ersätt "profile.html" med sökvägen till sidan som representerar profilen
  window.location.href = "http://localhost:1234/index.html";
});

// Funktion för att skapa ett inlägg
async function createPost(event: Event): Promise<void> {
  event.preventDefault();

  const postTitle = (document.getElementById("postTitle") as HTMLInputElement)
    ?.value;
  const postContent = (
    document.getElementById("postContent") as HTMLTextAreaElement
  )?.value;

  if (postTitle && postContent) {
    try {
      // Skicka det nya inlägget till Firebase
      await post({ postTitle, postContent });
      // Återställ formuläret
      (document.getElementById("postTitle") as HTMLInputElement).value = "";
      (document.getElementById("postContent") as HTMLTextAreaElement).value =
        "";
      // Ger en uppdaterad lista
      updatePostList();
    } catch (error) {
      console.error("Error creating post:", error);
    }

    console.log(postTitle);
    console.log(postContent);
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
            <div>
              <button onclick="commentOnPost('${postTitle}')">Kommentera</button></div>`;

          postsList.appendChild(postElement);
          console.log(postId);
          console.log(post);
          console.log(postTitle);
          console.log(postContent);
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

// Funktion för att kommentera på ett inlägg
// function commentOnPost(postTitle: string): void {
//   const comment = prompt('Skriv din kommentar:');
//   if (comment) {
//       // Lägg till kommentaren i JSON-data eller skicka till Firebase beroende på implementation
//       alert(`Kommentar på inlägg "${postTitle}": ${comment}`);
//   }
// }


// Funktion för att hämta inlägg från Firebase
async function getPosts(): Promise<any> {
  const response = await fetch(
    "https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  const data = await response.json();
  return data;
}
