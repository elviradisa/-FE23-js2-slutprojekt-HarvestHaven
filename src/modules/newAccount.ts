import { postNewUser } from "./fetch";

type NewUser = {
    username: string,
    password: string,
    // userImage: string
    userImage: HTMLElement
}
const chooseProfilePicture = document.querySelector('.profile-images') as HTMLElement;
const chickenImg = document.querySelector('.chick-profile') as HTMLDivElement;
const cowImg = document.querySelector('.cow-profile') as HTMLDivElement;
const pigImg = document.querySelector('.pig-profile') as HTMLDivElement;

chooseProfilePicture.addEventListener('click', (event) => {

    if (event.target == chickenImg) {
        chickenImg.style.border = '3px solid rgb(115, 168, 115)';
        chickenImg.style.boxSizing = 'border-box';
        cowImg.style.border = 'none';
        pigImg.style.border = 'none';
        console.log('chicken')
    } else if (event.target == cowImg) {
        cowImg.style.border = '3px solid rgb(115, 168, 115)';
        cowImg.style.boxSizing = 'border-box';

        pigImg.style.border = 'none';
        chickenImg.style.border = 'none';

        console.log('cow')
        // newUser.userImage = cowImg;
    } else {
        console.log('pig');
        pigImg.style.border = '3px solid rgb(115, 168, 115)';
        pigImg.style.boxSizing = 'border-box';

        cowImg.style.border = 'none';
        chickenImg.style.border = 'none';
    }
    // newUser.userImage = pigImg;
    return event.target;
})

const signUpForm = document.querySelector('#signup-form') as HTMLFormElement;
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // const chooseProfilePicture = document.querySelector('.profile-images') as HTMLDivElement;
    // const chickenImg = document.querySelector('.chick-profile') as HTMLElement;
    // const cowImg = document.querySelector('.cow-profile') as HTMLDivElement;
    // const pigImg = document.querySelector('.pig-profile') as HTMLDivElement;

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

    console.log(newUser)

    let SignUpSuccessful = false;
    const createNewUser = await postNewUser(newUser);
    console.log(newUser)
    window.location.href = "http://localhost:1234/home.html";

    signUpForm.reset();
});

// const chickenImg = document.querySelector('.chick-profile') as HTMLElement;

// chickenImg.addEventListener('click', () => {

//     console.log('chicken')
//     // newUser.userImage = chickenImg;
// })


// cowImg.addEventListener('click', () => {
//     console.log('cow')
//     cowImg.style.border = "3px solid rgb(115, 168, 115)";


//     // newUser.userImage = cowImg;
// })

// pigImg.addEventListener('click', () => {
//     console.log('pig')
//     // newUser.userImage = pigImg;
// })

async function chooseProfileImg(target) {

}