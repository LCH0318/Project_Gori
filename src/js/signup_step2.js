const currentUrl = document.location.href;
const searchParam = new URL(currentUrl).searchParams;
const name = searchParam.get('name');
document.getElementById('name').value = name;

function handlenextdisabled(){
    const birth = document.getElementById('birth').value;
    const next = document.getElementById('next-btn');
    if(birth.length === 8){
        next.classList.remove('disabled');
        next.disabled = false;
    }else{
        next.classList.add('disabled');
        next.disabled = true;
    }
}