let videoCardContainer = document.getElementById("videos");
let searchLink = "https://www.googleapis.com/youtube/v3/search?";
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.getElementById("search-input");
let api_key = "AIzaSyDuJ7E2snKMlIqzxQU29aiijhTCntt8pIw";
let videos = [];
const pagination = {
  start: 0,
  maxItems: 3,
};
fetch(
  searchLink +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 15,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    videos = data.items;
    DisplayList(videos, videoCardContainer, rows, current_page);
    SetupPagination(videos, pagination_element, rows);
    console.log(videos);
  })

  .catch((err) => console.log(err));

const getChannel=function () {
  fetch(
    searchLink +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        chart: "mostPopular",
        maxResults: 15,
        regionCode: "IN",
        q: searchInput.value,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      videos = data.items;
      DisplayList(videos, videoCardContainer, rows, current_page);
      SetupPagination(videos, pagination_element, rows);
      console.log(videos);
    })

    .catch((err) => console.log(err));
}
searchBtn.addEventListener("click",getChannel);
// searchBtn.addEventListener("click", function () {
//   fetch(
//     searchLink +
//       new URLSearchParams({
//         key: api_key,
//         part: "snippet",
//         chart: "mostPopular",
//         maxResults: 15,
//         regionCode: "IN",
//         q: searchInput.value,
//       })
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       videos = data.items;
//       DisplayList(videos, videoCardContainer, rows, current_page);
//       SetupPagination(videos, pagination_element, rows);
//       console.log(videos);
//     })

//     .catch((err) => console.log(err));
// });
const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 3;

function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);
  // <img src="${paginatedItems[i].channelThumbnail}" class="channel-icon" alt="">
  // <img src="${paginatedItems[i].snippet.thumbnails.high.url}">
  // <div class="frames"><iframe width="300" height="300" src="https://www.youtube.com/embed/${paginatedItems[i].id.videoId}"></iframe></div>
  for (let i = 0; i < paginatedItems.length; i++) {
    wrapper.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${paginatedItems[i].id.videoId}'" >
        <div class="frames"><iframe width="300" height="300" src="https://www.youtube.com/embed/${paginatedItems[i].id.videoId}"></iframe></div>
        <div class="content">
            <div class="info">
                <h4 class="channel-name">${paginatedItems[i].snippet.channelTitle}</h4>
                <p class="title">${paginatedItems[i].snippet.title}</p>
            </div>
        </div>
    </div>
    `;
  }
}

function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, videoCardContainer, rows, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

