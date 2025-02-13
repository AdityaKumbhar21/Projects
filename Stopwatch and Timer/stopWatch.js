const hr = document.getElementById('hour')
const min = document.getElementById('min')
const sec = document.getElementById('sec')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const reset = document.getElementById('reset')

let timer = false;

let hour = 0;
let minute = 0;
let seconds  = 0;
let interval = null;

function stopWatch(){
        seconds++;

        if(seconds == 60){
            minute++;
            seconds = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
            seconds = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = seconds; 


        if(seconds<10){
            secString = "0"+secString;
        }
        if(minute<10){
            minString = "0"+minString;
        }
        if(hour<10){
            hrString = "0"+hrString;
        }

        hr.innerHTML = hrString;
        min.innerHTML = minString;
        sec.innerHTML = secString;
}


start.addEventListener('click', ()=>{
    if(!timer){
        timer = true;
        interval = setInterval(stopWatch,1000)
    }
})

stop.addEventListener('click', ()=>{
    timer = false;
    clearInterval(interval);
    interval = null;

})

reset.addEventListener('click',()=>{
    timer = false;
    clearInterval(interval)
    interval = null;
    hr.innerHTML = "00";
    min.innerHTML = "00";
    sec.innerHTML = "00";
    hour = 0;
    minute = 0;
    seconds = 0;
})

