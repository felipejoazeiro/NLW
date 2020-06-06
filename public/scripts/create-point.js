function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res=>res.json())
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = '<option value>Selecione a cidade</option>';
    citySelect.disabled = true;



    fetch(url)
    .then(res=>res.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta

const itensColeta = document.querySelectorAll(".items-grid li")
let itensSelecionados = []
const itemColetado = document.querySelector('input[name=items')


for(const item of itensColeta){
    item.addEventListener("click", mudarItemSelecionado)
}

function mudarItemSelecionado(event){
    const itemLi = event.target
    //adiciona ou remove uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //vereficar se axistem itens selecionados
    //pegar os itens selecionados

    const jaSelecionados = itensSelecionados.findIndex((item) => {
        const itemEncontrado = item == itemId //será true ou false
        return itemEncontrado
    })

    //se já estiver selecionado, tirar da seleção.
    if(jaSelecionados >= 0){
        //tirar da selecao
        const itensFiltrados = itensSelecionados.filter(item =>{
            const itemDiferente = item != itemId;
            return itemDiferente
        })
        itensSelecionados = itensFiltrados
    }else{
        //se não estiver selecionado, adicionar a selação.
        itensSelecionados.push(itemId)
    }
    console.log(itensSelecionados)
    
    //atualizar o campo escondido com os itens selecioandos.
    itemColetado.value = itensSelecionados
}