window.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".fairy-lights-button").forEach(function(button) {
    // [add, remove]
    let states = [
      { button: "off", lights: "down" },
      { button: "on", lights: "up" }
    ];
    document.querySelectorAll(".fairy-lights").forEach(function(fairyLights) {
      if (fairyLights.classList.contains("up")) {
        states.reverse();
      }
    });

    button.classList.add(states[0].button);
    button.classList.remove(states[1].button);
    states.reverse();

    button.addEventListener("click", function() {
      document.querySelectorAll(".fairy-lights").forEach(function(fairyLights) {
        fairyLights.classList.add(states[0].lights);
        fairyLights.classList.remove(states[1].lights);
      });

      button.classList.add(states[0].button);
      button.classList.remove(states[1].button);

      states.reverse();
    });
  });
});
