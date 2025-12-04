const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

/*for(codes in countryList) {
    console.log(codes,countryList[codes]);
}*/
for(let select of dropdowns) {

    for(code in currencyList) {
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USA") {
            newOption.selected="selected";
        }
        else if(select.name==="To" && code==="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);

    
}
select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
});


}
const updateFlag = (element) => {
    let code=element.value;
    let countryCode=flagMap[code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
    if(code==="EUR") {
        img.onerror =() => {
            img.src= "https://flagsapi.com/UN/flat/64.png";
        };
    }
    
};
btn.addEventListener("click",async (evt)=> {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=Number(amount.value);
    if(amountVal===""||amountVal<1) {
        amountVal=1;
        amount.value="";
        return;
    }
    console.log(currencyList[fromCurr.value],currencyList[toCurr.value]);
    console.log(amountVal);
    amount.value="";

    const URL = `${BASE_URL}/${currencyList[fromCurr.value].toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[currencyList[fromCurr.value].toLowerCase()][currencyList[toCurr.value].toLowerCase()];
    console.log(rate);

    let finalAmount = amountVal * rate;

    let result = document.querySelector(".msg .result");
    result.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`

});










