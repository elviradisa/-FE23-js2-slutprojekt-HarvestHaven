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

async function getYourUser(userID: any,) {
    const url = baseUrl + `AllUsers/${userID}/.json`

    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(url, options);
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
        method: 'DELETE',
        body: JSON.stringify(userId),
    }

    const response = await fetch(commentURL, options);
    const info = await response.json();
    console.log(info)
}

async function getCommentsInProfile(userId: string) {
    // const url = baseUrl + `AllUsers/${userId}/comments.json`;
    const url = baseUrl + `AllUsers/-NtVjmivseXUbEYBwlrL/comments.json`;
    const options = {
        method: 'GET',
        headers: header
    }

    const response = await fetch(url, options);
    const info = await response.json();
    console.log(info)
    return info;
}



// async function patch(patchData: any) {
//     const URL = baseUrl + 'forum1/0/posts.json';

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(postData),
//         headers: header
//     }

//     const response = await fetch(URL, options);
//     const info = await response.json();
//     console.log(info)
//     return info;
// }

export { get, getLoginUser, getYourUser, postNewUser, allUsers, postForum1, postForum2, postForum3, deletePost, deleteAccount, getCommentsInProfile }