const message = document.querySelector('.alert');
const slot1 = document.querySelector('#slot1');
const slot2 = document.querySelector('#slot2');
const slot3 = document.querySelector('#slot3');
const spinButton = document.querySelector('.btnGame');
const footerCard= document.querySelector('#footerCard')

let availableMoney = 100; 
footerCard.textContent = `$${availableMoney}`;
// Generara un número aleatorio entre 0 y 2 
function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}

// Función para actualizar el estado del juego después de cada tirada
function updateGameState(randomNumbers) {
  if (randomNumbers[0] === randomNumbers[1] && randomNumbers[1] === randomNumbers[2]) {
    // Asigna un premio
    availableMoney += 50; 
    if (availableMoney >= 200) {
      showWinningMessage();
      return;
    }
    showPrizeMessage(); 
    hidePrizeMessage() 
  } else {
    // Resta $5 del dinero disponible 
    availableMoney -= 5;
    if (availableMoney < 0) {
      showLosingMessage();
      return;
    }
  }

  // Actualiza el texto del botón Spin
  footerCard.textContent = `$${availableMoney}`;
}

// Mensaje premio
function showPrizeMessage() {
  setTimeout(function () {
    message.textContent = "¡congratulations! you have won $50";
  }, 100);
}
//Ocultarlo
function hidePrizeMessage() {
  setTimeout(function () {
    message.textContent = "";
  }, 1000);
}

//mensajes de victoria o derrota
function showWinningMessage() {
  message.textContent = "¡congratulations, you've won the game!!";
  spinButton.disabled = true; 
}

function showLosingMessage() {
  message.textContent = "I'm sorry, you've lost the game";
  spinButton.disabled = true; 
}

function spin() {
  if (availableMoney < 5) {
    showLosingMessage();
    return;
  }

  // Genera tres números aleatorios
  const randomNumbers = [getRandomNumber(), getRandomNumber(), getRandomNumber()];

  // Actualiza los iconos de los slots con las imágenes correspondientes
  slot1.innerHTML = `<img src="../src/candy1.png" alt="50px" width="50px">`;
  slot2.innerHTML = `<img src="../src/candy2.png" alt="50px" width="50px">`;
  slot3.innerHTML = `<img src="../src/candy3.png" alt="50px" width="50px">`;

  // Reemplaza las imágenes con los iconos correspondientes según los números aleatorios
  if (randomNumbers[0] === 0) {
    slot1.innerHTML = `<img src="../src/candy1.png" alt="50px" alt="50px" width='50px';>`;
  } else if (randomNumbers[0] === 1) {
    slot1.innerHTML = `<img src="../src/candy2.png" alt="50px" width="50px">`;
  } else {
    slot1.innerHTML = `<img src="../src/candy3.png" alt="50px" width="50px">`;
  }

  if (randomNumbers[1] === 0) {
    slot2.innerHTML = `<img src="../src/candy1.png" alt="50px" alt="50px" width="50px">`;
  } else if (randomNumbers[1] === 1) {
    slot2.innerHTML = `<img src="../src/candy2.png" alt="50px" width="50px">`;
  } else {
    slot2.innerHTML = `<img src="../src/candy3.png" alt="50px" width="50px">`;
  }

  if (randomNumbers[2] === 0) {
    slot3.innerHTML = `<img src="../src/candy1.png" alt="50px" alt="50px" width="50px">`;
  } else if (randomNumbers[2] === 1) {
    slot3.innerHTML = `<img src="../src/candy2.png" alt="50px" width="50px">`;
  } else {
    slot3.innerHTML = `<img src="../src/candy3.png" alt="50px" width="50px">`;
  }

//actualizador de estado
  updateGameState(randomNumbers);

//fin del juego


  if (availableMoney >= 200) {
    message.textContent = "¡congratulations, you've won the game!!"
    spinButton.disabled = true;
  }
}

//Controlador de eventos.
spinButton.addEventListener("click", spin);