import { getLoginUser } from "./fetch";
import { errorMessage } from "./error";


type LoginUser = {
    firebaseID?: string,
    username: string,
    password: string
}

const loginFormEvent = document.querySelector('#login-form') as HTMLFormElement;
loginFormEvent.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.querySelector('#username-form') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-form') as HTMLInputElement;

    const userValue = userInput.value;
    const passwordValue = passwordInput.value;
    console.log(userValue);
    console.log(passwordValue);

    if (!userValue || !passwordValue) {
        errorMessage('Please fill out both username and password!');
        loginFormEvent.reset();
        return;
    }

    const loginUser: LoginUser = {
        username: userValue,
        password: passwordValue
    }

    console.log(loginUser);

    let loginSuccessful = false;
    const users = await getLoginUser();

    if (users) {
        for (let userId in users) {
            const user = users[userId];
            if (user.username === userValue && user.password === passwordValue) {
                loginSuccessful = true;
                console.log(user)
                localStorage.setItem('userId', userId);
                break;
            }
        }
    }

    if (loginSuccessful) {
        console.log('Successful login!');

        window.location.href = `http://localhost:1234/shop.html`;

    } else {
        console.log('Login failed');
    }
    loginFormEvent.reset();
})
