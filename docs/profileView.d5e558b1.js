var e=globalThis,r={},t={},o=e.parcelRequirefc52;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var o=t[e];delete t[e];var n={id:e,exports:{}};return r[e]=n,o.call(n.exports,n,n.exports),n.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){t[e]=r},e.parcelRequirefc52=o),o.register;var n=o("1ahZW");document.querySelector(".deleteAccountButton").addEventListener("click",async()=>{let e=(console.log("delete"),localStorage.getItem("userId"));e?(await (0,n.deleteAccount)(e),window.location.href="./home.ts"):console.log("Error removing task")});
//# sourceMappingURL=profileView.d5e558b1.js.map