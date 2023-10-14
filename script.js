
const btn = document.querySelector("#send");
const form = document.querySelector('form');
const errorDay = document.querySelector(".errorDay");
const errorMonth = document.querySelector(".errorMonth");
const errorYear = document.querySelector(".errorYear");

//Mensagens de erro
const empty = "This field is required";
const invalidDay = "Must be a valid Day";
const invalidMonth = "Must be a valid Month";
const invalidYear = "Must be a valid Year";
const invalidDate = "Must be a valid Date";


let hasErrorDay = new Boolean();
let hasErrorMonth = new Boolean();
let hasErrorYear = new Boolean();

const data = new Date(); 
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth() +1;
const diaAtual = data.getDate();
const horaAtual = data.toTimeString();
const dataAtual = new Date (anoAtual+ "-"+ mesAtual+"-"+diaAtual);

    btn.addEventListener("click", function(e){
        e.preventDefault();
        checkInputs();
    })
    

    function checkInputs() {
        const diaNasc = +form.day.value;
        const mesNasc = +form.month.value;
        const anoNasc = +form.year.value;

        //Checagem de dias

        if(diaNasc == "") {
            errorDay.textContent = empty;
            hasErrorDay = true;
        } 
        else if (diaNasc > 31 || diaNasc < 1) {
            errorDay.textContent = invalidDay;
            hasErrorDay = true;
        }
        else if (mesNasc === 4 || mesNasc === 6 || mesNasc === 9 || mesNasc === 11 && diaNasc === 31) {
            errorDay.textContent = invalidDate;
            hasErrorDay = true;
        }
        else if (mesNasc === 2 && diaNasc >= 30) {
            errorDay.textContent = invalidDay;
            hasErrorDay = true;
        }
        else if (diaNasc === 29 && mesNasc === 2 && anoNasc % 4 !== 0 || anoNasc % 100 == 0) {
            errorDay.textContent = invalidDate;
            hasErrorDay = true;
        }
        
        else {
            errorDay.textContent = "";
            hasErrorDay = false;
        }

        //Checagem de meses

        if(mesNasc == "") {
            errorMonth.textContent = empty;
            hasErrorMonth = true;
        }
        else if (mesNasc < 1 || mesNasc > 12) {
            errorMonth.textContent = invalidMonth;
            hasErrorMonth = true;
        }
        else {
            errorMonth.textContent = "";
            hasErrorMonth = false;
        }

        //Checagem anos

        if(anoNasc == "") {
            errorYear.textContent = empty;
            hasErrorYear = true;
        }
        else if (anoNasc < 0 || anoNasc > anoAtual) {
            errorYear.textContent = invalidYear;
            hasErrorYear = true;
        }
        else if (anoNasc === anoAtual && mesNasc > mesAtual) {
            errorYear.textContent = invalidDate;
            hasErrorYear = true;
        }
        else if (anoNasc === anoAtual && mesNasc === mesAtual && diaNasc > diaAtual) {
            errorYear.textContent = invalidDate;
            hasErrorYear = true;
        }
        else {
            errorYear.textContent = "";
            hasErrorYear = false;
        }

        alteraEstilos();
    }
    
    
 
    function alteraEstilos() {
        const labelDay = document.querySelector('[for="day"]');
        const labelMonth = document.querySelector('[for="month"]');
        const labelYear = document.querySelector('[for="year"]');

        //Estilo Dia
        if(hasErrorDay === true) {
            labelDay.classList.add("error");
        }
        else {
            labelDay.classList.remove("error");
        }

        //Estilo Meses
        if(hasErrorMonth === true) {
            labelMonth.classList.add("error");
        }
        else {
            labelMonth.classList.remove("error");
        }

        //Estilo Anos
        if(hasErrorYear === true) {
            labelYear.classList.add("error");
        }
        else {
            labelYear.classList.remove("error");
        }

        //Calcula a idade caso os inputs estejam corretos
        if (!hasErrorDay && !hasErrorMonth && !hasErrorYear) {
            calculaIdade()
        }
        else {
            document.querySelector('#totalYears').innerHTML = "--";
            document.querySelector('#totalMonths').innerHTML = "--";
            document.querySelector('#totalDays').innerHTML = "--";
        }
    }


function calculaIdade() {

    const diaNasc = +form.day.value;
    const mesNasc = +form.month.value;
    const anoNasc = +form.year.value;
    const dataNasc = new Date (anoNasc+ "-"+ mesNasc+"-"+diaNasc);
               
    const diasContados = (dataAtual - dataNasc)/1000/60/60/24;
    const totalAnos = Math.floor(diasContados/365.242)
    const totalMeses = Math.floor((diasContados%365.242)/30.4368333)
    const totalDias = Math.floor((diasContados%365.242)%30.4368333);
    
    document.querySelector('#totalYears').innerHTML = totalAnos;
    document.querySelector('#totalMonths').innerHTML = totalMeses;
    document.querySelector('#totalDays').innerHTML = totalDias;
}

