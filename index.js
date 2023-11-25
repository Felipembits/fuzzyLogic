var plant = {
  water: 30,
  care: 30,
  fruit: "none",
  satisfaction: 0,
};
let emExecucao = true;
let morto = false;
let care = plant.care;

let countdown = 10;
let countdownInterval;

const value_bar_care = document.getElementById("loadingLabelCare");
value_bar_care.setAttribute("value", care);

let water = plant.water;
const value_bar_water = document.getElementById("loadingLabelWater");
value_bar_water.setAttribute("value", water);

document.getElementById("regarButton").addEventListener("click", function () {
  waterPlant();
});

document.getElementById("brincarButton").addEventListener("click", function () {
  carePlant();
});

document.getElementById("comecar").addEventListener("click", function () {
  if (emExecucao) {
    startCountdown();
    waterDamage();
  } else if (morto) {
    plant.water = 30;
    plant.care = 30;
    value_bar_water.setAttribute("value", plant.water);
    value_bar_care.setAttribute("value", plant.care);
    document.getElementById("foto").setAttribute("src", "./assets/planto.png");
    morto = false;
    startCountdown();
    waterDamage();
    countdown = 60;
  }
});

function startCountdown() {
  countdownInterval = setInterval(function () {
    if (plant.water < 30 && plant.water != 0 && plant.care != 0 && countdown > 0) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document
        .getElementById("foto")
        .setAttribute("src", "./assets/plantoCheiDiOdio.png");
    } else if (plant.care < 30 && plant.water != 0 && plant.care != 0 && countdown > 0) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document
        .getElementById("foto")
        .setAttribute("src", "./assets/plantoCarente.png");
    } else if (plant.water != 0 && plant.care != 0 && countdown > 0) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document
        .getElementById("foto")
        .setAttribute("src", "./assets/plantoTranquilo.png");
    } else if (countdown == 0) {
      giveFruit();
      clearInterval(countdownInterval);
      countdown = 60;
      emExecucao = true;
    }
    else if (plant.water == 0 || plant.care == 0) {
      restartGame();
    }
  }, 1000);
}

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => window.location.reload());

function restartGame() {
  clearInterval(countdownInterval);
  morto = true;
  emExecucao = true;
  document.getElementById("foto").setAttribute("src", "./assets/plantoMorto.png");
}

function careDamage() {
  careInterval = setInterval(function () {
    if (plant.care > 0) {
      plant.water -= 5;
      plant.care -= 7.5;
      value_bar_water.setAttribute("value", plant.water);
      value_bar_care.setAttribute("value", plant.care);
    } else {
      clearInterval(careInterval);
    }
  }, 2000);
}

function waterDamage() {
  waterInterval = setInterval(function () {
    if (plant.water > 0) {
      plant.water -= 10;
      plant.care -= 5;
      value_bar_water.setAttribute("value", plant.water);
      value_bar_care.setAttribute("value", plant.care);
    } else {
      clearInterval(waterInterval);
    }
  }, 1000);
}

// cria um objeto para a planta

// função para regar a planta
function waterPlant() {
  plant.water += 5;
  const value_bar_water = document.getElementById("loadingLabelWater");
  value_bar_water.setAttribute("value", plant.water);
}

// função para dar carinho à planta
function carePlant() {
  plant.care += 5;
  value_bar_care.setAttribute("value", plant.care);
}

// função para definir o tipo de fruto gerado
function giveFruit() {
  if (morto == false) {
    waterSatisfaction = 0;
    careSatisfaction = 0;

    if (
      (plant.water > 0 && plant.water < 10) ||
      (plant.water >= 40 && plant.water < 50) ||
      plant.water >= 50
    ) {
      waterSatisfaction = 10;
    } else if ((plant.water >= 10 && plant.water <= 20) || plant.water > 30) {
      waterSatisfaction = 30;
    } else if (plant.water > 20 && plant.water <= 30) {
      waterSatisfaction = 50;
    }
    if (
      (plant.care >= 0 && plant.care < 10) ||
      (plant.care >= 40 && plant.care < 50) ||
      plant.care >= 50
    ) {
      careSatisfaction = 10;
    } else if ((plant.care >= 10 && plant.care <= 20) || plant.care > 30) {
      careSatisfaction = 30;
    } else if (plant.care > 20 && plant.care <= 30) {
      careSatisfaction = 50;
    }

    // condições para determinar o tipo de fruto
    plant.satisfaction = waterSatisfaction + careSatisfaction;
    console.log("Satisfação: " + plant.satisfaction);
    console.log("Agua: " + plant.water);
    console.log("Carinho: " + plant.care);
    console.log("waterSatisfaction: " + waterSatisfaction);
    console.log("careSatisfaction: " + careSatisfaction);
    if (plant.satisfaction >= 80) {
      plant.fruit = "dourado";
    } else if (plant.satisfaction >= 50) {
      plant.fruit = "prata";
    } else if (plant.satisfaction > 40) {
      plant.fruit = "bronze";
    } else {
      plant.fruit = "podre";
    }

    alert("Fruto dado: " + plant.fruit);
    plant.satisfaction = 0;

    plant.fruitGiven = true;
  }
}
