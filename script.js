// New (correct)
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load" , () => {
    updateExchangeRate()
} )

for(let select of dropdowns) {
    for(currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from"  && currCode === "USD") {
        newOption.selected = "selected";
    }
    else if(select.name === "to"  && currCode === "INR") {
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
})
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const fetchUrl = `${BASE_URL}/${from}.json`;
    const response = await fetch(fetchUrl);
    const data = await response.json();

  const rate = data[from][to];
  console.log(rate);

  let finalAmount = (amount.value)*rate;
  msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
})
