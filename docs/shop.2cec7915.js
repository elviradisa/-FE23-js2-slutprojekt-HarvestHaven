function e(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var t=globalThis,o={},n={},r=t.parcelRequirefc52;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequirefc52=r);var s=r.register;s("27Lyk",function(t,o){e(t.exports,"register",()=>n,e=>n=e);var n,r=new Map;n=function(e,t){for(var o=0;o<t.length-1;o+=2)r.set(t[o],{baseUrl:e,path:t[o+1]})}}),s("1ahZW",function(t,o){e(t.exports,"getpostsFromUsers",()=>s),e(t.exports,"getLoginUser",()=>a),e(t.exports,"getYourUser",()=>l),e(t.exports,"postNewUser",()=>i),e(t.exports,"allUsers",()=>c),e(t.exports,"postForum1",()=>d),e(t.exports,"postCommentForum1",()=>m),e(t.exports,"postForum2",()=>u),e(t.exports,"postForum3",()=>p),e(t.exports,"deleteAccount",()=>f);let n="https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/",r={"Content-type":"application/json; charset=UTF-8"};async function s(e){let t=n+`${e}/0/posts/.json`,o=await fetch(t,{method:"GET",headers:r});return await o.json()}async function a(){let e=await fetch(n+"AllUsers/.json",{method:"GET",headers:r}),t=await e.json();return console.log(t),t}async function l(e){let t=n+`AllUsers/${e}.json`,o=await fetch(t,{method:"GET",headers:r}),s=await o.json();return console.log(s),s}async function i(e){let t={method:"POST",body:JSON.stringify(e),headers:r},o=await fetch(n+"AllUsers/.json",t),s=await o.json();return console.log(s),s}async function c(){try{let e=await fetch("https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/AllUsers.json");return await e.json()}catch(e){throw console.error("Error fetching all users:",e),e}}async function d(e){let t={method:"POST",body:JSON.stringify(e),headers:r},o=await fetch(n+"forum1/0/posts.json",t),s=await o.json();return console.log(s),s}async function m(e,t){let o=n+`forum1/0/comments/${t}/allCommentId.json`,s={method:"POST",body:JSON.stringify(e),headers:r},a=await fetch(o,s),l=await a.json();return console.log(l),l}async function u(e){let t={method:"POST",body:JSON.stringify(e),headers:r},o=await fetch(n+"forum2/0/posts.json",t),s=await o.json();return console.log(s),s}async function p(e){let t={method:"POST",body:JSON.stringify(e),headers:r},o=await fetch(n+"forum3/0/posts.json",t),s=await o.json();return console.log(s),s}async function f(e){let t=n+`AllUsers/${e}.json`,o=await fetch(t,{method:"DELETE"});console.log(await o.json())}}),s("j2nI3",function(e,t){e.exports=new URL("pig.259b56e2.jpeg",import.meta.url).toString()}),s("9SEX7",function(e,t){e.exports=new URL("cow.5e4743a9.jpeg",import.meta.url).toString()}),s("hC4Lz",function(e,t){e.exports=new URL("chick.fc389aad.jpeg",import.meta.url).toString()}),r("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["d4ORU","shop.2cec7915.js","jHcLR","pig.259b56e2.jpeg","4pF8D","cow.5e4743a9.jpeg","80Qni","chick.fc389aad.jpeg"]'));var a=r("1ahZW");const l=localStorage.getItem("userId");async function i(){try{let e=await (0,a.allUsers)(),t=document.getElementById("userDropdown");if(t)for(let o in t.innerHTML="",e){let n=e[o].username,r=document.createElement("option");r.value=o,r.textContent=n,t.appendChild(r)}console.log("User dropdown filled successfully.")}catch(e){console.error("Error filling user dropdown:",e)}}console.log(localStorage.getItem("profileImage")),console.log(l),(0,a.getYourUser)(l).then(e=>{document.querySelector(".username").textContent=e.username;let t=document.getElementById("profilePicture");if("pig"==e.userImage){let e=new URL(r("j2nI3"));t.src=e.toString()}else if("cow"==e.userImage){let e=new URL(r("9SEX7"));t.src=e.toString()}else{let e=new URL(r("hC4Lz"));t.src=e.toString()}});const c=document.getElementById("userDropdown");async function d(e){e.preventDefault();let t=document.getElementById("postTitle")?.value,o=document.getElementById("postContent")?.value;if(t&&o)try{let e=await (0,a.getYourUser)(l),n=e.username,r=e.userImage;console.log(r),await (0,a.postForum1)({userImage:r,userID:l,postTitle:t,postContent:o,username:n}),document.getElementById("postTitle").value="",document.getElementById("postContent").value="",u()}catch(e){console.error("Error creating post:",e)}}async function m(e,t){let o=(await (0,a.getYourUser)(l)).username;console.log(o);try{let n=document.createElement("div"),r=document.getElementById(`commentList_${e}`);if(n){let s=document.createElement("div");s.classList.add("comment"),(0,a.postCommentForum1)({postContent:t,postId:e,username:o,userId:l},e),s.innerHTML=`
        <div>
          <h6>Kommentar:</h6>

          <p>${t}</p>
        </div>`,console.log(r),console.log(e),console.log(t),n.appendChild(s),(await (0,a.getYourUser)(l)).username}else console.error(`Error: Could not find comment list for post ID ${e}`)}catch(e){console.error("Error creating comment:",e)}}async function u(){try{let e=await g(),t=document.getElementById("postsList");if(t)for(let o in t.innerHTML="",e.forum1[0].posts){let n=e.forum1[0].posts[o];if(n){let e=document.createElement("div");e.classList.add("post");let r=n.postTitle,s=n.postContent,l=n.userID,i=await (0,a.getYourUser)(l),c=i?i.username:"Unknown User";e.innerHTML=`
            <div class="post">
              <div>
                <h4 class="username">Posted by: ${c}</h4>
              </div>
              <div>
                <h5>${r}</h5>
                <p>${s}</p>
              </div>
              <form id="commentForm_${o}">
                <textarea id="commentInput_${o}" placeholder="Inneh\xe5ll"></textarea>
                <button class="commentBtn" data-post-id="${o}" data-post-title="${r}">Kommentera</button>
              </form>
              <div id="commentList_${o}"></div>
            </div>`,t.prepend(e);let d=await p(o);console.log(d);let u=e.querySelector(`#commentList_${o}`);u&&d&&d.forEach(e=>{let t=document.createElement("div");t.classList.add("comment"),t.innerHTML=`
                <div>
                  <h6>Kommentar av ${e.username}:</h6>
                  <p>${e.commentContent}</p>
                  <button class="deleteCommentBtn" data-comment-id="${e.commentId}">Delete</button>
                </div>`,u.appendChild(t)});let f=e.querySelector(".commentBtn");f.addEventListener("click",e=>{e.preventDefault();let t=f.dataset.postId?.toString(),o=f.dataset.postTitle;if(t&&o){let e=document.getElementById(`commentInput_${t}`),o=e.value.trim();o&&(m(t,o),e.value="")}else console.error("Error: Could not extract postId or postTitle from dataset")})}}}catch(e){console.error("Error updating post list:",e)}}async function p(e){console.log(e);try{let t=await fetch(`https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/forum1/0/comments/${e}.json`),o=await t.json();if(o)return Object.keys(o).map(e=>({commentId:e,...o[e]}));return[]}catch(e){return console.error("Error fetching comments for post:",e),[]}}c&&c.addEventListener("change",e=>{let t=e.target.value;t&&(window.location.href="./visitprofile.html?userId="+t,localStorage.setItem("selectedUserId",t))}),i();const f=document.getElementById("postForm");async function g(){let e=await fetch("https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/.json");return await e.json()}f&&f.addEventListener("submit",d),window.onload=u;
//# sourceMappingURL=shop.2cec7915.js.map
