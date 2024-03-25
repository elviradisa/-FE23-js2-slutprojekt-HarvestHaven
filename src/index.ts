import { get, post, deletePost, deleteAccount, getCommentsInProfile } from "./modules/fetch.ts";
import { displayCommentsInProfile } from "./modules/profileView.ts";
import { Comment } from "./modules/profileView.ts"


let userId = 'id för varje användare'

getCommentsInProfile(userId).then(displayCommentsInProfile)

// getComments().then( (data)=>{
//     displayComments(data, '13213')
// } )