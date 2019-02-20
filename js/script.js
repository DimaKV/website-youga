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

