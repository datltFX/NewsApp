'use strict';
//10. (Nâng cao) Tìm kiếm bài viết theo từ khóa
const newsContainer = document.getElementById('news-container');
const navPageNum = document.getElementById('nav-page-num');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const searchBtn = document.getElementById('btn-submit');
const inputSearch = document.getElementById('input-query');

//hàm báo lỗi
const renderError = function (message) {
    newsContainer.insertAdjacentText("beforeend", message);
};

//hàm tạo element bản tin
const renderNews = function (newsData) {
    newsContainer.innerHTML = "";
    newsData.articles.forEach((news) => {
        const html =
            `<div class="card flex-row flex-wrap">
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
    </div>`
        newsContainer.insertAdjacentHTML("beforeend", html);
    });
};

let totalResults
let pageLimit = ""; //tong so trang hien thi
let keyword = "";
let page = "";
//lấy data setting từ classUser
const pageSize = currentUser.pageSize || 5;
const apiKey = "1332ec5fb9864069b2a45c81a9c7d53e";
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
const searchNews = async function (keyword, pageSize, page, apiKey) {
    try {
        const resSearchNews = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);

        if (!resSearchNews.ok) throw new Error('Problem getting news data!');

        const dataSearchNews = await resSearchNews.json();
        console.log(dataSearchNews);
        renderNews(dataSearchNews);


        totalResults = dataSearchNews.totalResults;
        if (totalResults == 0) {
            navPageNum.classList.add("hidden");
            throw new Error('Could not be found in any documents!')
        }
        //tính số page hiển thị -%-phép tính lấy dư
        if (totalResults % pageSize) { pageLimit = Math.floor(totalResults / pageSize) + 1; }
        else { pageLimit = totalResults / pageSize; }

        //xử lý nút Next khi pageLimit=1
        if (pageLimit === 1) {
            nextBtn.classList.add("hidden");
        }
        //xử lý nút Next khi pageLimit>1
        if (pageLimit > 1) {
            nextBtn.classList.remove("hidden");
        }
        //xử lý nút Next khi page=pageLimit
        if (page === pageLimit) { nextBtn.classList.add('hidden'); }

        console.log(`page limit:${pageLimit}`);
    } catch (err) {
        console.error(`${err}`);
        renderError(`Something went wrong: ${err.message}`);
    }
};

//1.1 không hiển thị các nút chọn trang khi chưa search
navPageNum.classList.add("hidden");

if (currentUser.username) {
    //Xử lý sự kiện search
    searchBtn.addEventListener('click', function () {
        page = 1;
        newsContainer.innerHTML = "";
        if (inputSearch.value === "") {
            alert("Please input keyword!");
        } else {
            keyword = inputSearch.value;
            navPageNum.classList.remove("hidden");
            // hiển thị trang
            searchNews(keyword, pageSize, page, apiKey);
            //hiển thị các nút khi serach
            prevBtn.classList.add("hidden")
            pageNum.innerText = page;
        };
    });
    //2. Sự kiện nút prev;next
    //2.1.Sự kiện Next
    nextBtn.addEventListener('click', function () {
        prevBtn.classList.remove('hidden');
        if (page < pageLimit) {
            page++;
            pageNum.innerText = page;
        }
        //hiển thị news tương ứng
        searchNews(keyword, pageSize, page, apiKey);
        //hết page hiển thị:Ẩn Next
        if (page === pageLimit) { nextBtn.classList.add('hidden'); }
    })

    //2.2.Sự kiện Prev
    prevBtn.addEventListener('click', function () {
        nextBtn.classList.remove('hidden');
        if (page > 1) {
            page--;
            pageNum.innerText = page;
        }
        //hiển thị news tương ứng
        searchNews(keyword, pageSize, page, apiKey);
        //Trang1:Ẩn Prev
        if (page === 1) { prevBtn.classList.add('hidden'); }

    });
};