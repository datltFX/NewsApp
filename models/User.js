'use strict'
class User {
    constructor(firstname, lastname, username, password, pageSize, category) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        //bổ sung thuộc tính Setting cho User
        this.pageSize = pageSize;
        this.category = category;
    }
}

//chuyển  JS Object sang Class Instance
function parseUser(userData) {
    const user = new User(userData.firstname, userData.lastname, userData.username, userData.password, userData.pageSize, userData.category);
    return user;
}
