
'use strict'
//6. Hiển thị các bài viết
const newsContainer = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

//hàm báo lỗi
const renderError = function (message) {
    newsContainer.insertAdjacentText("beforeend", message);
};

//hàm tạo element bản tin
const renderNews = function (newsData) {
    newsContainer.innerHTML = "";
    newsData.articles.forEach(function (news) {
        const html = `
        <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="max-width:100%;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src=${news.urlToImage}
                        class="card-img"
                        alt="Photo">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.description}</p>
                        <a href=${news.url} target="_blank" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        newsContainer.insertAdjacentHTML("beforeend", html);
    });
};

let totalResults
let pageLimit; //tổng số trang hiển thị
let page = 1;
const country = "us";

//lấy data setting từ classUser
const category = currentUser.category || 'General';
const pageSize = currentUser.pageSize || 5;

const apiKey = "6eab18f380ef46a5a7cc50044af5f96b";
//"fc35919017154287a67c76b1a5825373";
//"6eab18f380ef46a5a7cc50044af5f96b"
//"1332ec5fb9864069b2a45c81a9c7d53e"
//"8b1b3c1bbda94011abf107e3ef0d3ca7"
//"75e2657cbdf64e45b77e27e8a6a86a11"
//"469a274465ae4c8e8a3e64eac72ed8c7"
//"ee8796817b5e4bc09c278b467a924206"
//"d32a9d321d144f5bb98fa91618af9797"
//"19718e50b69a4717ae10de68286cfb0d"
//"b45f738b9170486698bd716ab3a8d56e"

//tạo hàm lấy data từ API
const getNews = async function (country, category, pageSize, page, apiKey) {
    try {
        const resNews = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);

        if (!resNews.ok) throw new Error('Problem getting news data!');

        const dataNews = await resNews.json();
        console.log(dataNews);
        renderNews(dataNews);

        totalResults = dataNews.totalResults;
        //tính số page hiển thị (%: phép tính lấy dư)
        if (totalResults % pageSize) { pageLimit = Math.floor(totalResults / pageSize) + 1; }
        else { pageLimit = totalResults / pageSize; }
        console.log(`page limit:${pageLimit}`);
    } catch (err) {
        console.error(`${err}`);
        renderError(`Something went wrong: ${err.message}`);
    }
};
//Xử lý giao diện
//1.1 chưa đăng nhập khhông hiển thị các nút chọn trang
if (!currentUser.username) {
    nextBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    pageNum.classList.add("hidden");
} else {
    //2.2. đăng nhập hiển thị trang đầu tiên
    pageNum.innerText = page;
    //hiển thị news tương ứng
    getNews(country, category, pageSize, page, apiKey);
    //xử lý nút Prev
    if (page === 1) { prevBtn.classList.add("hidden"); }
    //xử lý nút Next
    if (pageLimit === 1) { nextBtn.classList.add("hidden"); }
}

//Sự kiện Next
nextBtn.addEventListener('click', function () {
    prevBtn.classList.remove('hidden');
    if (page < pageLimit) {
        page++;
        pageNum.innerText = page;
    }
    //hiển thị news tương ứng
    getNews(country, category, pageSize, page, apiKey);
    //hết page hiển thị:Ẩn Next
    if (page === pageLimit) { nextBtn.classList.add('hidden'); }
})

//Sự kiện Prev
prevBtn.addEventListener('click', function () {
    nextBtn.classList.remove('hidden');
    if (page > 1) {
        page--;
        pageNum.innerText = page;
    }
    //hiển thị news tương ứng
    getNews(country, category, pageSize, page, apiKey);
    //Trang1:Ẩn Prev
    if (page === 1) { prevBtn.classList.add('hidden'); }
});
