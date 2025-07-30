
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


document.addEventListener('DOMContentLoaded', () => {
    
    const supabaseUrl = 'https://pvxwrgrdrvdydaixizre.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eHdyZ3JkcnZkeWRhaXhpenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MTE0NTAsImV4cCI6MjA0NzI4NzQ1MH0.OWLZXJRHlHAjpfJfpR6UNsXsaWcytttWt92exHo9Hqo';
    const supabase = createClient(supabaseUrl, supabaseKey)

    const form = document.querySelector('form');
    
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
    
        const formData = new FormData(form);
        const data = {
            Nome: formData.get('Nome'),
            Rg: formData.get('Rg'),
            nasc: formData.get('nasc'),
            cep: formData.get('cep'),
            city: formData.get('city'),
            local: formData.get('local'),
            num: formData.get('num'),
            bairro: formData.get('bairro'),
            uf: formData.get('uf'),
            sigle: formData.get('sigle'),
            cdn: formData.get('cdn'),
            prof: formData.get('prof'),
            civil: formData.get('civil'),
            cpf: formData.get('cpf'),
            tel1: formData.get('tel1'),
            tel2: formData.get('tel2'),
            cond: formData.get('cond'),
            med: formData.get('med'),
            saude: formData.get('saude'),
            money: formData.get('money'),
            alergia: formData.get('alergia') === 'yes' ? formData.get('outh') : 'Nenhuma',
            genero: formData.get('genero'),
        };
        
        try {
            const { error } = await supabase
                .from('user') 
                .insert([data]);
    
            if (error) {
                console.error('Erro ao salvar os dados:', error.message);
                alert('Erro ao salvar os dados. Tente novamente.');
            } else {
                alert('Cadastro realizado com sucesso!');
                form.reset();
            }
        } catch (err) {
            console.error('Erro ao conectar ao Supabase:', err);
            alert('Erro ao conectar ao servidor. Tente novamente.');
        }
    });

    function buscaCEP(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro de conexão');
                }
                return response.json();
            })
            .then(data => {
                const city = document.getElementById('city');
                const bairro = document.getElementById('bairro');
                const uf = document.getElementById('uf');
                const local = document.getElementById('local');

                if (city) city.value = data.localidade || '';
                if (bairro) bairro.value = data.bairro || '';
                if (uf) uf.value = data.uf || '';
                if (local) local.value = data.logradouro || '';
            })
            .catch(error => {
                console.error('Erro:', error);
            });

        }
        
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', () => {
            const cep = cepInput.value;
            if (cep) {
                buscaCEP(cep);
            }
        });
    }
    function formatarCPF (input){
        let cpf = input.value.replace(/\D/g, '');
    
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        input.value = cpf;
    }


    const handlePhone = (event) => {
        let value = event.target.value.replace(/\D/g, ''); 
    
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'); 
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3'); 
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2'); 
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1'); 
        }
    
        event.target.value = value;
    };

    const phoneInput = ["tel1", "tel2"];

    phoneInput.forEach(id => {
        const input = document.getElementById(id); 
        if (input) {
            input.addEventListener('input', handlePhone);
        }
    });
    
    
    
    
    function toggleEspecificar() {
        const isYesSelected = document.getElementById("yes").checked;
        const outField = document.querySelector(".outh");
        
        if (outField) {
            if (isYesSelected) {
                outField.style.display = "block";
                outField.setAttribute("required", "true"); 
            } else {
                outField.style.display = "none";
                outField.removeAttribute("required");  
            }
        }
    }
            window.toggleEspecificar = toggleEspecificar;
            window.formatarCPF = formatarCPF;
            window.buscaCEP = buscaCEP;

                    
    
});

    console.log("Script carregado com sucesso!");
    
    const forms = document.querySelector('form');
    if (!forms) {
        console.error('O formulário não foi encontrado. Verifique o seletor ou o momento de execução do script.');
    }
    
    
    
    

    
   
    
    
    

  
    
    
   
    
    
    
   



