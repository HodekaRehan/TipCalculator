const bill = document.querySelector('#bill');
const tipBtns = document.querySelectorAll('.btn');
const customTip = document.querySelector('#tip');
const people = document.querySelector('#people');
const tipAmount = document.querySelector('.tip-value');
const totalAmount = document.querySelector('.total-value');
const reset = document.querySelector('.reset');


//bill input
let billVal = 0;

bill.addEventListener('input', setBillValue);

function setBillValue() {
	billVal = parseFloat(bill.value);
	calculateTip();
}

//tip btns
let tipVal = 0.15;

tipBtns.forEach(function (btn) {
	btn.addEventListener('click', tipBtnClick);
});

function tipBtnClick(e){
	tipBtns.forEach(function (b) {

		//remove active class
		b.classList.remove('active');

		if(e.target.innerHTML == b.innerHTML) {
			//add active class
			b.classList.add('active')
			
			tipVal = parseFloat(b.innerHTML) / 100;
		}
	});

	customTip.value = "";

	calculateTip();
}

//custom tip
customTip.addEventListener('input', setCustomValue);

function setCustomValue(){
	tipVal = parseFloat(customTip.value / 100);

	//remove active class from btns
	tipBtns.forEach(function (btn) {
		btn.classList.remove('active');
	});

	if(customTip.value !== "") {
	    calculateTip()
	}
}

//people input
let peopleVal = 1; //set value

people.addEventListener('input', setPeopleValue);

function setPeopleValue() {
	peopleVal = parseFloat(people.value);

	if(peopleVal <= 0) {
		const inputField = people.parentElement;

		//set error class
		inputField.classList.add('error')
		
		//remove error class after 3 seconds
		setTimeout(function(){
			inputField.classList.remove('error');
		},3000);

		calculateTip()
	} 
}

//calculate tip
function calculateTip() {
	if(peopleVal >= 1) {
		let amountTip = billVal * tipVal / peopleVal;
		let amountTotal = billVal * (tipVal + 1) / peopleVal;

		tipAmount.innerHTML = '$' + amountTip.toFixed(2);
		totalAmount.innerHTML = '$' + amountTotal.toFixed(2);
	}
}


//reset all
reset.addEventListener('click', resetCalculation);

function resetCalculation() {
	bill.value = "0";
	setBillValue();
	tipBtns[2].click();
	people.value = '1';
	setPeopleValue();
}
