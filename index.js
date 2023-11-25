var plant = {
  water: 50,
  care: 50,
  fruit: "none",
  waterSatisfaction: "",
  careSatisfaction: "",
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
    plant.water = 50;
    plant.care = 50;
    startCountdown();
    waterDamage();
  } else if (morto) {
    plant.water = 50;
    plant.care = 50;
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
    if (plant.water < 30 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water != 100) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCheiDiOdio.png");
    } else if (plant.care < 30 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water != 100) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCarente.png");
    } 
     else if (plant.care > 70 && plant.water < 60 && plant.water >= 50 && plant.care != 0 && countdown > 0 && plant.water != 100) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoForte.png");
    }
    else if (plant.care > 70 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water != 100) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCoracao.png");
    }  
    else if (plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water != 100) {
      emExecucao = false;
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoTranquilo.png");
    } 
    else if (countdown == 0 ) {
      giveFruit();
      clearInterval(countdownInterval);
      emExecucao = true;
    }
    else if (plant.water == 0 || plant.care == 0 || plant.water >= 99) {
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

function careDamageTwo() {
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
let defuzzificou = false
// função para definir o tipo de fruto gerado
function giveFruit() {
  
  fuzzify();
  defuzzify();
  if(defuzzificou){
    alert("Fruto: " + plant.fruit);
    window.location.reload()
  }
}

function fuzzify() {
  if (plant.water < 5) {
    waterSatisfaction = "Seco";
  }
  else if (plant.water > 5 && plant.water <= 29) {
    waterSatisfaction = "Desidratado";
  }
  else if (plant.water > 29 && plant.water <= 65) {
    waterSatisfaction = "Hidratado";
  }
  else if (plant.water > 65 && plant.water <= 85) {
    waterSatisfaction = "Molhado";
  }
  else if (plant.water > 85 && plant.water <= 100) {
    waterSatisfaction = "Encharcado";
  }

  if (plant.care < 5) {
    careSatisfaction = "Abandonado";
  }
  else if (plant.care > 5 && plant.care <= 29) {
    careSatisfaction = "Triste";
  }
  else if (plant.care > 29 && plant.care <= 65) {
    careSatisfaction = "Feliz";
  }
  else if (plant.care > 65 && plant.care <= 85) {
    careSatisfaction = "Muito Feliz";
  }
  else if (plant.care > 85 && plant.care <= 100) {
    careSatisfaction = "Radiante";
  }
}

function defuzzify() {
    
 if (careSatisfaction == "Feliz" && waterSatisfaction == "Desidratado") {
     plant.fruit = "Podre";
 } else if (careSatisfaction == "Muito feliz" && waterSatisfaction == "Desidratado") {
     plant.fruit = "Bronze";
 } else if (careSatisfaction == "Radiante" && waterSatisfaction == "Desidratado") {
     plant.fruit = "Prata";
 } else if (careSatisfaction == "Triste" && waterSatisfaction == "Hidratado") {
     plant.fruit = "Podre";
 } else if (careSatisfaction == "Feliz" && waterSatisfaction == "Hidratado") {
     plant.fruit = "Bronze";
 } else if (careSatisfaction == "Muito feliz" && waterSatisfaction == "Hidratado") {
     plant.fruit = "Prata";
 } else if (careSatisfaction == "Radiante" && waterSatisfaction == "Hidratado") {
     plant.fruit = "Dourado";
 } else if (careSatisfaction == "Triste" && waterSatisfaction == "Molhado") {
     plant.fruit = "Podre";
 } else if (careSatisfaction == "Feliz" && waterSatisfaction == "Molhado") {
     plant.fruit = "Bronze";
 } else if (careSatisfaction == "Muito feliz" && waterSatisfaction == "Molhado") {
     plant.fruit = "Prata";
 } else if (careSatisfaction == "Radiante" && waterSatisfaction == "Molhado") {
     plant.fruit = "Dourado";
 } else {
      plant.fruit = "Sem fruto";
 }
  defuzzificou = true
 
}