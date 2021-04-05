//get elements
const imgBtn = document.querySelector(".imgBtn");
const infoCard = document.querySelector(".infoCard");
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

const url = "https://6059bdfbb11aba001745cc14.mockapi.io/items";

// Img Info Card JS
imgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  infoCard.classList.toggle("showInfoCard");
});

// Submit Items
httpForm.addEventListener("submit", submitItem);

function submitItem(event) {
  event.preventDefault();
  if (itemInput.value === "" || imageInput.value === "") {
    feedback.textContent = "Please enter valid values";
    feedback.classList.add("showItem");
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  } else {
    postItems(itemInput.value, imageInput.value);
    imageInput.value = "";
    itemInput.value = "";
  }
}

// Load Items
document.addEventListener("DOMContentLoaded", function () {
  getItems(showItems);
});

// Get Items
function getItems(cb) {
  const ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);

  ajax.onload = function () {
    if (this.status == 200) {
      const data = JSON.parse(this.responseText);
      cb(data);
    }
  };

  ajax.onerror = () => {
    console.log("There's an error");
  };

  ajax.send();
}

// Show Items
function showItems(data) {
  let info = "";
  data.forEach(function (item) {
    const { id, avatar, name } = item;
    info += `
    <li
      class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2"
    >
      <img
        src="${avatar}"
        id="itemImage"
        class="itemImage img-thumbnail"
        alt=""
      />
      <h6 id="itemName" class="text-capitalize itemName">
        ${name}
      </h6>
      <div class="icons">
        <a href="#" class="itemIcon mx-2 edit-icon" data-id="${id}">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="itemIcon mx-2 delete-icon" data-id="${id}">
          <i class="fas fa-trash"></i>
        </a>
      </div>
    </li>
    `;
  });
  itemList.innerHTML = info;
  iconItems(id);
}

// Post Items
function postItems(nameValue, imgValue) {
  const ajax = new XMLHttpRequest();
  const avatar = `img/${imgValue}.jpeg`;
  ajax.open("POST", url, true);

  ajax.onload = function () {
    getItems(showItems);
  };

  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajax.onerror = () => {
    console.log("there was an error posting");
  };

  ajax.send(`avatar= ${avatar}&name= ${nameValue}`);
}

// Show Items
function showItems(data) {
  let info = "";
  data.forEach((item) => {
    const { id, avatar, name } = item;
    info += `
    <li
    class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
      <img
        src="${avatar}"
        id="itemImage"
        class="itemImage img-thumbnail"
        alt=""
      />
      <h6 id="itemName" class="text-capitalize itemName">
        ${name}
      </h6>
      <div class="icons">
        <a href="#" class="itemIcon mx-2 edit-icon" data-id="${id}">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="itemIcon mx-2 delete-icon" data-id="${id}">
          <i class="fas fa-trash"></i>
        </a>
      </div>
    </li>`;
  });
  itemList.innerHTML = info;
  // Add icon functionality
  iconItems();
}

// Delete and Edit
function iconItems() {
  const deleteItem = document.querySelectorAll(".delete-icon");
  const editItem = document.querySelectorAll(".edit-icon");

  deleteItem.forEach(function (item) {
    const itemName = item.dataset.id;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      deleteItemAPI(itemName);
    });
  });

  editItem.forEach((item) => {
    const itemID = item.dataset.id;
    const parent = item.parentElement.parentElement;
    const img = parent.querySelector(".itemImage").src;
    const name = parent.querySelector(".itemName").textContent;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      editItemUI(itemID, parent, img, name);
    });
  });
}

// Delete Item API
function deleteItemAPI(id) {
  const ajax = new XMLHttpRequest();

  ajax.open(
    "DELETE",
    `https://6059bdfbb11aba001745cc14.mockapi.io/items/${id}`,
    true
  );

  ajax.onload = function () {
    getItems(showItems);
  };

  ajax.onerror = () => {
    console.log("Error api Delete");
  };

  ajax.send();
}

// Edit Item UI
function editItemUI(itemID, parent, img, name) {
  const imgIndex = img.indexOf("img/");
  const jpegIndex = img.indexOf(".jpeg");

  // Adds data to input fields
  const itemImg = img.slice(imgIndex + 4, jpegIndex);
  imageInput.value = itemImg;
  itemInput.value = name.trim();

  // removes from DOM
  parent.remove();

  editedItemID = itemID;
  submtiBtn.textContent = "Edit Item";

  window.scrollTo(top, 0);

  httpForm.removeEventListener("submit", submitItem);
  httpForm.addEventListener("submit", editItemSubmit);
}

function editItemSubmit() {
  event.preventDefault();
  const id = editedItemID;
  if (itemInput.value.length === 0 || imageInput.value.length === 0) {
    feedback.textContent = "Please enter valid values";
    feedback.classList.add("showItem");
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  } else {
    const img = `img/${imageInput.value}.jpeg`;
    editItemAPI(img, itemInput.value, id);
  }
}
// Edit Item API
function editItemAPI(img, name, id) {
  const ajax = new XMLHttpRequest();

  ajax.open(
    "PUT",
    `https://6059bdfbb11aba001745cc14.mockapi.io/items/${id}`,
    true
  );

  ajax.onload = function () {
    getItems(showItems);
  };

  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  ajax.onerror = () => {
    console.log("there was an error: API PUT");
  };

  ajax.send(`avatar=${img}&name=${name}`);
  reverseForm();
}

// Removes EditItemApi Eventlistener and readds original eventListener
function reverseForm() {
  submtiBtn.textContent = "add Item";
  imageInput.value = "";
  itemInput.value = "";
  httpForm.removeEventListener("submit", editItemSubmit);
  httpForm.addEventListener("submit", submitItem);
}
