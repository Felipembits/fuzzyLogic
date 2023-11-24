var plant = {
    water: 0,
    care: 0,
    fruit: "none",
    satisfaction: 0,
  };

  document.getElementById("regarButton").addEventListener("click", function() {
    waterPlant();
    console.log("Planta regada! Água: " + plant.water);
   });

document.getElementById("brincarButton").addEventListener("click", function() {
    carePlant();
    console.log("Planta cuidada! Carinho: " + plant.care);
   });

   document.getElementById("comecar").addEventListener("click", function() {
    startCountdown();
 });

 let countdown = 5;
 let countdownInterval;
 
 function startCountdown() {
   countdownInterval = setInterval(function() {
       countdown--;
       document.getElementById("timer").innerHTML = countdown;
       if (countdown === 0) {
           giveFruit();
           clearInterval(countdownInterval);
           countdown = 5;
       }
   }, 1000);
 }
 


// cria um objeto para a planta

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