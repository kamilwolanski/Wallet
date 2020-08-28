const cancelBtn = document.querySelector('.cancel')
const wrapper = document.querySelector('.wrapper');
const modalShadow = document.querySelector('.modal-shadow');
const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const nameOfTransaction = document.querySelector('#transaction-name');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const profits = document.querySelector('.profits');
const expenses = document.querySelector('.expenses');
const deleteBtn = document.querySelector('.delete');
const wallet = document.querySelector('.wallet');
const inputs = document.querySelectorAll('input');
const walletColor = document.querySelector('.walletColor');


const walletIcons = {
    'icons': {"income":'fas fa-money-bill-wave', "shopping":'fas fa-shopping-cart', "cino":'fas fa-film', "restaurant":'fas fa-utensils', "bills":'fas fa-file-invoice', "fuel":'fas fa-gas-pump'}
}

let moneyInWallet = 0;

const cancelModal = ()=>{
    wrapper.style.display = 'block';
    modalShadow.style.visibility = "hidden";
}

const showModal = ()=>{
    wrapper.style.display = 'none';
    modalShadow.style.visibility = "visible";

}

const add = ()=>{
    const name = nameOfTransaction.value;
    const amountValue = amount.value;
    const categoryValue = category.value;
    
    const isValid = checkFormInput();

    if(isValid){
        wrapper.style.display = "block";
        modalShadow.style.visibility = "hidden";
        addTransaction(name, amountValue, categoryValue);

        const panel = document.querySelectorAll('.panel');
        const closeBtns = document.querySelectorAll('.fa-times');


        const deleteAll = ()=>{
            moneyInWallet = 0;
            wallet.textContent = moneyInWallet;
            walletColor.style.color = "white";
            wallet.style.color = "white";
            panel.forEach(el=>{
                el.remove();
            })
        }
        deleteBtn.addEventListener('click', deleteAll);

        for(const closeBtn of closeBtns){
            closeBtn.addEventListener('click', closePanel);
        }
        
    }
    changeColorInWallet();


}

const checkFormInput = ()=>{
    let isValid = true;

    inputs.forEach(el =>{
        if(el.value === ""){
            el.parentElement.childNodes[3].style.color = "red";
            isValid = false;
        }else{
            clearError(el, 3);
        }
        
    })
    if(amount.value.includes('-')){
        amount.parentElement.childNodes[3].style.color = "red";
        isValid = false;
    }
    if(category.value === ""){
        category.parentElement.childNodes[7].style.color = "red";
        isValid = false;
    }else{
        clearError(category, 7)
    }
    return isValid;
 
}

const clearError = (el, index)=>{
    el.parentElement.childNodes[index].style.color = "white";
}
const closePanel = (e)=>{
    const valueOfElement = e.target.parentElement.childNodes[0].textContent

    if(e.target.parentElement.parentElement.parentElement.classList[1] == "profits"){
        moneyInWallet -= parseFloat(valueOfElement.slice(2, valueOfElement.length));
    }else{
        moneyInWallet += parseFloat(valueOfElement.slice(2, valueOfElement.length));
    }

    wallet.textContent = moneyInWallet;

    changeColorInWallet();
    e.target.parentElement.parentElement.remove();

}

const changeColorInWallet = ()=>{
    if(moneyInWallet < 0){
        walletColor.style.color = "red";
        wallet.style.color = "red";
    }else if(moneyInWallet > 0){
        walletColor.style.color = "#00e600";
        wallet.style.color = "#00e600";
    }else{
        walletColor.style.color = "white";
        wallet.style.color = "white";
    }
}

const addTransaction = (name, amount, category)=>{
    const div = document.createElement('div');
    div.setAttribute('class', `panel`);    

    const stworzReszte = (znak)=>{
        const h3First = document.createElement('h3');
        h3First.innerHTML = `<i class="${walletIcons.icons[category]}"></i> ${name}`;
        div.appendChild(h3First);
    
        const h3Second = document.createElement('h3');
        h3Second.innerHTML = `<span class = "kwota"> ${znak} ${amount}</span> zł <i class="fas fa-times"></i>`;
        div.appendChild(h3Second);
    }
    if(category === "income"){
        profits.appendChild(div);
        moneyInWallet += parseFloat(amount);
        wallet.textContent = moneyInWallet.toFixed(2);
        stworzReszte("+");
        
    }else{
        expenses.appendChild(div);
        moneyInWallet -= parseFloat(amount);
        wallet.textContent = moneyInWallet.toFixed(2);
        stworzReszte("-");  
    }


  


}


cancelBtn.addEventListener('click', cancelModal);
addBtn.addEventListener('click', showModal);
saveBtn.addEventListener('click', add);