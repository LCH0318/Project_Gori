const currentUrl = document.location.href;
const searchParam1 = new URL(currentUrl).searchParams;
const name = searchParam1.get('name');
document.getElementById('name').value = name;

const searchParam2 = new URL(currentUrl).searchParams;
const birth = searchParam2.get('birth');
document.getElementById('birth').value = birth;

function handlenextdisabled(){
    const birth = document.getElementById('birth').value;
    const next = document.getElementById('next-btn');
    const gender = document.getElementById('gender');
    if(gender === 'male'||'female'){
        next.classList.remove('disabled');
        next.disabled = false;
    }else{
        next.classList.add('disabled');
        next.disabled = true;
    }
}