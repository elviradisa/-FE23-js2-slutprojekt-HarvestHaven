import { postNewUser } from "./fetch.ts";

type NewUser = {
    username: string,
    password: string,
    userImage: HTMLDivElement
}

const signUpForm = document.querySelector('#signup-form') as HTMLFormElement;
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const chickenImg = document.querySelector('.chick-profile') as HTMLDivElement;
    const cowImg = document.querySelector('.cow-profile') as HTMLDivElement;
    const pigImg = document.querySelector('.pig-profile') as HTMLDivElement;

    const userInput = document.querySelector('#createUsername-form') as HTMLInputElement;
    const passwordInput = document.querySelector('#createPassword-form') as HTMLInputElement;

    const userInputValue = userInput.value;
    console.log(userInputValue)
    const passwordInputValue = passwordInput.value;
    console.log(passwordInputValue)

    const newUser: NewUser = {
        username: userInputValue,
        password: passwordInputValue,
        userImage: chickenImg || cowImg || pigImg
    }

    let SignUpSuccessful = false;
    const createNewUser = await postNewUser(newUser);
    console.log(newUser)
    window.location.href = "http://localhost:1234/trading.html";

    signUpForm.reset();
});

async function createNewUser(newUser: NewUser) {
    console.log('hej')
}