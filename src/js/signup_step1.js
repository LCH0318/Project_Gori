function handleclearhidden(){
    const inputField = document.getElementById('name');
    const clearButton = document.getElementById('clear-btn');
    const nextButton = document.getElementById('next-btn');
    if(inputField.value.trim() !== ''){
        nextButton.classList.remove('disabled');
        nextButton.disabled = false;
        clearButton.classList.remove('hidden');
    }else{
        nextButton.classList.add('disabled');
        nextButton.disabled = true;
        clearButton.classList.add('hidden');
    }
}

function handleclear(){
    const inputField = document.getElementById('name');
    inputField.value = '';
    handleclearhidden();
}

