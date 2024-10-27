function title_keydown(){
    if(window.event.keyCode==13){
        let title = document.getElementById('title').value;
        title.value = title.replace('\n','');
    }
}

const citys =  ["서울", "경기", "충남", "충북", "강원", "서울", "경기", "충남", "충북", "강원","서울", "경기", "충남", "충북", "강원","서울"];
const regions = ['전체',"강남"];
addDiv();
function addDiv(){
    let container = document.getElementById('citys_list');
    citys.forEach(city => {
        let newDiv = document.createElement('input');
        // let label = document.createElement('label');
        newDiv.type = 'button'
        newDiv.value = city;
        newDiv.name = city;
        // label.textContent = city; 
        container.appendChild(newDiv);
        // container.appendChild(label);
    });
    let container1 = document.getElementById('regions_list');
    for(let i=0; i<15; i++){
        for(let j=0; j<=1; j++){
            newDiv = document.createElement('button');
            newDiv.textContent = regions[j];
            container1.appendChild(newDiv);
        }
    }
}

const bottomSheetElements = document.querySelectorAll('.bottom-sheet-height');
const bottomSheet = document.querySelectorAll('.bottom-sheet');
for(let i=0; i<bottomSheetElements.length; i++){
    bottomSheetElements[i].addEventListener('click',function(){
        console.log("inside the block")
        const bottomSheetContent = document.getElementsByClassName('bottom-sheet-content')[i];
        // if(bottomSheetContent.classList.contains('active')){
        //     document.getElementsByClassName('complete_button')[i].classList.add('active');
        // }
        const height = document.body.clientHeight;
        const bottomSheetHeight = height - (height*0.1);
        bottomSheet[i].style.height = `${bottomSheetHeight}px`;
        bottomSheet[i].classList.add('active');
    })
}

document.getElementById('bottomSheet').addEventListener('click',function(event){
    if(event.target.tagName.toLowerCase() == 'input'){
        if (document.querySelectorAll("#citys_list .active").length > 0) {
            document.querySelector("#citys_list .active").classList.remove('active');
        }
        event.target.classList.add('active');
        if(event.target.classList.contains('active')){
            document.getElementsByClassName('complete_button')[0].disabled = false;
            document.getElementsByClassName('complete_button')[0].classList.add('active');
        }
    }
})
