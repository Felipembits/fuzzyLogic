document.getElementById("regarButton").addEventListener("click", function() {
    waterPlant();
   });
   

// importa a biblioteca easytimer.js
var { Timer } = require("easytimer.js");

var timer = new Timer();

// cria um objeto para a planta
var plant = {
  water: 0,
  care: 0,
  fruit: "none",
  satisfaction: 0,
};

// função para regar a planta
function waterPlant() {
  plant.water += 10;
  console.log("Planta regada! Água: " + plant.water);
}

// função para dar carinho à planta
function carePlant() {
  plant.care += 10;
  console.log("Planta cuidada! Carinho: " + plant.care);
}

// função para definir o tipo de fruto gerado
function giveFruit() {
  waterSatisfaction = 0;
  careSatisfaction = 0;

  if (
    (plant.water >= 0 && plant.water < 10) || (plant.water >= 40 && plant.water < 50) || plant.water >= 50
  ) {

    waterSatisfaction = 10;

  } else if ( (plant.water >= 10 && plant.water <= 20) || (plant.water > 30)) {

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
    (plant.care >= 10 && plant.care <= 20) ||
    (plant.care > 30)
  ) {
    careSatisfaction = 30;
  } else if (plant.care > 20 && plant.care <= 30) {
    careSatisfaction = 50;
  }

  // condições para determinar o tipo de fruto 
  plant.satisfaction = waterSatisfaction + careSatisfaction;
  console.log("Satisfação: " + plant.satisfaction);
  
  if (plant.satisfaction >= 80) {
    plant.fruit = "dourado";
  } else if (plant.satisfaction >= 50) {
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

// Inicia o contador regressivo
timer.start({
  precision: "seconds",
  startValues: { seconds: 60 },
  countdown: true,
});

timer.addEventListener("secondTenthsUpdated", function (e) {
    // Reduz o nível de água 
    if (timer.getTimeValues().secondTenths % 100 === 0) {
      plant.water -= 5;
      console.log("Nível de água reduzido! Água: " + plant.water);
    }
  
    if (timer.getTimeValues().secondTenths % 50 === 0) {
      plant.care -= 2.5;
      console.log("Nível de carinho reduzido! Carinho: " + plant.care);
    }
  
    // Mostrar os segundos apenas quando faltarem 5 segundos
    if (timer.getTimeValues().seconds <= 5) {
      console.log("Tempo restante: " + timer.getTimeValues().toString(['seconds']));
    }
  });
// Quando o contador chegar a zero, chama a função para dar o fruto
timer.addEventListener("targetAchieved", function (e) {
  giveFruit();

  if (plant.fruitGiven) {
    console.log("Crescimento do fruto concluído. A planta deu um fruto " + plant.fruit + "!");
    process.exit(); 
  }
});

// Biblioteca para receber o input do usuário
const readline = require("readline");

// Cria a "interface" para receber o input do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// função para receber o input do usuário
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
