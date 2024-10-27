document.getElementById("bottomSheet").addEventListener('click',  function(event){
    if(event.target.tagName.toLowerCase() == "li"){
        document.getElementById("disabled_btn").classList.remove('hidden');
        const btn_name = event.target.innerText;
        const bottomSheet = document.getElementById("bottomSheet");
        document.getElementById("openSheetBtn").childNodes[0].textContent = btn_name;
        bottomSheet.classList.remove('active');
        const phone = document.getElementById('phone');
        phone.style.display = "block";
    }else{
        bottomSheet.classList.remove('active');
    }
});

const currentUrl = document.location.href;
const searchParam1 = new URL(currentUrl).searchParams;
const gender = searchParam1.get('gender');
document.getElementById(gender).checked = true;

const currentUrl2 = document.location.href;
const searchParam2 = new URL(currentUrl2).searchParams;
const name = searchParam2.get('name');
document.getElementById('name').value = name;

const currentUrl3 = document.location.href;
const searchParam3 = new URL(currentUrl3).searchParams;
const birth = searchParam3.get('birth');
document.getElementById('birth').value = birth;

const currentUrl4 = document.location.href;
const searchParam4 = new URL(currentUrl4).searchParams;
const phoneNumber = searchParam4.get('phoneNumber');
document.getElementById('input_number').value = phoneNumber;

const currentUrl5 = document.location.href;
const searchParam5 = new URL(currentUrl5).searchParams;
const phone_call = searchParam5.get('phone_call');
document.getElementById("openSheetBtn").childNodes[0].textContent = phone_call;

document.querySelectorAll("input[type='radio']").forEach(b => b.addEventListener("click", function(e) { console.log(b); e.preventDefault(); return false }));

function parse(str) {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
    return new Date(y,m,d);
}

function calcAge(birthDate){
    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth();
    var birthDay = birthDate.getDate();

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currnetMonth = currentDate.getMonth();
    var currnetDay = currentDate.getDate();

    var age = currentYear - birthYear;

    if(currnetMonth < birthMonth){
        age--;
    }

    else if(currnetMonth === birthMonth && currnetDay < birthDay){
        age--;
    }
    return age;
}

document.getElementById('next-btn').addEventListener("click", function(e) {
    e.preventDefault();
    const birth = document.getElementById('birth').value;
    const birthDate = parse(birth);
    const age = calcAge(birthDate);
    if(age < 50){
        const toast = document.getElementById('tost_message');
        toast.classList.add('active');

        setTimeout(function() {
            toast.classList.remove("active");
          }, 2000);
    }else{
        const toast = document.getElementById('tost_false_message');
        toast.classList.add('active');

        setTimeout(function() {
            toast.classList.remove("active");
          }, 2000);
    }
});

