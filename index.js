var plant = {
  water: 50,
  care: 50,
  fruit: "none",
  waterSatisfaction: "",
  careSatisfaction: "",
};
let emExecucao = false;
let morto = false;
let care = plant.care;
let end = false;
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


function startCountdown() {
    emExecucao = true;
    countdownInterval = setInterval(function () {
    if (plant.water < 30 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water < 100) {
      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCheiDiOdio.png");
    } else if (plant.care < 30 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water < 100) {

      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCarente.png");
    } 
     else if (plant.care > 70 && plant.water < 60 && plant.water >= 50 && plant.care != 0 && countdown > 0 && plant.water < 100) {

      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoForte.png");
    }
    else if (plant.care > 70 && plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water < 100) {

      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoCoracao.png");
    }  
    else if (plant.water != 0 && plant.care != 0 && countdown > 0 && plant.water < 100) {

      countdown--;
      document.getElementById("timer").innerHTML = countdown;
      document.getElementById("foto").setAttribute("src", "./assets/plantoTranquilo.png");
    } 
    else if (countdown == 0 &&  plant.water < 100) {

      giveFruit();
      clearInterval(countdownInterval);
    }
    else if (plant.water == 0 || plant.care == 0 || plant.water >= 100 || plant.care ) {
      clearInterval(countdownInterval);
      morto = true;
      document.getElementById("foto").setAttribute("src", "./assets/plantoMorto.png");
      document.getElementById("comecar").innerHTML = "Recomeçar";
    }
  }, 1000);
}


document.getElementById("comecar").addEventListener("click", function () {
  if (emExecucao == false && morto == false) {
    plant.water = 50;
    plant.care = 50;
    startCountdown();
    waterDamage();
  } else if (morto || end) {
    window.location.reload();
  }
});




function careDamageTwo() {
  careInterval = setInterval(function () {
    if (plant.care > 0 && morto == false && end == false) {  
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
    if (plant.water > 0 && morto == false && end == false) {
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
  if(end == false && morto == false) {
  plant.water += 5;
  const value_bar_water = document.getElementById("loadingLabelWater");
  value_bar_water.setAttribute("value", plant.water);
  }
}

// função para dar carinho à planta
function carePlant() {
  if(end == false && morto == false) {
  plant.care += 5;
  value_bar_care.setAttribute("value", plant.care);
  }
}
let defuzzificou = false

// função para definir o tipo de fruto gerado
function giveFruit() {
  end = true;
  fuzzify();
  defuzzify();
  if(defuzzificou){
    alert("Fruto: " + plant.fruit);
    document.getElementById("comecar").innerHTML = "Recomeçar";
  }
}

function fuzzify() {
  if (plant.water < 5) {
    plant.waterSatisfaction = "Seco";
  }
  else if (plant.water >= 5 && plant.water <= 29) {
    plant.waterSatisfaction = "Desidratado";
  }
  else if (plant.water > 29 && plant.water <= 65) {
    plant.waterSatisfaction = "Hidratado";
  }
  else if (plant.water > 65 && plant.water <= 85) {
    plant.waterSatisfaction = "Molhado";
  }
  else if (plant.water > 85 && plant.water < 100) {
    plant.waterSatisfaction = "Encharcado";
  }

  if (plant.care < 5) {
    plant.careSatisfaction = "Abandonado";
  }
  else if (plant.care >= 5 && plant.care <= 29) {
    plant.careSatisfaction = "Triste";
  }
  else if (plant.care > 29 && plant.care <= 65) {
    plant.careSatisfaction = "Feliz";
  }
  else if (plant.care > 65 && plant.care <= 85) {
    plant.careSatisfaction = "Muito Feliz";
  }
  else if (plant.care > 85 && plant.care < 100) {
    plant.careSatisfaction = "Radiante";
  }
}

function defuzzify() {
 if (plant.careSatisfaction == "Triste" && plant.waterSatisfaction == "Desidratado") {
     plant.fruit = "Podre";
  }
 else if (plant.careSatisfaction == "Feliz" && plant.waterSatisfaction == "Desidratado") {
     plant.fruit = "Podre";
 } else if (plant.careSatisfaction == "Muito feliz" && plant.waterSatisfaction == "Desidratado") {
     plant.fruit = "Bronze";
 } else if (plant.careSatisfaction == "Radiante" && plant.waterSatisfaction == "Desidratado") {
     plant.fruit = "Prata";
 } else if (plant.careSatisfaction == "Triste" && plant.waterSatisfaction == "Hidratado") {
     plant.fruit = "Podre";
 } else if (plant.careSatisfaction == "Feliz" && plant.waterSatisfaction == "Hidratado") {
     plant.fruit = "Bronze";
 } else if (plant.careSatisfaction == "Muito feliz" && plant.waterSatisfaction == "Hidratado") {
     plant.fruit = "Prata";
 } else if (plant.careSatisfaction == "Radiante" && plant.waterSatisfaction == "Hidratado") {
     plant.fruit = "Dourado";
 } else if (plant.careSatisfaction == "Triste" && plant.waterSatisfaction == "Molhado") {
     plant.fruit = "Podre";
 } else if (plant.careSatisfaction == "Feliz" && plant.waterSatisfaction == "Molhado") {
     plant.fruit = "Bronze";
 } else if (plant.careSatisfaction == "Muito feliz" && plant.waterSatisfaction == "Molhado") {
     plant.fruit = "Prata";
 } else if (plant.careSatisfaction == "Radiante" && plant.waterSatisfaction == "Molhado") {
     plant.fruit = "Dourado";
 } else {
      plant.fruit = "Podre";
 }
  defuzzificou = true
 
}