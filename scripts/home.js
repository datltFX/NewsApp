'use strict'

const loginModal = document.getElementById('login-modal');
const logoutMainContent = document.getElementById('main-content');
const welcome = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

//hiển thị chào mừng CurrentUser
console.log(currentUser);
if (currentUser.username) {
    loginModal.innerHTML = "";
    welcome.innerHTML = `Welcome ${currentUser.firstname}`;
} else {
    logoutMainContent.innerHTML = "";
}

//Sự kiện logout
logoutBtn.addEventListener('click', function () {
    //xóa current user sau logout
    deleteItem('currentUserActive');
    window.location.href = "../pages/login.html";
})