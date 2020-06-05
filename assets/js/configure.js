var currComputePlan  = 1; 
var currStorageQty   = 128;
var currUsageHours   = 50;

var currComputePrice = 0;
var currStoragePrice = 0;

var hoursRangeElem = document.querySelector('#hours-range');
var horusElem = document.querySelector('#hrs');

var totalElem = document.querySelector('#total-cost');
var computeElem = document.querySelector('#compute-cost');
var storageElem = document.querySelector('#storage-cost');

function changeCompute(plan){
    currComputePlan = plan;

    for(planId = 1; planId <= 4; planId++){
        cardId = 'compute-' + planId;

        if(planId == plan){
            document.getElementById(cardId).classList.add('clicked');
        }
        else{
            document.getElementById(cardId).classList.remove('clicked');
        }
    }

    refreshPrice();
}

function changeHours(){
    currUsageHours = hoursRangeElem.value;
    horusElem.innerText = currUsageHours;
    refreshPrice();
}

function changeStorage(quantity){
    currStorageQty = quantity;

    plan = Math.log2(quantity) - 5;

    for(planId = 1; planId <= 4; planId++){
        cardId = 'storage-' + planId;

        if(planId == plan){
            document.getElementById(cardId).classList.add('clicked');
        }
        else{
            document.getElementById(cardId).classList.remove('clicked');
        }
    }

    refreshPrice();
}

function refreshPrice(){
    currHourlyPrice = 0.25*Math.pow(2, (currComputePlan-1));
    currComputePrice = currUsageHours*currHourlyPrice;
    currStoragePrice = 0.10*currStorageQty;
    console.log("Compute: " + currComputePrice + " @ " + currHourlyPrice + "$/hr");
    console.log("Storage: " + currStoragePrice);
    console.log("---------------");

    total = (currComputePrice + currStoragePrice).toFixed(2);
    totalElem.innerText = total;
}