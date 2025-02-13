
document.addEventListener('DOMContentLoaded',()=>{
    const  hour = document.getElementById('hours');
    const  minute = document.getElementById('minutes');
    const  second = document.getElementById('seconds');
    const form = document.getElementById("form");



let timer;
let totalSeconds = 0;

function startTimer(){
    if(totalSeconds > 0 && !timer){
        timer = setInterval(()=>{
            if(totalSeconds <= 0){
                clearInterval(timer);
                timer = null;
                return;
            }
            totalSeconds--;
            updateDisplay();
        }, 1000)
    }
}



function stopTimer(){
    clearInterval(timer);
    timer = null;

}


function resetTimer(){
    totalSeconds = 0;
    clearInterval(timer);
    timer = null;
    updateDisplay();
}

function updateDisplay(){
    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = Math.floor(totalSeconds % 60);

    document.getElementById('hour').innerHTML = String(hrs).padStart(2,"0");
    document.getElementById('min').innerHTML = String(mins).padStart(2,"0");
    document.getElementById('sec').innerHTML = String(secs).padStart(2,"0");
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let hours = parseInt(hour.value) || 0;
    let mins = parseInt(minute.value) || 0;
    let secs = parseInt(second.value) || 0;

    if(secs > 60 || mins >60){
        alert("Seconds or Minutes cannot be greater than 60");
        return;
    }

    totalSeconds = (hours*3600) + (mins*60) + secs;
    startTimer();
    updateDisplay();
});

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
});