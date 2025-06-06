const form = document.getElementById('cepForm');
const cepInput = document.getElementById('cep');
const submitButton = document.getElementById('submitButton');
const errorElement = document.getElementById('error');
const resultadoDiv = document.getElementById('resultado');

cepInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

async function buscarCep(event) {
    event.preventDefault();
    
    const cep = cepInput.value;
    
    if (cep.length !== 8) {
        mostrarErro('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Buscando...';
    esconderErro();
    resultadoDiv.style.display = 'none';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            mostrarErro('CEP não encontrado.');
            return;
        }

        preencherResultado(data);
    } catch (error) {
        mostrarErro('Ocorreu um erro ao buscar o CEP. Tente novamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Buscar CEP';
    }
}

function preencherResultado(data) {
    document.getElementById('cepResult').textContent = data.cep;
    document.getElementById('logradouro').textContent = data.logradouro || '-';
    document.getElementById('complemento').textContent = data.complemento || '-';
    document.getElementById('bairro').textContent = data.bairro || '-';
    document.getElementById('cidade').textContent = data.localidade || '-';
    document.getElementById('estado').textContent = data.uf || '-';
    
    resultadoDiv.style.display = 'block';
}

function mostrarErro(mensagem) {
    errorElement.textContent = mensagem;
    errorElement.style.display = 'block';
    resultadoDiv.style.display = 'none';
}

function esconderErro() {
    errorElement.style.display = 'none';
} 