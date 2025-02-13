let hours = document.getElementById("hours");
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");

function myTimer(){
    const date = new Date(Date.now());
    hours.innerText = date.getHours().toLocaleString() + ": ";
    mins.innerText = date.getMinutes().toLocaleString() + ": ";
    secs.innerText = date.getSeconds().toLocaleString()
}

setInterval(myTimer, 1000)



