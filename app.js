const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropDown = document.querySelectorAll(".dropdown select")
let btn=document.querySelector("button")
let fromCurr=document.querySelector("#from")
let toCurr=document.querySelector("#to")
let msg = document.querySelector(".msg")

for(let select of dropDown){
  for(let currCode in countryList){
    let newOption = document.createElement("option")
    newOption.value=currCode;
    newOption.innerText=currCode;
    if(select.name==="from"&& currCode==="USD"){
      newOption.selected="selected"
    }
    else if(select.name==="to"&& currCode==="INR"){
      newOption.selected="selected"
    }
    select.append(newOption);
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target)
    })
  }
}


let updateFlag=(element)=>{
  let selected= element.value;
  let currCode=countryList[selected]
  let newSrc=`https://flagsapi.com/${currCode}/flat/64.png`
  let img=element.parentElement.querySelector("img")
  img.src=newSrc;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
const updateExchangeRate= async()=>{
 let amount = document.querySelector(".amount input")
 let amountVal=amount.value
 if(amountVal===0||amountVal<0){
  amountVal=1
 }
 let from = fromCurr.value.toLowerCase()
 let to = toCurr.value.toLowerCase()
 console.log(from)
 const URL = `${BASE_URL}/${from}.json`
 let response= await fetch(URL)
 let data = await response.json()
let rate=data[from][to]
let finalAmount = amountVal*rate;
msg.innerText=`${amountVal}  ${fromCurr.value} = ${finalAmount}  ${toCurr.value}`
}
window.addEventListener("load",updateExchangeRate)
