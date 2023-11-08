let minBars = 5;
let maxBars = 150;
let maxRange = 1;
let minRange = 40;
let numOfBars = 40;
let heightScale = 10;
let barArray = new Array(numOfBars);
let sleepInterval;
let finishAnimationSpeedMS = 100;

document.addEventListener("DOMContentLoaded", function() {
    randomize();

    document.getElementById("myRange").addEventListener("input", () => {
        sleepInterval = 100 - document.getElementById("myRange").value;
        document.getElementById("myRange");
     });
    
});


function randomize(){
    if(validateDataCountInput()){
        renderBars(createRandomArray());
    }

}

function createRandomArray(){
    let randomArray = new Array(numOfBars)
    for(let i = 0; i < numOfBars; i++){
       randomArray[i] = randomNum(minRange, maxRange)
    }
    barArray = randomArray;
    return randomArray;
}

function sort(){
    //checks to see if the dataCount is a valid entry
    validateDataCountInput();

    if(barArray.length != numOfBars){
        renderBars(createRandomArray());
    }

    if(document.getElementById("selectAlgorithm").value === "bubble"){
        bubbleSort(barArray);
    } else if(document.getElementById("selectAlgorithm").value === "selection"){
        selectionSort(barArray);
    } else if(document.getElementById("selectAlgorithm").value === "insertion"){
        insertionSort(barArray);
    }  else if(document.getElementById("selectAlgorithm").value === "random"){
        const options = document.getElementById("selectAlgorithm").options;
        const randomIndex = Math.floor(Math.random() * (options.length - 1));
        if(options[randomIndex].value === "bubble"){
            bubbleSort(barArray);
        } else if(options[randomIndex].value === "selection"){
            selectionSort(barArray); 
        } else if(options[randomIndex].value === "insertion"){
            insertionSort(barArray);
        } else{
            errorMessage.innerHTML = "ERROR " + options[randomIndex].value;
        }
        
    }

};

function validateDataCountInput(){
    if(Number(document.getElementById("dataCount").value)){
        let tempNum = Number(document.getElementById("dataCount").value);
        if(!Number.isInteger(tempNum)){
            errorMessage.innerHTML = "Enter integer data count";
            return false;
        } else if(tempNum < minBars || tempNum > maxBars){
            errorMessage.innerHTML = "Enter a value between " + minBars + " and " + maxBars;
            return false;
        } else{
            errorMessage.innerHTML = "";
            numOfBars = tempNum;
            return true;
        }
    } else{
        errorMessage.innerHTML = "Invalid data count";
        return false;
    }
}

function randomNum(min, max){
    return  Math.floor(Math.random() * (max - min) + min);
}

function renderBars(array) {
    dataContainer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      let bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = array[i] * heightScale + "px";
      bar.style.width = window.innerWidth / (1.5*numOfBars) +"px";
      bar.style.backgroundColor = "white";
      bar.style.marginLeft = "2px";
      bar.style.display = "inline-block";
      dataContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}








  
let bars = document.getElementsByClassName("bar");
async function bubbleSort(array) {

    await sleep(200);
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            if(array[j] > array[j+1]){
                bars[j].style.backgroundColor = "red";
                bars[j+1].style.backgroundColor = "red";
                await sleep(sleepInterval);
                let tempBar = array[j];
                array[j] = array[j+1];
                bars[j].style.height = array[j+1] * heightScale + "px";
                array[j+1] = tempBar;
                bars[j+1].style.height = tempBar * heightScale + "px";
            } else{
                bars[j].style.backgroundColor = "green";
                bars[j+1].style.backgroundColor = "green";
                await sleep(sleepInterval);
            }
            await sleep(sleepInterval);
            bars[j].style.backgroundColor = "white";
            bars[j+1].style.backgroundColor = "white";
        }
    }
    finishAnimation();
}

async function selectionSort(array) {

    await sleep(200);
    for (let i = 0; i < array.length - 1; i++) {
        await sleep(sleepInterval);
        let minIndex = i;
        bars[i].style.backgroundColor = "yellow";

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "red";
            await sleep(sleepInterval);
          if (array[j] < array[minIndex]) {
            if(minIndex != i){
                bars[minIndex].style.backgroundColor = "white";
            }
            minIndex = j;
            bars[minIndex].style.backgroundColor = "green";
          } else{
            bars[j].style.backgroundColor = "white";
          }
        }
        let temp = array[i];
        array[i] = array[minIndex];
        bars[i].style.height = array[minIndex] * heightScale + "px";
        array[minIndex] = temp;
        bars[minIndex].style.height = temp * heightScale + "px";
        
        bars[minIndex].style.backgroundColor = "white";
        bars[i].style.backgroundColor = "white";
      }
    finishAnimation();
}

async function insertionSort(arr) { 
    for (let i = 1; i < arr.length; i++) { 
        let key = arr[i]; 
        let j = i - 1; 
        bars[i].style.backgroundColor = "red";
        await sleep(sleepInterval);

        while (j >= 0 && arr[j] > key) {   
            bars[j].style.backgroundColor = "red";
            bars[j+1].style.backgroundColor = "white";
            arr[j + 1] = arr[j]; 
            bars[j + 1].style.height = arr[j] * heightScale + "px";
            j--; 
            await sleep(sleepInterval);
        } 

        bars[j+1].style.backgroundColor = "white";
        arr[j + 1] = key; 
        bars[j+1].style.height = key * heightScale + "px";
        bars[i].style.backgroundColor = "white";

    } 
    finishAnimation();
} 

function quick_Sort(origArray) {
	if (origArray.length <= 1) { 
        finishAnimation();
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
        bars[bars.length - 1].style.backgroundColor = "green";

		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
                bars[bars.length - 1].style.backgroundColor = "purple";
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}


async function finishAnimation(){
    let bars = document.getElementsByClassName("bar");
    for(let i = 0; i < bars.length;i++){
        bars[i].style.backgroundColor = "green";
        await sleep(finishAnimationSpeedMS/(i*0.3));
    }
}


