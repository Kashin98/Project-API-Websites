//select elements

const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");
const test = document.querySelector(".test");
const url =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=";

// Just a reminder
test.addEventListener("click", (e) => {
  e.preventDefault();
  feedbackData("Search Something First ");
});

searchForm.addEventListener("submit", submitData);

// Submit and Get Data
function submitData() {
  event.preventDefault();
  if (search.value === "") {
    feedbackData();
  } else {
    fetch(`${url}${search.value}`)
      .then((data) => data.json())
      .then((data) => {
        displayData(data);
      })
      .catch((error) => {
        error;
      });
    search.value = "";
  }
}

// feedback
function feedbackData(string = "Empty Values") {
  feedback.textContent = string;
  feedback.classList.add("showItem");
  setTimeout(() => {
    feedback.classList.remove("showItem");
  }, 4000);
}

//display Data
function displayData(value) {
  let info = "";
  const results = value.query.search;
  results.forEach((item) => {
    const { title, snippet, pageid: link } = item;
    info += `
    <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card card-body infoCard">
        <h3 class="card-title blueText">${title}</h3>
        <p>
          ${snippet}
        </p>
        <a href="https://en.wikipedia.org/?curid=${link}" target="_blank" class="my-2 text-capitalize"
          >read more...</a
        >
      </div>
    </div>
    `;
  });
  output.innerHTML = info;
}
