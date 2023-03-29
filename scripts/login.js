"use strict";
const subBtn = document.getElementById("btn-submit");
const userInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

//xu ly su kien Login
subBtn.addEventListener("click", function () {
  //Xác thực dữ liệu nhập đầu vào
  function validate() {
    let checkLogin = true;
    if (userInput.value === "") {
      alert("Please input Username!");
      checkLogin = false;
    }
    if (passwordInput.value === "") {
      alert("Please imput password!");
      checkLogin = false;
    }
    return checkLogin;
  }
  const validated = validate();
  if (validated) {
    //tìm kiếm thông tin đăng nhập CurrentUser trong UserAray
    const currentUser = userArr.find(
      (user) =>
        user.username === userInput.value &&
        user.password === passwordInput.value
    );
    if (currentUser) {
      alert("Login Success!");
      console.log(currentUser);
      saveToStorage("currentUserActive", currentUser);
      //về trang home
      window.location.href = "../index.html";
    } else {
    }
  }
});

// for (let i = 0; i < userArr.length; i++) {
//     //kiểm tra user có trong danh sách đăng kí chưa??
//     if (userInput.value === userArr[i].username && passwordInput.value === userArr[i].password) {
//         currentUser = userArr[i];
//         alert('Login Success!');
//         break;
//     } else {
//         alert("User doesn't exist");
//         break;
//     }
// }
// if (userInput.value !== userArr[i].username) {}
// if (passwordInput.value !== user.password) {
//     alert("Password is wrong");
// }

// //kiểm tra user có trong danh sách đăng kí chưa??
// const user = checkUser();
// if (!user) {
//     alert("User doesn't exist");
// } else if (passwordInput.value !== user.password) {
//     alert("Password is wrong");
// } else {
//     alert('Success!')
//         saveToStorage("currentUserActive", user);
//     window.location.href = '../index.html';
// }

// function checkUser() {
//     for (let i = 0; i < userArr.length; i++) {
//         if (userInput.value === userArr[i].username && passwordInput.value === userArr[i].password) {
//             return userArr[i];
//         }
//         else {
//             return null;
//         }
//     }
// };
