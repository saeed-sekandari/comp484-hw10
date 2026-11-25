// Store Buddy's information.
var pet_info = {
  name: "Buddy",
  weight: 8,
  happiness: 5
};

// Remember whether a pet comment has appeared.
var hasShownPetComment = false;

// ==========================
// HW10: Console messages
// ==========================

function runConsoleDemonstrations() {
  console.log("[HW10 INFO] Giga Pet project loaded successfully.");
  console.info("[HW10 INFO] Buddy's current information is ready.");

  console.warn("[HW10 WARNING] This is a practice warning for DevTools.");

  console.error("[HW10 ERROR] This is a practice error message for DevTools.");

  var petData = [
    {
      name: pet_info.name,
      weight: pet_info.weight,
      happiness: pet_info.happiness
    },
    {
      name: "Example Pet",
      weight: 10,
      happiness: 7
    }
  ];

  console.table(petData);

  console.group("[HW10 GROUP] Buddy Status");
  console.log("Name:", pet_info.name);
  console.log("Weight:", pet_info.weight);
  console.log("Happiness:", pet_info.happiness);
  console.groupEnd();

  console.log(
    "%c[HW10 CUSTOM] DriveEasy DevTools demonstration",
    "color: white; background: #0077b6; padding: 6px; font-weight: bold;"
  );
}

// ==========================
// HW10: Browser errors
// ==========================

// Requests a file that does not exist.
function create404Error() {
  fetch("missing-hw10-file.json");
}

// Intentionally creates a TypeError.
function createTypeError() {
  var missingValue;

console.log(missingValue ? missingValue.name : "No value available");}

// Intentionally creates a slow three-second task.
function slowClickHandler() {
  var startTime = performance.now();

  while (performance.now() - startTime < 3000) {
    // Intentional three-second delay.
  }

  console.log("[HW10 VIOLATION] Slow Nap button click completed.");
}

// ==========================
// Wait until the page is ready
// ==========================

$(function () {
  updatePetInfoInHtml();

  // Connect the Giga Pet buttons.
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".nap-button").click(clickedNapButton);

  // Use the existing Nap button for the slow-task demonstration.
  $(".nap-button").click(slowClickHandler);

  // Run the Console demonstrations.
  runConsoleDemonstrations();

  // Trigger the 404 example.
  create404Error();

  // Trigger the TypeError example after one second.
  setTimeout(createTypeError, 1000);
});

// ==========================
// Giga Pet functions
// ==========================

// A treat increases happiness and weight.
function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;

  finishAction("That treat was delicious. Thank you!");
}

// Playing increases happiness and decreases weight.
function clickedPlayButton() {
  if (petNeedsCare()) {
    showPetComment(
      "Buddy needs care before he can play. Give him a treat first."
    );
    return;
  }

  pet_info.happiness += 2;
  pet_info.weight -= 1;

  finishAction("Playing with you is so much fun!");
}

// Exercise decreases happiness and weight.
function clickedExerciseButton() {
  if (petNeedsCare()) {
    showPetComment(
      "Buddy needs care before he can exercise. Give him a treat first."
    );
    return;
  }

  pet_info.happiness -= 1;
  pet_info.weight -= 1;

  finishAction("Whew! I earned a rest after that workout.");
}

// A nap increases happiness.
function clickedNapButton() {
  pet_info.happiness += 3;

  finishAction("That nap made me feel refreshed!");
}

// Check Buddy's values and update the webpage.
function finishAction(message) {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();

  if (petNeedsCare()) {
    showPetComment("Buddy needs care. Give him a treat to restore his stats.");
  } else {
    showPetComment(message);
  }

  console.log("[HW10 USER ACTION] Buddy's information was updated.");
}

// Check whether Buddy needs care.
function petNeedsCare() {
  return pet_info.weight === 0 || pet_info.happiness === 0;
}

// Prevent values from going below zero.
function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

// Update Buddy's information on the page.
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
}

// Display Buddy's latest message.
function showPetComment(message) {
  var $comment = $(".pet-comment");

  if (hasShownPetComment) {
    // Hide the current message.
    $comment.slideUp(2000, function () {
      $comment.text(message);

      // Show the new message.
      $comment.slideDown(2000);
    });
  } else {
    $comment.text(message);
    $comment.slideDown(2000);
    hasShownPetComment = true;
  }
}