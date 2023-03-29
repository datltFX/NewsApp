'use strict'
//9. Thay đổi thiết lập
const pageSizeSetting = document.getElementById('input-page-size');
const categorySetting = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');

saveBtn.addEventListener('click', function () {
    //xác nhận thông tin
    function validate() {
        let checkSetting = true;
        if (!currentUser.username) {
            alert('Login???')
            pageSizeSetting.value = ""
            categorySetting.value = "General"
            checkSetting = false;
        } else {
            if (pageSizeSetting.value === "") {
                alert('News per page???');
                checkSetting = false;
            }
            if (categorySetting.value === "") {
                alert('Category???');
                checkSetting = false;
            }
            return checkSetting;
        }
    }
    const validated = validate()
    if (validated) {
        //cập nhập thuộc tính cho currentUser
        currentUser.pageSize = Number(pageSizeSetting.value);
        currentUser.category = categorySetting.value;
        saveToStorage('currentUserActive', currentUser);

        //cập nhập lại mảng userArr
        const index = userArr.findIndex((user) => user.username === currentUser.username);
        userArr[index] = currentUser;
        saveToStorage('USER_ARRAY', userArr);

        //reset form
        pageSizeSetting.value = '';
        categorySetting.value = "General"
    }
});