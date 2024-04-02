import { getLoginUser } from "./fetch";

type LoginUser = {
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
                break;
            }
        }
    }

    if (loginSuccessful) {
        console.log('Successful login!');
    } else {
        console.log('Login failed');
    }
    loginFormEvent.reset();
})
