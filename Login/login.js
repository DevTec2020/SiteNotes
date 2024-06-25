document.addEventListener('DOMContentLoaded',function(){
    const input_Login = document.getElementById('input-Login')
    const input_Senha = document.getElementById('input-Senha')
    const alertErro = document.getElementById('erro')
    const container_Btn_Logon= document.getElementById('button-container')
    const btn_cadastro = document.getElementById('button-cadastro')
    const btn_entrar = document.getElementById('button-Entrar')
   

    //Direciona para o cadastro ao clicar no botão de cadastro
    btn_cadastro.addEventListener('click',function(e){
        e.preventDefault();
        
        while (alertErro.firstChild) {
            alertErro.removeChild(alertErro.firstChild);
        }

        const btn_SalvaCad = document.createElement('button')
        btn_SalvaCad.textContent='Salvar';
        btn_SalvaCad.className='button-cadastro';
        btn_SalvaCad.id='btn_SalvaCad'

        input_Login.value='';
        input_Senha.value='';

        btn_entrar.remove();
        btn_cadastro.remove();
        
        container_Btn_Logon.appendChild(btn_SalvaCad);
     

        //Salva os dados de cadastro no LocalStorage
        btn_SalvaCad.addEventListener('click',function(){
            localStorage.setItem('login', input_Login.value);
            localStorage.setItem('senha', input_Senha.value);

            input_Login.value='';
            input_Senha.value='';

            btn_SalvaCad.remove();
            container_Btn_Logon.appendChild(btn_entrar)
            container_Btn_Logon.appendChild(btn_cadastro)

        })
    })

    //Libera entrada no site
    btn_entrar.addEventListener('click',function(e){
        e.preventDefault();
        
        const loginStorage = localStorage.getItem('login');
        const senhaStorege = localStorage.getItem('senha');
        const digLogin = input_Login.value;
        const digSenha = input_Senha.value;
        
        if(loginStorage===digLogin && senhaStorege===digSenha){
            window.location.href='./Main/main.html';
        }
        else{
            msgErro();
        }

    })

    //Msg de erro
    function msgErro(){
        const msg= document.createElement('div')
        msg.textContent='*Login ou senha inválida';

        // Limpa e deixa só uma mensagem de erro
        while (alertErro.firstChild) {
            alertErro.removeChild(alertErro.firstChild);
        }
        
        alertErro.appendChild(msg)
        input_Login.value='';
        input_Senha.value='';

    }


})