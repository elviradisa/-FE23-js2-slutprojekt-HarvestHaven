const e=document.querySelector("#home"),l=document.querySelector("#login-form"),o=document.querySelector("#signup-form"),t=document.querySelector(".home-login-button"),n=document.querySelector(".home-signup-button"),s=document.querySelector(".signupPElement"),y=document.querySelector("#home-signup-form"),c=document.querySelector("#login-signup"),d=document.querySelector(".selected-pig"),u=document.querySelector(".selected-cow"),i=document.querySelector("#home-signup-input"),r=document.querySelector(".selected-chick"),p=document.querySelector("#createUsername-form");y.addEventListener("submit",l=>{l.preventDefault(),c.style.display="block",s.style.display="block",o.style.display="flex",e.style.display="none",console.log("get started");let t=i.value;p.value=t,y.reset(),console.log(t),console.log(p)}),t.addEventListener("click",()=>{r.style.display="none",u.style.display="none",d.style.display="none",c.style.display="block",l.style.display="flex",o.style.display="none",e.style.display="none",console.log("login page")}),n.addEventListener("click",()=>{r.style.display="none",u.style.display="none",d.style.display="none",c.style.display="block",s.style.display="block",o.style.display="flex",l.style.display="none",e.style.display="none",console.log("signup page")});
//# sourceMappingURL=index.fb6eb367.js.map