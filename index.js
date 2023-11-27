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
let countdown = 20;
let countdownInterval;
let defuzzificou = false

const foto = document.getElementById("foto")
const timer = document.getElementById("timer");

const value_bar_care = document.getElementById("loadingLabelCare");
value_bar_care.setAttribute("value", care);

let water = plant.water;
const value_bar_water = document.getElementById("loadingLabelWater");
value_bar_water.setAttribute("value", water);

document.getElementById("regarButton").addEventListener("click", function () {
  if(end == false && morto == false && emExecucao == true && plant.water <= 100) {
    plant.water += 5;
    const value_bar_water = document.getElementById("loadingLabelWater");
    value_bar_water.setAttribute("value", plant.water);
    }
});

document.getElementById("brincarButton").addEventListener("click", function () {
  if(end == false && morto == false && emExecucao == true && plant.care < 100) {
    plant.care += 5;
    value_bar_care.setAttribute("value", plant.care);
    }
});


function startCountdown() {
    emExecucao = true;
    let plantoImage = "plantoTranquilo";
    countdownInterval = setInterval(function () {

      if (plant.water < 5 || plant.care < 5 || plant.water >= 100) {
        clearInterval(countdownInterval);
        morto = true;
        plantoImage = "plantoMorto";
        document.getElementById("comecar").innerHTML = "Recomeçar";
        giveFruit();
      } 
       else if (countdown == 0 && plant.water < 100) {
        giveFruit();
        clearInterval(countdownInterval);
      }
       else if (plant.care < 30) {
    
        countdown--;
        timer.innerHTML = countdown;
        plantoImage = "plantoCarente";
      } 
       else if (plant.care > 70 && plant.water < 60 && plant.water >= 50) {
    
        countdown--;
        timer.innerHTML = countdown;
        plantoImage = "plantoForte";
      }
      else if (plant.care > 70) {
    
        countdown--;
        timer.innerHTML = countdown;
        plantoImage = "plantoCoracao";
      }  
      else if (plant.water < 30) {
        countdown--;
        timer.innerHTML = countdown;
        plantoImage = "plantoCheiDiOdio";
      }
      else {
        countdown--;
        timer.innerHTML = countdown;
        plantoImage = "plantoTranquilo";
      }
      foto.setAttribute("src", `./assets/${plantoImage}.png`); 
  }, 1000);
}


document.getElementById("comecar").addEventListener("click", function () {
  if (emExecucao == false && morto == false) {

    startCountdown();
    Damage();
    careDamage();
  } else if (morto || end) {
    window.location.reload();
  }
});

function careDamage() {
  careInterval = setInterval(function () {
    if (morto == false && end == false) {
      if (plant.water < 30 || plant.water >= 65) {
      plant.care -= 10;
      value_bar_care.setAttribute("value", plant.care);
      }
    } else {
      clearInterval(careInterval);
    }
  }, 1000);
}

function Damage() {
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

function giveFruit() {
  end = true;
  
  fuzzify(plant);
  defuzzify(plant);
  if(defuzzificou){

    document.getElementById("comecar").innerHTML = "Recomeçar";
    clickButtonModalFruit();
  }
}

function fuzzify(plant) {
  const waterLevels = {
    seco: 5,
    desidratado: 29,
    hidratado: 65,
    molhado: 85,
    encharcado: 100,
  };

  const careLevels = {
    abandonado: 5,
    triste: 29,
    feliz: 65,
    muitoFeliz: 85,
    radiante: 100,
  };

  if (plant.water < waterLevels.seco) {
    plant.waterSatisfaction = "Seco";
  } else if (plant.water <= waterLevels.desidratado) {
    plant.waterSatisfaction = "Desidratado";
  } else if (plant.water <= waterLevels.hidratado) {
    plant.waterSatisfaction = "Hidratado";
  } else if (plant.water <= waterLevels.molhado) {
    plant.waterSatisfaction = "Molhado";
  } else {
    plant.waterSatisfaction = "Encharcado";
  }

  if (plant.care < careLevels.abandonado) {
    plant.careSatisfaction = "abandonado";
  } else if (plant.care <= careLevels.triste) {
    plant.careSatisfaction = "triste";
  } else if (plant.care <= careLevels.feliz) {
    plant.careSatisfaction = "feliz";
  } else if (plant.care <= careLevels.muitoFeliz) {
    plant.careSatisfaction = "muitoFeliz";
  } else {
    plant.careSatisfaction = "radiante";
  }
}

function defuzzify(plant) {
  const fruitResult = {
    tristeDesidratado: "Podre",
    felizDesidratado: "Podre",
    muitoFelizDesidratado: "Bronze",
    radianteDesidratado: "Prata",
    tristeHidratado: "Podre",
    felizHidratado: "Bronze",
    muitoFelizHidratado: "Prata",
    radianteHidratado: "Dourado",
    tristeMolhado: "Podre",
    felizMolhado: "Bronze",
    muitoFelizMolhado: "Prata",
    radianteMolhado: "Dourado",
    morto: "Nenhum fruto",
    default: "Podre",
  };

  const key = `${plant.careSatisfaction}${plant.waterSatisfaction}`;

  if (key in fruitResult) {
    plant.fruit = fruitResult[key];
  } else if (morto) {
    plant.fruit = fruitResult.morto;
  }
  else {
    plant.fruit = fruitResult.default;
  }
  defuzzificou = true;
}


function clickButtonModalFruit() {
  if (plant.fruit == "none") {
    mensagem = "Nenhum Fruto"
  } else {
    mensagem = "Fruto: " + plant.fruit;
  }
  button = document.getElementById("button_modal")
  button.click()

  document.querySelector(".modal-body").innerHTML = mensagem

  satisfaWater = document.createElement("p")
  satisfaWater.innerHTML = "Nível de hidratação (água): " + plant.waterSatisfaction

  satisfaCare = document.createElement("p")
  satisfaCare.innerHTML = "Nível de satisfação (carinho): " + plant.careSatisfaction

  document.querySelector(".modal-body").appendChild(satisfaCare)
  document.querySelector(".modal-body").appendChild(satisfaWater)
}
