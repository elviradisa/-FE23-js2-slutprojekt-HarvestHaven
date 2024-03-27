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

    const userInput = document.querySelector('#username-form') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-form') as HTMLInputElement;

    const userInputValue = userInput.value;
    console.log(userInput)
    const passwordInputValue = passwordInput.value;
    console.log(passwordInputValue)

    let SignUpSuccessful = false;
    // const createNewUser = await postNewUser();

});

async function createNewUser(newUser: NewUser) {
    console.log('hej')
}

