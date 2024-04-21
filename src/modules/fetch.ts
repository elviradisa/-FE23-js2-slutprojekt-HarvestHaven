const baseUrl = "https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/"

const header = {
    "Content-type": "application/json; charset=UTF-8"
}

async function get() {
    const URL = baseUrl + '.json';

    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(URL, options);
    const info = await response.json();
    console.log(info)
    return info;
}

async function getpostsFromUsers(forum: string) {
    const URL = baseUrl + `${forum}/0/posts/.json`;

    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(URL, options);
    const info = await response.json();
    // console.log(info)
    return info;
}

async function getLoginUser() {
    const URL = baseUrl + 'AllUsers/.json'

    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(URL, options);
    const data = await response.json();
    console.log(data);
    return data;
}

async function getYourUser(userId: string) {
    const URL = baseUrl + `AllUsers/${userId}.json`

    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(URL, options);
    const data = await response.json();
    console.log(data);
    return data;
}

async function postNewUser(newUser: any) {
    const url = baseUrl + 'AllUsers/.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: header
    }

    const response = await fetch(url, options);
    const info = await response.json();
    console.log(info);
    return info;

}

async function allUsers(): Promise<any> {
    const url = 'https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/AllUsers.json';

    const options = {
        method: 'GET',
        headers: header
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

async function postForum1(postData: any) {
    const URL = baseUrl + 'forum1/0/posts.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: header
    }

    const response = await fetch(URL, options);
    const info = await response.json();
    console.log(info)
    return info;
}

async function postCommentForum1(comment: object, postId: string) {
    const URL = baseUrl + `forum1/0/comments/${postId}/allCommentId.json`;

    const options = {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: header
    }


    const response = await fetch(URL, options);
    const info = await response.json();
    console.log(info)
    return info;
}
// async function getCommentsFromForum(forum: string, postId: string) {
//     const URL = baseUrl + `${forum}/0/comments/${postId}.json`;

//     const options = {
//         method: 'GET',
//         headers: header
//     }

//     const response = await fetch(URL, options);
//     const info = await response.json();
//     console.log(info)
//     return info;
// }

async function postForum2(postData: any) {
    const URL = baseUrl + 'forum2/0/posts.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: header
    }

    const response = await fetch(URL, options);
    const info = await response.json();
    console.log(info)
    return info;
}

async function postForum3(postData: any) {
    const URL = baseUrl + 'forum3/0/posts.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: header
    }

    const response = await fetch(URL, options);
    const info = await response.json();
    console.log(info)
    return info;
}

async function deletePost(postId: string, forum: string) {
    const commentURL = baseUrl + `${forum}/0/posts/${postId}.json`;

    const options = {
        method: 'DELETE',
        body: JSON.stringify(postId),
    }

    const response = await fetch(commentURL, options);
    const info = await response.json();
}

async function deleteAccount(userId: string) {
    const commentURL = baseUrl + `AllUsers/${userId}.json`;

    const options = {
        method: 'DELETE'
    }

    const response = await fetch(commentURL, options);
    const info = await response.json();
    console.log(info)
}

async function getCommentsInProfile(userId: string, commentId: string, commentContent: string) {
    const url = baseUrl + `AllUsers/${userId}/comments/${commentId}/${commentContent}.json`;
    // const url = baseUrl + `AllUsers/-NtVjmivseXUbEYBwlrL/comments.json`;

    const options = {
        method: 'GET',
        headers: header
    }
    console.log("Fetching comments for user with ID:", userId);
    console.log("URL:", url);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        if (data) {
            // Konvertera datan till en array av kommentarer
            const comments: Comment[] = Object.values(data);
            return comments;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export { get, getpostsFromUsers, getLoginUser, getYourUser, postNewUser, allUsers, postForum1, postForum2, postForum3, postCommentForum1, deletePost, deleteAccount, getCommentsInProfile }

