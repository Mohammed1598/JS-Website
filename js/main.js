/*
 ****************
 ** Color Local Storage
 ****************
 */
let colorOption = localStorage.getItem("color_option");
if (colorOption !== null) {
  document.documentElement.style.setProperty("--main-color", colorOption);
  document.querySelectorAll(".colors li").forEach(element => {
    element.classList.remove("active");
    if (element.dataset.color == colorOption) {
      element.classList.add("active");
    }
  });
}

/*
 ****************
 ** Background Local Storage
 ****************
 */
let backgroundOption = true;
let backgroundInterval;

let backgroundLocalOption = localStorage.getItem("background_option");
if (backgroundLocalOption !== null) {
  document.querySelectorAll(".backgrounds span").forEach(element => {
    element.classList.remove("active");
  });
  if (backgroundLocalOption === "true") {
    document.querySelector(".backgrounds .yes").classList.add("active");
    backgroundOption = true;
  } else {
    document.querySelector(".backgrounds .no").classList.add("active");
    backgroundOption = false;
  }
}

/*
 ********************
 ** Toggle SettingBox
 ********************
 */
let settingIcon = document.querySelector(".toggle-spin .setting-icon");
let settingBox = document.querySelector(".setting-box");
settingIcon.addEventListener("click", function() {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("opened");
});

/*
 ************************
 ** Change Website Colors
 ************************
 */

let color = document.querySelectorAll(".setting-box .colors li");
color.forEach(li => {
  li.addEventListener("click", e => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
  });
});

/*
 ************************
 ** Change Website Background
 ************************
 */

let backgrounds = document.querySelectorAll(".backgrounds span");
backgrounds.forEach(background => {
  background.addEventListener("click", e => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImage();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
    handleActive(e);
  });
});

/*
 ***************************
 ** Random Background Images
 ***************************
 */

let landingPage = document.querySelector(".landing-page");
let images = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg"];
function randomizeImage() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(() => {
      let ramdomNumber = Math.floor(Math.random() * images.length);
      landingPage.style.backgroundImage = `url(images/${images[ramdomNumber]})`;
    }, 1000);
  }
}
randomizeImage();

/*
 ***************************
 ** Animated Progress
 ***************************
 */
let skill = document.querySelector(".skills");
window.onscroll = function() {
  let skillOffSetTop = skill.offsetTop;
  let skillOffSetHeight = skill.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffSetTop + skillOffSetHeight - windowHeight) {
    let progress = document.querySelectorAll(".skills .skill-progress span");
    progress.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/*
 ***************************
 ** Create Popup Image
 ***************************
 */

let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach(img => {
  img.addEventListener("click", e => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeSpan = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeSpan.appendChild(closeButtonText);
    closeSpan.className = "close-button";
    popupBox.appendChild(closeSpan);
    closeSpan.addEventListener("click", e => {
      e.target.parentNode.remove();
      document.querySelector(".popup-overlay").remove();
    });
  });
});

/*
 ***************************
 ** Navigastion Bullets & Links
 ***************************
 */

let bullets = document.querySelectorAll(".nav-bullets .bullet");
let links = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach(element => {
    element.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}
scrollToSection(bullets);
scrollToSection(links);

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

/*
 ***************************
 ** Toggle Nav Bullets
 ***************************
 */
let showBullets = document.querySelectorAll(".show-bullets span");
let navContainer = document.querySelector(".nav-bullets");

let bulletsLocalOption = localStorage.getItem("bullets_option");
if (bulletsLocalOption !== null) {
  showBullets.forEach(element => {
    element.classList.remove("active");
  });
  if (bulletsLocalOption === "block") {
    document.querySelector(".show-bullets .yes").classList.add("active");
    navContainer.style.display = "block";
  } else {
    document.querySelector(".show-bullets .no").classList.add("active");
    navContainer.style.display = "none";
  }
}

showBullets.forEach(showbullet => {
  showbullet.addEventListener("click", e => {
    if (showbullet.dataset.display === "show") {
      navContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      navContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".rest-option").onclick = function() {
  localStorage.clear();
  // localStorage.removeItem('bullets_option');
  // localStorage.removeItem('color_option');
  // localStorage.removeItem('background_option');
  window.location.reload();
};

let navLinks = document.querySelector(".links");
let toggleBtn = document.querySelector(".toggle-menu");
toggleBtn.onclick = function(e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  navLinks.classList.toggle("open");
};
navLinks.onclick = function(e) {
  e.stopPropagation();
};

document.onclick = function(e) {
  if (e.target !== toggleBtn && e.target !== navLinks) {
    if (navLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      navLinks.classList.toggle("open");
    }
  }
};
