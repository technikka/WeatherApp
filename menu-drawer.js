const trigger = document.getElementById("trigger");
const drawer = document.getElementById("menu-drawer");
const closeBtn = document.querySelector(".close");

const toggleTrigger = () => {
  trigger.classList.toggle("show");
};

const toggleDrawer = () => {
  drawer.classList.toggle("show");
};

trigger.addEventListener("click", () => {
  toggleTrigger();
  toggleDrawer();
});

closeBtn.addEventListener("click", () => {
  toggleTrigger();
  toggleDrawer();
});
