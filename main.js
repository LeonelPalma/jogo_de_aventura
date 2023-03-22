function addData(userEl, emailEl, phoneEl, dateEl, sexEl){
    var tabela = document.getElementById("table") /// Realiza a chamada da tabela
    if(userEl.value == '' || emailEl.value == '' || phoneEl.value == '' || dateEl.value == ''){ /// Realiza tratamento caso algum campo esteja vazio
        alert('Fills in all fields to register.')
        return
    }

    var result = dataAtual() /// Função que pega data atual para tratamento da data inserida pelo utilizador
    if(dateEl.value > result){ /// Caso o valor retornado na variável result(data do dia de hoje, atualizando dia a dia) seja menor a data inserida, o mesmo recebe um alerta informando que a data é invalida, sendo necessário inserir novamente
        alert('The date of birth is invalid, please check and try again.')
        return
    }

    var nomesRegistados = document.getElementsByClassName("names"); /// Busca todos as classes "names" e armazena na variável 'nomesRegistados'
    for(var j = 0; j < nomesRegistados.length; j++){  /// Laço percorre todo o elemento para tentar identificar se tem algum nome repetido
        if(nomesRegistados[j].innerHTML === userEl.value){ /// Caso ele encontre, irá emitir um alerta ao utilizador e retornar, impedindo o registo do nome caso já esteja no sistema
            alert('The name you enter is invalid because it has already been used for registration, check, and try again.')
            return
        }
    }

    var validar_Email = validarEmail(emailEl.value) /// Variável recebe valor da função que valida o email
    if(validar_Email == false){ /// Caso retorne falso, significa que o email não é valido, sendo assim, informando ao usuário e solicitando a correção
        alert('The email you enter is invalid, check, and try again.')
        return
    }

    var emailsRegistados = document.getElementsByClassName("emails"); /// Busca todos as classes "emails" e armazena na variável 'emailsRegistados'
    for(var i = 0; i < emailsRegistados.length; i++){  /// Laço percorre todo o elemento para tentar identificar se tem algum email repetido
        if(emailsRegistados[i].innerHTML === emailEl.value){ /// Caso ele encontre, irá emitir um alerta ao utilizador e retornar, impedindo o registo do email caso já esteja no sistema
            alert('The email you entered is invalid because it has already been used for registration, check, and retry.')
            return
        }
    }
    
    var validar_Telefone = validarTelefone(phoneEl.value) /// A variável recebe um valor da função que valida o telefone
    if(validar_Telefone == false){ /// Caso retorno falso, significa que o telefone é invalido, sendo assim, informa ao utilizador para que seja feita a correção
        alert('The phone entered is invalid, check and try again.')
        return
    }
    
    var quantidadeLinhas = tabela.rows.length /// Verifico a quantidade de linhas usando o row.length
    var linha = tabela.insertRow(quantidadeLinhas) /// Insiro uma linha ao chamar a função
    // linha.addEventListener('click', excluirDado)

    /// insertCell realiza a inserção de um <td> hna tabela
    var cellUser = linha.insertCell(0)
    var cellEmail = linha.insertCell(1)
    var cellPhone = linha.insertCell(2)
    var cellDate = linha.insertCell(3)
    var cellSex = linha.insertCell(4)
    var Null = linha.insertCell(5)

    /// Atribui o valor inserido no formulário a tabela com seu respectivo valor e linha, assim como foi definido acima
    cellUser.innerHTML = userEl.value
    cellEmail.innerHTML = emailEl.value
    cellPhone.innerHTML = phoneEl.value
    cellDate.innerHTML = dateEl.value
    cellSex.innerHTML = sexEl.value
    Null.innerHTML = '<i class="fas fa-trash-alt"></i>'

    console.log(dateEl.value)

    cellDate.innerHTML = new Date(dateEl.value).toLocaleDateString('en', {timeZone: 'UTC'}) /// Realiza a troca da data do padrão yyyy-mm-dd para o padrão português dd/mm/yyyy
    /// OBS: {timeZone: 'UTC'} = https://stackoverflow.com/questions/32877278/tolocaledatestring-is-subtracting-a-day/32877402

    Null.setAttribute('onclick', `cleanData(this)`) /// Atribui esse atributo ao "Null", que será o conteudo na linha 33
    cellEmail.setAttribute('class', `emails`) /// Atribui a 'class' emails em todos os <td> que serão armazenados o email na tabela
    cellUser.setAttribute('class', `names`) /// Atribui a 'class' names em todos os <td> que serão armazenados o utilizador na tabela

    alert('Successful Registration.')

    cleanForm(userEl, emailEl, phoneEl, dateEl, sexEl) /// Chamada da função para limpeza do formulário após o preenchimento
}

function cleanData(element){
    var resultado = confirm('Do you really want to delete this registration?') /// Verifico com o utilizador se ele confirma essa ação, retornando true ou false
    if(resultado == true){
        // document.getElementById("tabela").deleteRow(numRow);
        element.parentElement.remove() /// Pego o pai/mae do element, que neste caso, é o tr, sendo assim, realizo a exclusão do mesmo
        alert('Successfully deleted registration!')
    }
    else{
        alert('Undeleted registration.')
    }
}

function cleanForm(userEl, emailEl, phoneEl, dateEl, sexEl){
    if(userEl.value == '' && emailEl.value == '' && phoneEl.value == '' && dateEl.value == ''){ /// Realiza tratamento caso algum campo esteja vazio
        alert('There is no information to be cleaned.')
    }
    else{
        userEl.value = ''
        emailEl.value = ''
        phoneEl.value = ''
        dateEl.value = ''
        sexEl.value = 'Other'
    }
}

function validarEmail(email){
    var condicoes = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; /// Utilizando regex, atribuio quais são os valores aceitaveis, onde esses são armazenados na variável condições
    return condicoes.test(email) /// Realiza um teste do email que é recebido por parâmetro e faz a verificacão se o mesmo é aceitável dentro das condições da variável condições, com isso, irá retornar o valor false ou true, onde é tratado da maneira correta dentro da função 'addData' 
}
/*
function validarTelefone(phone){
    var condicoes = /^\{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{3}$/; /// Utilizando regex, atribuio quais são os valores aceitaveis, onde esses são armazenados na variável condições
    return condicoes.test(phone) /// Realiza um teste do telefone que é recebido por parâmetro e faz a verificacão se o mesmo é aceitável dentro das condições da variável condições, com isso, irá retornar o valor false ou true, onde é tratado da maneira correta dentro da função 'addData' 
}
*/
function dataAtual(){ /// Lógica utilizada para sempre retornar a data do dia atualizado
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    if(dia < 10){
        dia = '0'+dia
    }
    if(mes < 10){
        mes = '0'+mes
    }

    var result = ano +'-'+ mes +'-'+ dia

    return result
}
/*
function mask(inputEl){ /// Função que realiza 'preenchimento automatico' no momento que o utilizador inserir os dados relacionado ao seu telefone
    var telefoneDigitado = inputEl.value

    var telefone = telefoneDigitado.replace(/\D/g, "");
    telefone = telefone.replace(/^0/, "");

    if(telefone.length > 9){
        telefone = telefone.replace(/^(\d\d)(\d{3})(\d{3})(\d{3}).*/, "($1) $2-$3");
    }
    else if(telefone.length > 4){
        telefone = telefone.replace(/^(\d\d)(\d{3})(\d{0,4}).*/, "($1) $2-$3");
    }

    else if(telefone.length > 3){
        telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    else{
        telefone = telefone.replace(/^(\d*)/, "($1");
    }

    if(telefone != inputEl.value){
        inputEl.value = telefone;
    }
}

function formatPattern(str, pattern, format, example) {
    if(!str || !pattern || !format || !example)
        return false

    const exToComplete = example.slice(str.length)
    const strCompleted = str + exToComplete
    const strCompletedFormated = strCompleted.replace(pattern, format)
    const strFormated = [...exToComplete].reverse().reduce((acc, e)=> 
        acc.slice(0, acc.lastIndexOf(e)), strCompletedFormated)
    
    return strCompletedFormated == strCompleted ? false : strFormated
}

function applyMaskTel({target:inputEl, data:lastChar}) {
    const pattern = /^(\d{2})(\d)(\d{4})(\d{4})$/
    const format = '($1) $2 $3-$4'
    const example = '11911111111'

    if(lastChar) {
        let value = inputEl.value.replace(/\D/g,'')
        if(value.length > example.length) {
            inputEl.value = inputEl.value.slice(0,-1)
            value = inputEl.value.replace(/\D/g,'')
        }

        const valFormated = formatPattern(value, pattern, format, example)
        inputEl.value = valFormated || inputEl.value.slice(0,-1)
        inputEl.selectionStart = inputEl.value.length
    }
}
*/
