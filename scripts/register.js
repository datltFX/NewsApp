'use strict'
//2. Chức năng Register
const submitBtn = document.getElementById('btn-submit');
const firstInput = document.getElementById('input-firstname');
const lastInput = document.getElementById('input-lastname');
const userInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmInput = document.getElementById('input-password-confirm');

//Xử lý sự kiện Register
submitBtn.addEventListener('click', function () {
    //
    const data = new User(firstInput.value, lastInput.value, userInput.value, passwordInput.value);

    let checkUser = true;
    function validateData() {
        //kiểm tra trùng username
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i].username === data.username) {
                window.alert("Username must unique!");
                checkUser = false;
                break;
            }
        }
        //Xác thực dữ liệu nhập đầu vào
        if (!data.firstname) {
            alert("Please input for firstname");
            checkUser = false;
        }
        if (!data.lastname) {
            alert("Please input for lastname");
            checkUser = false;
        }
        if (!data.username) {
            alert("Please input for username");
            checkUser = false;
        }
        if (!data.password) {
            alert("Please input for password");
            checkUser = false;
        }
        if (data.password.length <= 8) {
            alert("Password must be great than 8 characters");
            checkUser = false;
        }
        if (!confirmInput.value) {
            alert("Please input confirm password");
            checkUser = false;
        }
        if (data.password !== confirmInput.value) {
            alert('Confirmed password is wrong')
            checkUser = false;
        }
        return checkUser;
    };
    //console.log(validateData());
    const validate = validateData(data);
    if (validate) {
        userArr.push(data);
        saveToStorage('USER_ARRAY', userArr);//lưu mảng user vào LocalStrorage
        console.log(userArr);
        alert('Success!')
        window.location.href = '../pages/login.html';
    }
});

