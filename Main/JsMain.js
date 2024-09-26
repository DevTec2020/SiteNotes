document.addEventListener('DOMContentLoaded',function(){
    const input_Header = document.getElementById('input-NameLista')
    const btn_AddHeader = document.getElementById('btn-Newlista-header')
    const btn_SairHeader = document.getElementById('btn-logoff')

    const containerList = document.getElementById('conteinerList')


    const form = document.getElementById('list-form')
    
    const item_input = document.getElementById('item-input')
    //const btn_AddBoxLista = document.getElementById('addcheckbox')
    
    

    const btn_AddBotton = document.getElementById('btn-AddBotton')
    const btn_AddNota_Botton = document.getElementById('btn-ExtraNota')
    const btn_AddLista_Botton = document.getElementById('btn-ExtraLista')
    const btn_lixo = document.getElementById('btn-excluir')


    //Add Nota usando o input do header
    btn_AddHeader.addEventListener('click',function(){
        const nameNota = input_Header.value.trim();
        if(nameNota){
            createNota(nameNota)
            input_Header.value='';
        }
    })

    //Logoff
    btn_SairHeader.addEventListener('click',function(){
        const sair = confirm('Realmente deseja sair ?')
        if(sair){
            window.location.href='../index.html';
        }
        
    })
    


    //Cria Nota
    function createNota(name){
        const newNota=document.createElement('div')
        newNota.className='list'
        newNota.setAttribute('data-name', name)
        
            
        newNota.innerHTML=`
            <h4 class="titleCard">${name}</h4>
            <textarea class="cardTxtArea" placeholder="digite..."></textarea>
            <div class="div-btn-excluir" >
                <button id="btn-excluir" class="btn-excluir"><i class="fa-solid fa-trash "></i></button>
            </div>            
        `;
        containerList.appendChild(newNota)
    }

    //Cria Lista
    function createList(name){
        const listId = `list-${Date.now()}`;
        const newLista = document.createElement('div')
        newLista.className='list';
        newLista.setAttribute('data-name', name)
            
        newLista.innerHTML=`
            <h4 class="titleCard">${name}</h4>
            <form class='list-form' data-list-id="${listId}">
                <input type="text" id="item-input" class="item-input" placeholder="novo item..." style="width: 140px" required>
                <button type="submit" id="addcheckbox" class="btn-Newlista" style="margin-left: 5px">Add</button>
            </form>
            <ul  id="${listId}"></ul>
            <div class="div-btn-excluir" >
                <button id="btn-excluir" class="btn-excluir"><i class="fa-solid fa-trash "></i></button>
            </div>
        `;


        containerList.appendChild(newLista)




        // Adiciona o event listener ao novo formulário criado
        const newForm = newLista.querySelector('.list-form');
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newItemText = newForm.querySelector('#item-input').value.trim();
                if (newItemText) {
                    addItemToList(listId, newItemText);
                    newForm.querySelector('#item-input').value = '';
                }
        });
    }



    //Adiciona Item na Lista
    function addItemToList(listId, text) {
        const idDaLista = document.getElementById(listId);
        const li = document.createElement('li')
        const checkbox = document.createElement('input')
        checkbox.type='checkbox';

        checkbox.addEventListener('change',function(){
            if (this.checked){
                li.classList.add('completada');
                idDaLista.appendChild(li); // Coloca como concluida e joga para o fim da lista
            }
            else{
                li.classList.remove('completada');
                idDaLista.insertBefore(li, idDaLista.firstChild); //Joga para o inicio ao desmarcar
            }
        })



        li.appendChild(checkbox)
        li.appendChild(document.createTextNode(text))
        idDaLista.appendChild(li)
    }

    // Adiciona o event listener ao formulário de exemplo existente
    form.addEventListener('submit', function(ev) {
        ev.preventDefault();
        const newItemText = item_input.value.trim();
        if (newItemText) {
            addItemToList('item-list', newItemText);
            item_input.value = '';
        }
    });
    

    //Botão excluir
    containerList.addEventListener('click', function(ev){
        if (ev.target.classList.contains('btn-excluir') || ev.target.closest('.btn-excluir')) {
            // Encontra a div pai mais próxima com a classe 'list'
            const notaDiv = ev.target.closest('.list');
            const confirma = confirm(`confirma a exclusão da "${notaDiv.getAttribute('data-name')}" ?`)
            
            // Remove a div pai com a nota ou lista correspondente
            if (confirma && notaDiv) {
                notaDiv.remove();
                console.log(`Nota ou lista com data-name "${notaDiv.getAttribute('data-name')}" foi removida.`);
            }
        }
    })




    //Button footer
    btn_AddBotton.addEventListener('click', function() {
        extraButtons_Toggle();
    });

    function extraButtons_Toggle(){
        document.getElementById('extraButtons').classList.toggle('hidden')
    }

    btn_AddNota_Botton.addEventListener('click',function(){
        const inputPrompt=prompt('Digite o nome da Nota')

        if(inputPrompt){
            createNota(inputPrompt)
            extraButtons_Toggle();
        }
        else{
            alert ('Digite o nome da Nota')
            extraButtons_Toggle();
        }
    })

    
    btn_AddLista_Botton.addEventListener('click',function(){
        const inputPrompt=prompt('Digite o nome da Lista')

        if(inputPrompt){
            createList(inputPrompt)
            extraButtons_Toggle();
        }
        else{
            alert ('Digite o nome da Lista')
            extraButtons_Toggle();
        }
    })


})