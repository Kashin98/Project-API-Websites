// getting  Elements
const btn = document.querySelector(".btn");
const name = document.getElementById("name");
const age = document.getElementById("age");
const address = document.getElementById("location");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const img = document.querySelector("img");
const randomUser = document.querySelector(".card-container");

// API Get Call using FETCH API
btn.addEventListener("click", function () {
  fetch("https://randomuser.me/api/")
    .then((data) => data.json())
    .then((data) => displayPerson(data))
    .catch((error) => console.log(error));
});

function displayPerson(data) {
  const {
    email,
    phone,
    picture: { large },
    dob: { age },
    name: { first, last },
    location: { city, country },
  } = data.results[0];
  randomUser.innerHTML = `
      <img class="img-container" src="${large}" alt="" />
      <article class="details">
        <h3 class="card-data">Name: <span id="name">${first} ${last}</span></h3>
        <h3 class="card-data">
          Age: <span id="age">${age}</span>
        </h3>
        <h3 class="card-data">
          Location: <span id="location">${city}, ${country}</span>
        </h3>
        <h3 class="card-data">Email: <span id="email">${email}</span></h3>
        <h3 class="card-data">Phone: <span id="phone">${phone}</span></h3>
      </article>
      `;
}
