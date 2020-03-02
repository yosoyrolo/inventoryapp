function init() {
  const firebaseConfig = {
    apiKey: "AIzaSyBwiFQwhanPBGmrFMlCcmA7b1GabsjuD5w",
    authDomain: "inventoryapp-6d0da.firebaseapp.com",
    databaseURL: "https://inventoryapp-6d0da.firebaseio.com",
    projectId: "inventoryapp-6d0da",
    storageBucket: "inventoryapp-6d0da.appspot.com",
    messagingSenderId: "39000688619",
    appId: "1:39000688619:web:67d342e2bd14c62b4e3bae",
    measurementId: "G-XNCHD1J00C"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.inventory = {
    page: null,
    data: null
  };

  fba.init();
  fba.sesion(sesionIn, sesionOut);

  fba.onError = function(error) {
    console.log(error);
  };
}

function sesionIn(a) {
  if (inventory.page) {
    goTo(inventory.page);
  } else {
    goTo("options");
  }
}

function sesionOut(a) {
  goTo("login");
}

async function loadPage(url) {
  const html = await fetch(url);
  const text = await html.text();
  document.body.innerHTML = text;
}

function goTo(page) {
  switch (page) {
    case "search":
      inventory.page = "search";
      loadPage("./search.html");
      break;
    case "login":
      inventory.page = null;
      loadPage("./login.html");
      break;

    case "additem":
      inventory.page = "additem";
      loadPage("./additem.html");
      break;

    case "categories":
      inventory.page = "categories";
      loadPage("./categories.html");
      break;

    case "settings":
      inventory.page = "settings";
      loadPage("./settings.html");
      break;
    default:
      inventory.page = "options";
      loadPage("./options.html");
  }
}

function login() {
  const email = document.querySelector("#emailInput").value;
  const pass = document.querySelector("#passInput").value;

  fba.signIn("email", email, pass, () => {});
}

function dropdown(item) {
  console.log(item.parentNode.querySelector("#Dropdown"));
  item.parentNode.querySelector("#Dropdown").classList.toggle("show");
}

function clickItem(item) {
  console.log(item);
  item.parentNode.parentNode.querySelector(".pill").innerText = item.innerText;
  item.parentNode.parentNode
    .querySelector("#Dropdown")
    .classList.toggle("show");
}

// Listen for all clicks on the document
document.addEventListener(
  "click",
  function(event) {
    // If the click happened inside the the container, bail
    if (!event.target.closest(".dropdown")) {
      console.log("click outside");

      let dropdowns = document.querySelectorAll(".dropdown");

      for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        dropdown.querySelector("#Dropdown").classList.remove("show");
      }
    }

    // Otherwise, run our code...
  },
  false
);
