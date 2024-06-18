document.addEventListener('DOMContentLoaded',function(){
    const input_Header = document.getElementById('input-NameLista')
    const btn_AddHeader = document.getElementById('btn-Newlista-header')
    const containerList = document.getElementById('conteinerList')


    const form = document.getElementById('list-form')
    const item_list = document.getElementById('item-list')
    const item_input = document.getElementById('item-input')
    const btn_AddBoxLista = document.getElementById('addcheckbox')
    
    

    const btn_AddBotton = document.getElementById('btn-AddBotton')
    const div_extraButtons = document.getElementById('extraButtons')
    const btn_extraNota = document.getElementById('btn-ExtraNota')


    //Add Nota usando o input do header
    btn_AddHeader.addEventListener('click',function(){
        const nameNota = input_Header.value.trim();
        if(nameNota){
            createNota(nameNota)
            input_Header.value='';
        }
    })

    //Cria Nota
    function createNota(name){
        const newNota=document.createElement('div')
        newNota.className='list'
            
        newNota.innerHTML=`
            <h4 class="titleCard">${name}</h4>
            <textarea class="cardTxtArea"></textarea>
        `;
        containerList.appendChild(newNota)
    }

    //Cria Lista
    function createList(name){
        const listId = `list-${Date.now()}`;
        const newLista = document.createElement('div')
        newLista.className='list';
            
        newLista.innerHTML=`
            <h4 class="titleCard">${name}</h4>
            <form class='list-form' data-list-id="${listId}">
                <input type="text" id="item-input" placeholder="Adicione um novo item..." required>
                <button type="submit" id="addcheckbox" class="btn-Newlista">Adicionar</button>
            </form>
            <ul  id="${listId}"></ul>
        `;


        containerList.appendChild(newLista)


        // Adiciona o event listener ao novo formulário criado
        const newForm = newLista.querySelector('.list-form');
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newItemText = newForm.querySelector('#item-input').value.trim();
                if (newItemText) {
                    addItemToDOM(listId, newItemText);
                    newForm.querySelector('#item-input').value = '';
                }
        });
    }



    //Adiciona Item no DOM
    function addItemToDOM(listId, text) {
        const itemList = document.getElementById(listId);
        const li = document.createElement('li')
        const checkbox = document.createElement('input')
        checkbox.type='checkbox';
        li.appendChild(checkbox)
        li.appendChild(document.createTextNode(text))
        itemList.appendChild(li)
    }

    // Adiciona o event listener ao formulário de exemplo existente
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newItemText = item_input.value.trim();
        if (newItemText) {
            addItemToDOM('item-list', newItemText);
            item_input.value = '';
        }
    });
    

    //Button footer
    btn_AddBotton.addEventListener('click', function() {

            
        const btn_AddNota_Botton = document.createElement('button');
        btn_AddNota_Botton.textContent = 'Nota';
        btn_AddNota_Botton.className = 'btn-ExtraNota';
        btn_AddNota_Botton.id='btn-ExtraNota';

        
        const btn_AddLista_Botton = document.createElement('button');
        btn_AddLista_Botton.textContent = 'Lista';
        btn_AddLista_Botton.className = 'btn-ExtraLista';
        btn_AddLista_Botton.id='btn-ExtraLista'

        div_extraButtons.appendChild(btn_AddNota_Botton);
        div_extraButtons.appendChild(btn_AddLista_Botton);


        btn_AddNota_Botton.addEventListener('click',function(){
            const inputPrompt=prompt('Digite o nome da Nota')
    
            if(inputPrompt){
                createNota(inputPrompt)
                div_extraButtons.removeChild(btn_AddNota_Botton)
                div_extraButtons.removeChild(btn_AddLista_Botton)
                
            }
            else{
                alert ('Digite o nome da Nota')
            }
        })

        btn_AddLista_Botton.addEventListener('click',function(){
            const inputPrompt=prompt('Digite o nome da Lista')
    
            if(inputPrompt){
                createList(inputPrompt)
                div_extraButtons.removeChild(btn_AddNota_Botton)
                div_extraButtons.removeChild(btn_AddLista_Botton)
                
            }
            else{
                alert ('Digite o nome da Lista')
            }
        })

        

    });


})