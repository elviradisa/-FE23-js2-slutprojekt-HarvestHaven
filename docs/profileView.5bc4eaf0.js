function e(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}var t=globalThis,o={},r={},n=t.parcelRequirefc52;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequirefc52=n);var s=n.register;s("27Lyk",function(t,o){e(t.exports,"register",()=>r,e=>r=e);var r,n=new Map;r=function(e,t){for(var o=0;o<t.length-1;o+=2)n.set(t[o],{baseUrl:e,path:t[o+1]})}}),s("1ahZW",function(t,o){e(t.exports,"getpostsFromUsers",()=>s),e(t.exports,"getLoginUser",()=>a),e(t.exports,"getYourUser",()=>i),e(t.exports,"postNewUser",()=>c),e(t.exports,"allUsers",()=>l),e(t.exports,"postForum1",()=>u),e(t.exports,"postCommentForum1",()=>d),e(t.exports,"postForum2",()=>p),e(t.exports,"postForum3",()=>f),e(t.exports,"deleteAccount",()=>m);let r="https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/",n={"Content-type":"application/json; charset=UTF-8"};async function s(e){let t=r+`${e}/0/posts/.json`,o=await fetch(t,{method:"GET",headers:n});return await o.json()}async function a(){let e=await fetch(r+"AllUsers/.json",{method:"GET",headers:n}),t=await e.json();return console.log(t),t}async function i(e){let t=r+`AllUsers/${e}.json`,o=await fetch(t,{method:"GET",headers:n}),s=await o.json();return console.log(s),s}async function c(e){let t={method:"POST",body:JSON.stringify(e),headers:n},o=await fetch(r+"AllUsers/.json",t),s=await o.json();return console.log(s),s}async function l(){try{let e=await fetch("https://slutprojekt-js2-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/AllUsers.json");return await e.json()}catch(e){throw console.error("Error fetching all users:",e),e}}async function u(e){let t={method:"POST",body:JSON.stringify(e),headers:n},o=await fetch(r+"forum1/0/posts.json",t),s=await o.json();return console.log(s),s}async function d(e,t){let o=r+`forum1/0/comments/${t}/allCommentId.json`,s={method:"POST",body:JSON.stringify(e),headers:n},a=await fetch(o,s),i=await a.json();return console.log(i),i}async function p(e){let t={method:"POST",body:JSON.stringify(e),headers:n},o=await fetch(r+"forum2/0/posts.json",t),s=await o.json();return console.log(s),s}async function f(e){let t={method:"POST",body:JSON.stringify(e),headers:n},o=await fetch(r+"forum3/0/posts.json",t),s=await o.json();return console.log(s),s}async function m(e){let t=r+`AllUsers/${e}.json`,o=await fetch(t,{method:"DELETE"});console.log(await o.json())}}),s("2DCO9",function(t,o){e(t.exports,"createAndAppend",()=>r);function r(e,t,o){let r=document.createElement(t);return"div"!=t&&"img"!=t&&(r.innerText=o),e.append(r),r}}),s("j2nI3",function(e,t){e.exports=new URL("pig.259b56e2.jpeg",import.meta.url).toString()}),s("9SEX7",function(e,t){e.exports=new URL("cow.5e4743a9.jpeg",import.meta.url).toString()}),s("hC4Lz",function(e,t){e.exports=new URL("chick.fc389aad.jpeg",import.meta.url).toString()}),n("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["X8CdH","profileView.5bc4eaf0.js","jHcLR","pig.259b56e2.jpeg","4pF8D","cow.5e4743a9.jpeg","80Qni","chick.fc389aad.jpeg"]'));var a=n("1ahZW"),i=n("2DCO9");const c=localStorage.getItem("userId");async function l(){try{console.log("Filling user dropdown...");let e=await (0,a.allUsers)(),t=document.getElementById("userDropdown");if(t)for(let o in t.innerHTML="",e){let r=e[o].username,n=document.createElement("option");n.value=o,n.textContent=r,t.appendChild(n)}console.log("User dropdown filled successfully.")}catch(e){console.error("Error filling user dropdown:",e)}}console.log(c),(0,a.getYourUser)(c).then(e=>{let t=document.querySelector(".username"),o=document.querySelector(".myAccountUsername");t.textContent=e.username,o.textContent=e.username;let r=document.getElementById("profilePicture"),s=document.getElementById("profilePicturex2");if("pig"==e.userImage){let e=new URL(n("j2nI3"));r.src=e.toString(),s.src=e.toString()}else if("cow"==e.userImage){let e=new URL(n("9SEX7"));r.src=e.toString(),s.src=e.toString()}else{let e=new URL(n("hC4Lz"));r.src=e.toString(),s.src=e.toString()}d(c,"forum1"),d(c,"forum2"),d(c,"forum3")});const u=document.getElementById("userDropdown");async function d(e,t){let o;let r=await (0,a.getpostsFromUsers)(t);for(o in r){var n=r[o];n.userID===c&&p(o,n.postContent)}}async function p(e,t){let o=document.querySelector(".latestComments"),r=(0,i.createAndAppend)(o,"div"," ");r.id=e,(0,i.createAndAppend)(r,"p",t),localStorage.setItem("postId",e)}u&&u.addEventListener("change",e=>{let t=e.target.value;t&&(window.location.href="./visitprofile.html?userId="+t,localStorage.setItem("selectedUserId",t))}),l();
//# sourceMappingURL=profileView.5bc4eaf0.js.map
