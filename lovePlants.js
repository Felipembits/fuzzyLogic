var { Timer } = require("easytimer.js");



var timer = new Timer();
var plant = {
  water: 0,
  care: 0,
  fruit: "none",
  satisfaction: 0,
};

function waterPlant() {
  plant.water += 10;
  console.log("Planta regada!");
}

function carePlant() {
  plant.care += 10;
  console.log("Planta cuidada!");
}

function giveFruit() {
  waterSatisfaction = 0;
  careSatisfaction = 0;

  if (
    (plant.water >= 0 && plant.water < 10) ||
    (plant.water >= 40 && plant.water < 50) ||
    plant.water >= 50
  ) {
    waterSatisfaction = 10;
  } else if (
    (plant.water >= 10 && plant.water < 20) ||
    (plant.water >= 30 && plant.water < 40)
  ) {
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
  } else if (
    (plant.care >= 10 && plant.care < 20) ||
    (plant.care >= 30 && plant.care < 40)
  ) {
    careSatisfaction = 30;
  } else if (plant.care > 20 && plant.care <= 30) {
    careSatisfaction = 50;
  }

  plant.satisfaction = waterSatisfaction + careSatisfaction;
  console.log("Satisfação: " + plant.satisfaction);
  if (plant.satisfaction >= 80) {
    plant.fruit = "dourado";
  } else if (plant.satisfaction > 50) {
    plant.fruit = "prata";
  } else if (plant.satisfaction > 40) {
    plant.fruit = "bronze";
  } else {
    plant.fruit = "podre";
  }

  console.log("Fruto dado: " + plant.fruit);
  plant.satisfaction = 0;

  plant.fruitGiven = true;
}

timer.start({
  precision: "seconds",
  startValues: { seconds: 10 },
  countdown: true,
});

timer.addEventListener("secondTenthsUpdated", function (e) {
    // Mostrar os segundos apenas quando faltarem 5 segundos
    if (timer.getTimeValues().seconds <= 5) {
      console.log("Tempo restante: " + timer.getTimeValues().toString(['seconds']));
    }
  });

timer.addEventListener("targetAchieved", function (e) {
  giveFruit();

  if (plant.fruitGiven) {
    console.log("Crescimento do fruto concluído. A planta deu um fruto " + plant.fruit + "!");
    process.exit(); 
  }
});

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput() {
  rl.question(
    "Digite 1 para dar água ou 2 para cuidar da planta: ",
    function (answer) {
      if (answer === "1") {
        waterPlant();
      } else if (answer === "2") {
        carePlant();
      } else {
        console.log(
          "Opção inválida. Digite 1 para dar água ou 2 para cuidar da planta."
        );
      }

      if (!plant.fruitGiven) {
        getUserInput();
      } else {
        console.log("Crescimento do fruto concluído. A planta deu um fruto " + plant.fruit + "!");
        rl.close();
      }
    }
  );
}

// Start the loop
getUserInput();
