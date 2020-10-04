console.log("Successfully fetched js file")

//General variables
var currentCalcMode = 0;

//convert To Sec
function toSec( num, mode){
    var output = 0;
    var modeMap = {
        1: 1000, //Milisec to Sec
        2: 1, //Sec to Sec
        3: 60, //Minute to Sec
        4: 3600, //Hour to Sec
        5: 86400 //Day to Sec
    };

    for (var i in modeMap){
        if (modeMap[mode]){ //Valid convertion mode
            var secondConverted = num * modeMap[mode]; 
            console.log(mode+ ": " + secondConverted);
            output += secondConverted;
            console.log(output);
            return (output);
        } 
    }
}

/* BROKEN TIMER
OBJECTIVES:1)Make update timer 
var timer = function(duration, timeToMap){//duration(Sec), timeToMap(float), updateFrequency(milisec)
    var dateCurrent = new Date;
    var currentTime = {}; 
    //Placeholder for sec values
    var currentTimeSec = 0;  
    var endTimeSec;

    //Converting to Sec
    currentTime[4] = dateCurrent.getHours();
    currentTime[3] = dateCurrent.getMinutes();
    currentTime[2] = dateCurrent.getSeconds();
    console.log(currentTime[1]);

    for (var key in currentTime){
        currentTimeSec += toSec(currentTime[key], key);
    }

    //Set endTime
    endTime = currentTimeSec + duration;
    console.log("Current Time:" +Number(currentTimeSec) +"\n" +"End Time:" +endTime);

    while (endTime> currentTimeSec){
        currentTimeSec += (dateCurrent.getMilliseconds()/1000);
        console.log((currentTimeSec/ endTime) * timeToMap);
    }
    return((currentTimeSec/ endTime) * timeToMap);
}
*/

//Calculation Mode
function calcMode(){
    //
    //  General Variables
    //
    //Content Wrapper
    var inputWrapper = document.getElementById("contentWrapper");
    var inputWrapperHeightCom = window.getComputedStyle(inputWrapper);

    //Select Properties
    var select = document.getElementById("toCalculate");

    //Input Field Attribute
    var inputIstances = document.getElementsByTagName("input");
    var inputInstancesContainerDic = { //Master Dictionary
        0: inputIstances[0].parentElement.parentElement, //aInputContainer
        1: inputIstances[1].parentElement.parentElement, //bInputContainer
        2: inputIstances[2].parentElement.parentElement, //xxInputContainer
        3: inputIstances[3].parentElement.parentElement, //cInputContainer
        4: inputIstances[4].parentElement.parentElement, //equalInputContainer
        5: inputIstances[5].parentElement.parentElement //outputInputContainer
    };

    var inputInstancesDicCom = { //CSS Computed Dictionary
        0: window.getComputedStyle(inputInstancesContainerDic[0]), //aInputContainer
        1: window.getComputedStyle(inputInstancesContainerDic[1]), //bInputContainer
        2: window.getComputedStyle(inputInstancesContainerDic[2]), //xxInputContainer
        3: window.getComputedStyle(inputInstancesContainerDic[3]), //cInputContainer
        4: window.getComputedStyle(inputInstancesContainerDic[4]), //equalInputContainer
        5: window.getComputedStyle(inputInstancesContainerDic[5]) //outputInputContainer
    };

    //
    //  Script
    //
    //Calculation mode
    //Clearing Output field 
    for (key = 0; key <inputIstances.length; key++){
        inputIstances[key].value = "";
    }

    switch (select.selectedIndex){
        case 0: //Linear
            currentCalcMode = 0;

            //Div to hide
            if ((String(inputInstancesDicCom[2].display) || String(inputInstancesDicCom[3].display)) !="none"){ //[True]xxInputContainer and InputContainer is visble
                inputInstancesContainerDic[2].style.display = "none",
                inputInstancesContainerDic[3].style.display = "none";
            }

            //Resizing input field
            var inputInstanceHeight = (parseFloat((inputWrapperHeightCom).height) -parseFloat((inputInstancesDicCom[5]).height));
            inputInstanceHeight = (inputInstanceHeight/(Object.keys(inputInstancesContainerDic).length-3));
            console.log("Input Height(px): " +inputInstanceHeight);
            for (i =0; i <Object.keys(inputInstancesContainerDic).length -1; i++){
                inputInstancesContainerDic[i].style.height = String(inputInstanceHeight) +"px";
            }
            return(console.log(inputInstancesDicCom[0].height));
        case 1: //Quadratic
            currentCalcMode = 1;

            //Div to visible
            if ((String(inputInstancesDicCom[2].display) || String(inputInstancesDicCom[3].display)) =="none"){ //[True]xxInputContainer and InputContainer is invisible
                inputInstancesContainerDic[2].style.display = "flex",
                inputInstancesContainerDic[3].style.display = "flex ";
            }

            //Resizing input field
            var inputInstanceHeight = (parseFloat((inputWrapperHeightCom).height) -parseFloat((inputInstancesDicCom[5]).height));
            inputInstanceHeight = (inputInstanceHeight/(Object.keys(inputInstancesContainerDic).length-1));
            console.log("Input Height(px): " +inputInstanceHeight);
            for (i =0; i <Object.keys(inputInstancesContainerDic).length -1; i++){
                inputInstancesContainerDic[i].style.height = String(inputInstanceHeight) +"px";
            }
            return(console.log(inputInstancesDicCom[0].height));
        default: //Defaults to Linear
            currentCalcMode = 0;

            //Div to hide
            if ((String(inputInstancesDicCom[2].display) || String(inputInstancesDicCom[3].display)) !="none"){ //[True]xxInputContainer and InputContainer is visble
                inputInstancesContainerDic[2].style.display = "none",
                inputInstancesContainerDic[3].style.display = "none";
            }

            //Resizing input field
            var inputInstanceHeight = (parseFloat((inputWrapperHeightCom).height) -parseFloat((inputInstancesDicCom[5]).height));
            inputInstanceHeight = (inputInstanceHeight/(Object.keys(inputInstancesContainerDic).length-3));
            console.log("Input Height(px): " +inputInstanceHeight);
            for (i =0; i <Object.keys(inputInstancesContainerDic).length -1; i++){
                inputInstancesContainerDic[i].style.height = String(inputInstanceHeight) +"px";
            }
            return(console.log(inputInstancesDicCom[0].height));
    }
}
document.getElementById("toCalculate").addEventListener("blur", calcMode);

function calc(){
    //Usr inputs
    var aInput = document.getElementsByName("aInput")[0].value;
    var bInput = document.getElementsByName("bInput")[0].value;
    var xxInput = document.getElementsByName("xxInput")[0].value;
    var cInput = document.getElementsByName("cInput")[0].value;
    var equalInput = document.getElementsByName("equalInput")[0].value;

    //Output
    var outputContainer = document.getElementById("output");
    var outputValue = 0;
    var outputValue2 = 0;

    //Error msg
    var msgInvalid = "ERROR: Sila masukan nombor bulat atau perpuluhan sahaja";

    switch (currentCalcMode){
        case 0: //Linear
            outputValue = (((equalInput) - (bInput))/(aInput));
            outputContainer.value = "a = " + outputValue;
            return(console.log("Calculation Output:" +outputValue));
        case 1: //Quadratic
            outputValue = (((bInput) +Math.sqrt((((bInput) **2) - (4 *((aInput) *(cInput))))))/(2*(aInput)))//Positive
            outputValue2 = (((bInput) -Math.sqrt((((bInput) **2) - (4 *((aInput) *(cInput))))))/(2*(aInput)))//Positive
            outputContainer.value = ("Calculation Output 1: " +outputValue +"Calculation Output 2: " +outputValue2);
            return(console.log("Calculation Output 1: " +outputValue +"\nCalculation Output 2: " +outputValue2));
    }   
}

function copyToClipBoard(){
    var outputField = document.getElementById("output");
    outputField.value = "Lorem Ipsu Sit Amet";
    
    outputField.select();       
    var successfull = document.execCommand("copy");  
    var msg = successfull ? "Successfull" : "Unsuccessfull";
    console.log("execCommand was: " + msg);
}