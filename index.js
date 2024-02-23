// const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";

const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('button');
const fromCcy = document.querySelector('.from-select select');
const toCcy = document.querySelector('.to-select select');

for (let select of dropDown) {
    for (let ccycode in countryList) {
        let newOption = document.createElement('option');
        newOption.value = ccycode;
        newOption.innerText = ccycode;
        newOption.style.border='none';
        select.append(newOption);

        // for default dropdown
        if (select.name == 'from' && ccycode == 'USD') {
            newOption.selected = 'selected';
        } else if (select.name == 'to' && ccycode == 'INR') {
            newOption.selected = 'selected';
        }
    }

    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })

    // update ccy flags
    const updateFlag = (element) => {
        let curcode = element.value;
        let countryCode = countryList[curcode];
        let img = element.parentElement.querySelector('img');
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let input = document.querySelector('.amount input');
    let inputValue = input.value;

    if (inputValue === "" || inputValue < 1) {
        // inputValue=1;
        input.value = 1;
    }

    const url = `${baseUrl}/${fromCcy.value.toLowerCase()}/${toCcy.value.toLowerCase()}.json`;
    const response = await fetch(url);
    let data= await response.json();
    let rate = data[toCcy.value.toLowerCase()];
    let finalRate = inputValue*rate;

    let msg = document.querySelector('.msg');
    msg.innerText=`${inputValue} ${fromCcy.value} = ${finalRate} ${toCcy.value}`;

})

