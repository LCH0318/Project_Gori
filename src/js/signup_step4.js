document.getElementById("openSheetBtn").addEventListener('click', function(e){
    e.preventDefault();
    const bottomSheet = document.getElementById("bottomSheet");
    const bottomSheetContent = document.getElementsByClassName('bottomSheet-content')[0];
    const contentHeight = bottomSheetContent.offsetHeight - 20;
    bottomSheet.style.height = `${contentHeight}px`;
    bottomSheet.classList.add("active");
})

document.getElementById("bottomSheet").addEventListener('click',  function(event){
    if(event.target.tagName.toLowerCase() == "li"){
        document.getElementById("disabled_btn").classList.remove('hidden');
        const btn_name = event.target.innerText;
        const bottomSheet = document.getElementById("bottomSheet");
        document.getElementById("openSheetBtn").childNodes[0].textContent = btn_name;
        document.getElementById('hidden').value = btn_name;
        bottomSheet.classList.remove('active');
        const phone = document.getElementById('phone');
        phone.style.display = "block";

    }else{
        bottomSheet.classList.remove('active');
    }
});

function phonenumber(){
    const inputNumber = document.getElementById("input_number");
    const nextBtn = document.getElementById("next-btn");
    if(inputNumber.value.length === 11){
        nextBtn.classList.remove("disabled");
        nextBtn.disabled = false;
    }
}

const currentUrl = document.location.href;
const searchParam1 = new URL(currentUrl).searchParams;
const gender = searchParam1.get('gender');
document.getElementById(`${gender}`).checked = true;

const currentUrl2 = document.location.href;
const searchParam2 = new URL(currentUrl2).searchParams;
const name = searchParam2.get('name');
document.getElementById('name').value = name;

const currentUrl3 = document.location.href;
const searchParam3 = new URL(currentUrl3).searchParams;
const birth = searchParam3.get('birth');
document.getElementById('birth').value = birth;