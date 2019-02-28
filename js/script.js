const info = document.querySelector('.info');
const tabsContent = document.querySelectorAll('.info-tabcontent'); //содержание табов
const tabTitles = document.querySelectorAll('.info-header-tab'); // заглавия пунктов табов

function hide (num) {
    for (let i = 0; i < tabsContent.length; i++){
        if( i == num) continue;
        tabsContent[i].classList.add('hide');
    }
}

function show(num) {
    tabsContent[num].classList.remove('hide');
}


hide(0);

info.addEventListener('click', function(e){
    if (e.target.classList.contains('info-header-tab')) {
       for(let i = 0; i < tabTitles.length; i++){           
           if(e.target.innerText == tabTitles[i].innerText){
               show(i);
               hide(i);
               break;
           }
       }
    }
});


//==========TIMER==========================================================

//const deadline = '2019-03-01';

//вычисляем значения секунд, минут, часов на данный момент
function getTime(endtime){
    let timeRemain = Date.parse(endtime) - Date.parse( new Date() );
    let seconds = Math.floor( (timeRemain / 1000) % 60 );
    let minutes = Math.floor( (timeRemain / 1000 / 60) % 60 );
    //let hours = Math.floor( (timeRemain / 1000 / 60 / 60) );
    let hours = Math.floor(  (timeRemain /1000 / 60 / 60) % 24 );
    let days = Math.floor(timeRemain /1000/60/60/24);
    if (seconds/10 < 1) seconds = '0' + seconds;
    if (minutes/10 < 1) minutes = '0' + minutes;
    if (hours/10 < 1) hours = '0' + hours;
    if (days/10 < 1) days = '0' + days;


    return {
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds,
        'timeRemain' : timeRemain
    };

}


function timer (id, deadline) {
    let t = document.querySelector(id);
    let days = t.querySelector('.days');    
    let hours = t.querySelector('.hours');
    let minutes = t.querySelector('.minutes');
    let seconds = t.querySelector('.seconds');
    let timerID = setInterval(updateTimer, 1000);

    //текущие значение времени выводим на страницу
    function updateTimer(){
        let cTime = getTime(deadline);
        
        //проверяем не закончилась ли акция
        if(cTime.timeRemain <= 0) {
            clearInterval(timerID);
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        } else {
            days.textContent = cTime.days;
            hours.innerHTML = cTime.hours;
            minutes.innerHTML = cTime.minutes;
            seconds.innerHTML = cTime.seconds;
        }

        
    }
}

//инициализируем таймер обратного отсчета
timer('#timer', '2019-03-03 9:30');
