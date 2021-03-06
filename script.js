let page, score, answered, secsLeft;
var heading = document.querySelector(".display");
var startBtn = document.querySelector("#start-btn");
var nxtBtn = document.querySelector("#next-btn");
var button = document.querySelector(".btn");
var ansBtns = document.querySelector("#ans-btns");
var questEl = document.querySelector("#question");
var questContEl = document.querySelector("#questcont");
var results = document.querySelector('.results');
var intro = document.querySelector("#preamble");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var restart = document.querySelector(".game-over")
var clock = document.querySelector(".timer");
var ansChoice = [];
const ansStr = "Fluid Volume Deficit\n\n (S/S of) Fluid Volume Deficit \n\nFluid Volume Excess\n\n(S/S of) Fluid Volume Excess\n\nFluid Imbalance Nursing Interventions\n\nHypernatremia \n\n (S/S of) Hypernatremia\n\n Hyponatremia\n\n(S/S of) Hyponatremia\n\n Hyperkalemia \n\n (S/S of) Hyperkalemia \n\n Hypokalemia \n\n (S/S of) Hypokalemia \n\n Hypercalcemia \n\n (S/S of) Hypercalcemia \n\n Hypocalcemia \n\n (S/S of) Hypocalcemia - hint: C.A.T.S.\n\n Hyperphosphatemia\n\n (S/S of) Hyperphosphatemia\n\n Hypophosphatemia \n\n (S/S of) Hypophosphatemia \n\n Hypermagnesemia \n\n (S/S of) Hypermagnesemia \n\n Hypomagnesemia"
const answers = ansStr.split("\n\n")
const fauxAns = ["(S/S) of Hyperelectrolytis", "Hypoelectrolytis", "(S/S of) Hypoconservativsm", "Fluid Concentration Imbalance", "Hypertrumpemia"];
const questStr = "What is Abnormal loss of body fluids or inadequate intake, includes loss of sodium and is characterized by the need to replace the fluid orally or with .9% NS or Lactated Ringer’s?\n\n S/S: Thirst, dry mouth, decreased skin turgor and UO, weight loss\n\nWhat is Results from excessive intake, abnormal retention of fluids and the patient would need to restrict fluids, give diuretics, may restrict sodium, daily weights?\n\nS/S:  peripheral edema, JVD, bounding pulse, increase BP, crackles, weight gain\n\n All of the following proceedures: Weigh patient daily, Check intake and output, Monitor vital signs (BP, pulse) and labs (BUN, Na+), Listen to lungs, Check skin for edema or tenting, Watch for falls, Look at skin (loose? edema?), and IV therapy; are best described as\n\n What is caused by excessive sodium intake or problem with thirst mechanism and is treated by by replacing fluids orally or IV (5% Dextrose), giving diuretics and restricting sodium?\n\n S/S:  hypertension, restlessness, twitching, intense thirst, weight gain, agitation, seizures, coma\n\n What is caused by loss of sodium containing fluids, draining wounds, diarrhea, vomiting and is treated with fluid restriction, increase oral intake, withholding diuretics, may give small amounts of hypertonic (3% NaCl) IV saline administered slowly?\n\n S/S: S/S:  HA, confusion, irritability, vomiting, seizures, coma\n\n What is caused by too much intake, impaired renal excretion, potassium-sparing diuretics and is treated by stop ingesting K+, stop IVF with K+, give K+ wasting diuretics, dialysis, Kayexalate, give IV insulin + beta blocker\n\n S/S:  muscle cramps, weakness, arrhythmias, irritability, anxiety, irregular pulse, tall T waves, cardiac arrest \n\n What is caused low dietary intake, diuretics, high aldosterone level,  diarrhea, laxative abuse, vomiting and treated by giving potassium chloride supplements and increase dietary intake or IV potassium if indicated? \n\n S/S:  fatigue, skeletal muscle weakness initially in legs, decreased GI motility, weak pulse, EKG changes (flat T wave \n\n What is caused by hyperparathyroidism, cancer (through bone destruction),  prolonged immobilization (bone loss/increased plasma calcium), excessive calcium intake and is treated with loop diuretics to promote excretion, hydration (3000-4000 ml daily), low calcium diet, weight-bearing activity, calcitonin \n\n S/S:  “sedative effect”: decreased memory, confusion, seizures, fatigue, muscle weakness, constipation \n\n What is caused by a decrease in parathyroid hormone, parathyroidectomy, elevated phosphorus, low dietary intake, poor kidney function and is treated with oral or IV calcium (calcium gluconate), high calcium diet, vitamin D supplements, cardiac monitoring? \n\n S/S:  tetany, Trousseau’s sign, Chvostek’s sign, numbness and tingling around the mouth or extremities, arrhythmias, seizures, laryngeal stridor sound of laryngeal stridor \n\n What is caused by: acute or chronic renal failure, chemo, too much milk or phosphate-containing laxatives and treated by restricting dairy products, adequate hydration, calcium supplements, phosphate-binding agents, dialysis? \n\n S/S:  calcified deposits in joints, arteries, skin, and kidneys, tetany, hypocalcemia \n\n What is caused by malnourishment, malabsorption, alcohol withdrawal, phosphate-binding antacids and is treated with oral phosphorus and ingestion of dairy products , phosphate supplements (IV phosphorus if severe) \n\nS/S:  muscle weakness, pain, dysrhythmias, CNS depression, confusion, respiratory failure, heart failure \n\n What is caused by renal failure, too much magnesium intake, adrenal insufficiency and treated by limiting magnesium-containing foods and meds, increased fluids, IV calcium gluconate, dialysis \n\n S/S: N/V, lethargy, drowsiness, deep tendon reflex loss, respiratory arrest/cardiac arrest \n\n What is caused by starvation, chronic alcoholism, diuretics and treated with oral supplements, green vegetables, chocolate, IV magnesium sulfate. Note: Rapid administration can lead to hypotension and cardiac or respiratory arrest. \n\n S/S:  hyperactive deep tendon reflexes, tremors, confusion, seizures, cardiac dysrhythmias with a normal range of 1.5-2.5 mg/dl" 
const questions = questStr.split("\n\n")


function shuffle(vect) {
    for(let i = vect.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        var entry = vect[i];
        vect[i] = vect[j];
        vect[j] = entry;
    }
}

function shuffleOn() {
    for(let i = questions.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);

        var entry = questions[i];
        questions[i] = questions[j];
        questions[j] = entry;

        var entryAns = answers[i];
        answers[i] = answers[j];
        answers[j] = entryAns;
    }
}

function startFcn() {
    console.log("Quiz has begun");
    page = 0;
    score = 0;
    startTimer();
    startBtn.classList.add("hide");
    nxtBtn.classList.remove('hide');
    intro.classList.add("hide");
    questContEl.classList.remove("hide");
    results.classList.add('hide');

    shuffleOn();
    nxtQuest();
}

function nxtQuest() {
    heading.classList.add("hide");
    if(page > questions.length + 10){
        gameOver();
    } else {
        resetState();
        questEl.textContent = questions[page];
        popAnsChoice();
    }
}

function nxtPage() {
    page++;
    if(page > questions.length + 10){
        nxtBtn.classList.add("game-over");
        nxtBtn.textContent = "Restart"
        secsLeft = secs;
    }
}

function popAnsChoice() {
    //Building answer choice vectors with correct answer as the first entry
    for(let i = 1; i < 4; i++){
        ansChoice[0] = answers[page];
        var j = randomIndex(answers);
        var ans = answers[j];
        console.log(j + " index, val: " + answers[j]);
        var repeat = null;
        repeat = ansChoice.indexOf(ans); //tried "hacking" a check for repeats: if there exists a value in the ansChoice vector, then it will return the index and is threfore a number otherwise it is undefined
        console.log(repeat);
        if( repeat > -1){
            while( repeat !== -1){ //introducing faux answers into the mix while checking for repetitions
            var j = randomIndex(fauxAns);
            var fAns = fauxAns[j];
            repeat = ansChoice.indexOf(fAns);
            ansChoice[i] = fAns;
            }
        } else {
        ansChoice[i] = answers[j];
        }
    }
    //Randomly populating answer choices using Fisher-Yates algo in order to ensure there are no repeating correct answers
    for(let i = ansChoice.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        var entry = ansChoice[i];
        ansChoice[i] = ansChoice[j];
        ansChoice[j] = entry;
    }
    // Use doc select to grab elements and include text content
    ansChoice.forEach(ansChoice => {
        var button = document.createElement("button");
        button.innerText = ansChoice;
        button.classList.add("btn");
        if(ansChoice == answers[page]){
            console.log("-right answer-");
            button.dataset.type = true;
        } else {
            console.log("-wrong answer-");
            button.dataset.type = false;
        }
        button.addEventListener("click", selectAns);
        ansBtns.appendChild(button);
    })

}

function resetState() {
    heading.classList.add("hide");
    nxtBtn.classList.add('grey-out');
    answered = false;
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(choice) {
    var selectedBtn = choice.target;
    var correct = selectedBtn.dataset.type;
    correct = stringToBoolean(correct);
    console.log("answer selected");
    console.log("correct = " + correct);
    for(let i = 0; i < 4; i++){
        var bool = stringToBoolean(ansBtns.childNodes[i].dataset.type);
        console.log(bool)
        if(bool) {
            ansBtns.childNodes[i].classList.add("right");
        } else {
            ansBtns.childNodes[i].classList.add("blur");
        }
    }
    if(correct){
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("right");
        score++;
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Correct!"
        heading.setAttribute("style", "color: green;")
        var mins = parseInt(minutesDisplay.textContent);
        secs = mins * 60 + parseInt(secondsDisplay.textContent);
        secs = secs + 30;
        if(secs % 60 < 10){
            secondsDisplay.textContent = "0" + secs % 60;
          } else {    
          secondsDisplay.textContent = secs % 60;}
          minutesDisplay.textContent = Math.floor( secs / 60 );

    } else {
        var mins = parseInt(minutesDisplay.textContent);
        secs = mins * 60 + parseInt(secondsDisplay.textContent);
        secs = secs - 60;
        if(secs % 60 < 10){
            secondsDisplay.textContent = "0" + secs % 60;
          } else {    
          secondsDisplay.textContent = secs % 60;}
          minutesDisplay.textContent = Math.floor( secs / 60 );
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("wrong");
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Inorrect :("
        heading.setAttribute("style", "color: red;")
    }
    nxtBtn.classList.remove("grey-out");
    answered = true;
    
}

// Timer Function
var clockRunning = false;
let interval, secs;

function startTimer() {
    if(clockRunning){
      return;
    }
    clockRunning = true;
    clock.classList.remove("hide");
    interval = setInterval(function() {
  
      var mins = parseInt(minutesDisplay.textContent);
      secs = mins * 60 + parseInt(secondsDisplay.textContent);
        if(answered){
            secs = secs;
            clock.classList.add('blur');
        } else {
            clock.classList.remove('blur');
      secs = secs - 1;
        }
      //console.log('secs= ' + secs);
      if(secs % 60 < 10){
        secondsDisplay.textContent = "0" + secs % 60;
      } else {
      secondsDisplay.textContent = secs % 60;}
      minutesDisplay.textContent = Math.floor( secs / 60 );
  
      if(parseInt(minutesDisplay.textContent) < 0) {
        clearInterval(interval);
        gameOver();
      }
  
    }, 1000);
  }
// Game Over Screen
function gameOver() {
        if(secs < 0){
            secs = 0;
            results.lastElementChild.innerHTML = "with " + secs + " seconds left";
        }
        var secsLeft = secs;
        results.firstElementChild.innerHTML = "You scored " + 100 * score / answers.length + "%";
        results.lastElementChild.innerHTML = "with " + secsLeft + " seconds left";
        results.classList.remove('hide');
        questContEl.classList.add('hide');
        clock.classList.add('hide');
        nxtBtn.classList.add('hide');
        startBtn.classList.remove("hide");
        startBtn.textContent = "Restart";
}
// Randomizes index of any array
function randomIndex(vect) {
    return Math.floor(Math.random() * vect.length);
}

// Leveraging string to boolean function from https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}
// Vector Building ---------------------------------------------------------------------------

//------------------------------------------------------------------------------------

startBtn.addEventListener("click", startFcn);
button.addEventListener("click", function(){
    if(answered){
    } else {
        selectAns();
    }
    });

nxtBtn.addEventListener("click", function(){
    if(answered){
    nxtPage();
    nxtQuest();
    }
});





