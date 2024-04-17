import { deleteAccount } from "./fetch";
// import { getUserId } from "./login"
function getUserId() {
    console.log('delete');
    return localStorage.getItem('userId');
}

const deleteAccountBtn = document.querySelector('.deleteAccountButton') as HTMLButtonElement;
deleteAccountBtn.addEventListener('click', async () => {
    const userId = getUserId();
    if (userId) {
        await deleteAccount(userId);
        window.location.href = "./home.ts";
    } else {
        console.log('Error removing task')
    }
})