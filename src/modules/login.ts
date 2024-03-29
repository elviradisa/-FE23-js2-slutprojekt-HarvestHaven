import { get } from "./fetch";

const loginFormEvent = document.querySelector('#login-form') as HTMLElement;
loginFormEvent.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.querySelector('#username-form') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-form') as HTMLInputElement;
    const userValue = userInput.value;
    const passwordValue = passwordInput.value;
    console.log(userValue);
    console.log(passwordValue);

    let loginSuccessful = false;
    const users = await get();
    console.log(users);

    for (const userId in users.AllUsers) {
        const user = users.AllUsers[userId];
        if (user.username === userValue && user.password === passwordValue) {
            loginSuccessful = true;
        }
    }

    if (loginSuccessful) {
        console.log('Successful login!');
    } else {
        console.log('Login failed');
    }
})

// async function getUsers() {
//     const URL =  baseUrl + 'AllUsers/.json'

//     const options = {
//         method: 'GET',
//         headers: header
//     }

//     const response = await fetch(URL, options);
//     const data = await response.json();   
//     console.log(data);
//     return data;
// }