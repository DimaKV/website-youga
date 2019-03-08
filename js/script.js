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
            days.innerHTML = '00';
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



//================Модальное окно==================



//функция принимает класс кнопки и класс отображаемого окна

function openModal(btnClass, ovClass){
    let btnMore = document.querySelector(btnClass);
    let overlay = document.querySelector(ovClass);
    //класс с кнопкой закрытия должен называться  popup-close и быть вложенным элементом
    let close = overlay.querySelector('.popup-close');


    btnMore.addEventListener('click', function() {
        overlay.classList.add('show-overlay');
        //при открытии модального окна блокируется прокрутка страницы
        document.body.style.overflow = 'hidden'; 
    });
    
    close.addEventListener('click', () => {
        overlay.classList.remove('show-overlay');
        document.body.style.overflow = '';
    });

};

//вешаем модальное окно на кнопку "Узнать больше"
openModal('.more', '.overlay');

//вешаем модальное окно на кнопку "Узнать подробнее"
openModal('.description-btn', '.overlay');



//-------------ajax запрос -------------------

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};
// форма обратного звонка
let form = document.querySelector('.main-form');
let input = form.getElementsByTagName('input');
let statusMessage = document.createElement('div');

statusMessage.classList.add('status');

form.addEventListener('submit', function(event) {
    event.preventDefault(); //не позволяем перезагрузить страницу
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php'); // через post можно отправить данные на сервер
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    //преобразуем введенные данные в json
    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;
        }
    });

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
});


//--------SLIDER -------------//

let slideIndex = 1;
let slides = document.querySelectorAll('.slider-item');
let dotsWrap = document.querySelector('.slider-dots');
let dots = document.querySelectorAll('.dot');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

function showSlider(num = 0){
    slideIndex = num;
    slides.forEach( (item) => item.style.display = "none" );
    slides[slideIndex].style.display = "block";

    dots.forEach( (item) => item.classList.remove('dot-active') );
    dots[slideIndex].classList.add('dot-active');

}

function changeSlide(num) {
    slideIndex += num;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;
    showSlider(slideIndex);
}

next.addEventListener('click', () => { 
    changeSlide(1);
});

prev.addEventListener('click', () => { 
    changeSlide(-1);
});

dotsWrap.addEventListener('click', function(e){
    for (let i = 0; i < dots.length; i++){
        if ( e.target == dots[i]){ // зачем-то пишут еще проверку e.target.classList.contains('dot')
            showSlider(i);
        }
    }
});

showSlider(0);


//===============CALCULATOR================

let persons = document.querySelectorAll('.counter-block-input')[0];
let days = document.querySelectorAll('.counter-block-input')[1];
let totalSum = document.querySelector('#total');
let place = document.querySelector('#select');

let total = 0;
let costDay = 200; //цена одного дня
let p = '';
let d = '';
let pl = place.options[place.selectedIndex].value; // записывает значение текущего активного пункта

//инициализация при загрузке страницы
persons.value = '';
days.value = '';
totalSum.innerHTML = '0';


persons.addEventListener('input', function(e){
    p = this.value;
    //console.log(p);
    totalSum.innerHTML = getRezult();
});

days.addEventListener('input', function(){
    d = this.value;
    //console.log(d);
    totalSum.innerHTML = getRezult();
});

place.addEventListener('change', function(){
    pl = this.options[this.selectedIndex].value;
    //console.log(d);
    totalSum.innerHTML = getRezult();
});

function getRezult() {
    if (p != '' && d != ''){
        total = costDay * p * d * pl;
        //console.log(total);
        return total;
    }
    return 0;
}

