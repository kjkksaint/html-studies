const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const responseText = document.getElementById("responseText");
const card = document.querySelector(".card");

let isDodging = false;

function moveNoButton() {
  // Ativa modo fuga
  if (!isDodging) {
    noBtn.style.position = "absolute";
    isDodging = true;
  }

  const cardRect = card.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = card.clientWidth - btnWidth;
  const maxY = card.clientHeight - btnHeight - 60;

  let newX, newY;
  let attempts = 0;

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;

    const futureRect = {
      left: cardRect.left + newX,
      right: cardRect.left + newX + btnWidth,
      top: cardRect.top + newY,
      bottom: cardRect.top + newY + btnHeight,
    };

    const overlapping = !(
      futureRect.right < yesRect.left ||
      futureRect.left > yesRect.right ||
      futureRect.bottom < yesRect.top ||
      futureRect.top > yesRect.bottom
    );

    if (!overlapping || attempts > 20) break;
  } while (true);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  responseText.textContent = "Achei que ia negar, hein... 👀";
  responseText.classList.add("show");
});
