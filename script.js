const rollBtn = document.getElementById("rollBtn");
const message = document.getElementById("resultMessage");
const digits = [
  document.getElementById("digit1"),
  document.getElementById("digit2"),
  document.getElementById("digit3"),
  document.getElementById("digit4"),
  document.getElementById("digit5")
];

rollBtn.addEventListener("click", () => {
  const miseInput = document.getElementById("mise");
  let mise = parseInt(miseInput.value);

  if (isNaN(mise) || mise < 100) {
    message.textContent = "Solde insuffisant pour miser !";
    message.style.color = "orange";
    return;
  }

  if (mise > 5000) {
    message.textContent = "Solde insupportable (max 5000 Ar) !";
    message.style.color = "orange";
    return;
  }

  const lucky = Math.floor(Math.random() * 10001);

  let interval = setInterval(() => {
    digits.forEach(d => {
      d.textContent = Math.floor(Math.random() * 10);
    });
  }, 50);

  setTimeout(() => {
    clearInterval(interval);
    displayNumber(lucky);
    let gain = calculateGain(lucky);
    let totalGain = lucky <= 9885 ? 0 : gain * (mise / 100);
    displayMessage(totalGain);
  }, 1200);
});

function displayNumber(number) {
  const numStr = number.toString().padStart(5, '0');
  digits.forEach((digit, index) => {
    digit.textContent = numStr[index];
  });
}

function calculateGain(num) {
  if (num >= 9886 && num <= 9985) return 100;
  if (num >= 9986 && num <= 9993) return 200;
  if (num >= 9994 && num <= 9997) return 300;
  if (num >= 9998 && num <= 9999) return 400;
  if (num === 10000) return 1500;
  return 0;
}

function displayMessage(gain) {
  if (gain === 0) {
    message.textContent = "Pas de chance cette fois !";
    message.style.color = "red";
  } else {
    message.textContent = `Félicitations ! Vous avez gagné ${gain} Ar`;
    message.style.color = "limegreen";
  }
}
