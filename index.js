let flagsrc="https://flagsapi.com/IN/flat/64.png"

let dropdowns=document.querySelectorAll("select")

let btn=document.querySelector("form button")

let url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let fromcurr=document.querySelector(".from select")
let tocurr=document.querySelector(".to select")

let msg=document.querySelector(".msg")

for(select of dropdowns){     // for loop is used to insert option in both the select tags 
    for(currcode in countryList){
    let newopt=document.createElement("option")
    newopt.value=currcode;
    newopt.innerText=currcode;
    if(select.name==="from" && currcode==="INR"){
        newopt.selected="selected";
    }
    else if(select.name==="to" && currcode==="USD"){
        newopt.selected="selected";
    }
    select.append(newopt)
    }
    
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
    let currcode=element.value;
    let councode=countryList[currcode];
    let newflagsrc=`https://flagsapi.com/${councode}/flat/64.png`;
    // console.log(councode)
    let img=element.parentElement.querySelector("img")
    img.src=newflagsrc;

}

btn.addEventListener("click",async (event)=>{
    event.preventDefault()
    let amount=document.querySelector(".inp input")
    let amtval=amount.value
    if(amtval==="" || amtval<1){
        amtval=1
        amount.value=1
    }
    console.log(amtval)
    let newurl=`${url}/${fromcurr.value.toLowerCase()}.json`
    let response=await fetch(newurl)
    let data=await response.json()
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    let finalamt=amtval*rate;
    console.log(finalamt)
    msg.innerText=`${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`

})
