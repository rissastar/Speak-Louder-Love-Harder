document.getElementById("quickExit").onclick = () => {
  window.location.href = "https://weather.com";
};

document.getElementById("panicInfo").onclick = () => {
  document.getElementById("panicModal").classList.remove("hidden");
};

function closeModal() {
  document.getElementById("panicModal").classList.add("hidden");
}