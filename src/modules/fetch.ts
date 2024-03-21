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

async function post(postData: any) {
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

export { get, post, deletePost, deleteAccount }