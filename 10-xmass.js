window.addEventListener("DOMContentLoaded", function() {
  const d = new Date();
  if (d.getMonth() === 11 && Math.abs(d.getDate() - 24) <= 4) {
    document.querySelectorAll(".fairy-lights").forEach(fairyLights => {
      fairyLights.classList.add("down");
      fairyLights.classList.remove("up");
    });
  }
});
