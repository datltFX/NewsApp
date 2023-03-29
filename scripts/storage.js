'use strict'
//Hàm lưu data vào localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//Hàm lấy data từ localStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function deleteItem(key) {
    localStorage.removeItem(key);
}

//Lấy userArr từ Local
let userArr = getFromStorage("USER_ARRAY") || [];

//chuyển đổi Object sang Instance class
userArr = userArr.map((data) => parseUser(data));
console.log(userArr);

//lấy dữ liệu currentUser từ local
let currentUser = getFromStorage('currentUserActive') || [];

//chuyển đổi Object sang Instance class
currentUser = parseUser(currentUser);
console.log(currentUser);
