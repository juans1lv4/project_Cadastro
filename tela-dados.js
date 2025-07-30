import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pvxwrgrdrvdydaixizre.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eHdyZ3JkcnZkeWRhaXhpenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MTE0NTAsImV4cCI6MjA0NzI4NzQ1MH0.OWLZXJRHlHAjpfJfpR6UNsXsaWcytttWt92exHo9Hqo';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchClients() {
    const { data, error } = await supabase
        .from('user') 
        .select('id, Nome, cpf, tel1'); 

    if (error) {
        console.error('Erro ao buscar clientes:', error);
    } else {
        displayClients(data); 
    }
}

function displayClients(clients) {
    const tableBody = document.querySelector('#clientsTable tbody');
    tableBody.innerHTML = ''; 

    clients.forEach(client => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = client.Nome;
        row.appendChild(nameCell);

        const cpfCell = document.createElement('td');
        cpfCell.textContent = client.cpf;
        row.appendChild(cpfCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = client.tel1;
        row.appendChild(phoneCell);

        const detailsCell = document.createElement('td');
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Ver Detalhes';
        detailsButton.onclick = () => viewClientDetails(client.id); 
        detailsCell.appendChild(detailsButton);
        row.appendChild(detailsCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-edit');
        editButton.onclick = () => editClient(client.id);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('btn', 'btn-delete');
        deleteButton.onclick = () => deleteClient(client.id);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

async function deleteClient(id) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este cliente?');
    if (!confirmDelete) return;

    const { error } = await supabase
        .from('user') 
        .delete()
        .eq('id', id); 

    if (error) {
        console.error('Erro ao excluir o cliente:', error.message);
        alert('Erro ao excluir o cliente.');
    } else {
        alert('Cliente excluído com sucesso!');
        loadClients(); 
    }
}

async function editClient(id) {
    const { data: client, error: fetchError } = await supabase
        .from('user') 
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError) {
        console.error('Erro ao buscar o cliente:', fetchError.message);
        alert('Erro ao buscar o cliente.');
        return;
    }

    
    const newName = prompt('Novo Nome:', client.Nome);
    const newRg = prompt('Novo RG:', client.Rg);
    const newSigle = prompt("Novo Órgão Expedidor", client.sigle);
    const newUf = prompt("Nova UF", client.uf);
    const newNasc = prompt("Nova Data de Nascimento", client.nasc);
    const newCep = prompt("Novo CEP", client.cep);
    const newCity = prompt("Nova Cidade de Nascimento", client.city);
    const newLocal = prompt("Nova Endereço", client.local);
    const newNum = prompt("Novo Número da Casa", client.num);
    const newBairro = prompt("Novo Bairro", client.bairro);
    const newCdn = prompt("Cidade de Nascimento", client.cdn);
    const newProf = prompt("Nova Profissão", client.prof);
    const newCivil = prompt("Novo Estado Civil", client.civil);
    const newCpf = prompt("Novo CPF", client.cpf);
    const newTel1 = prompt("Novo Telefone", client.tel1);
    const newTel2 = prompt("Novo Telefone (Responsável)", client.tel2);
    const newCond = prompt("Nova Condição de Saúde", client.cond);
    const newMed = prompt("Nova Medicação", client.med);
    const newSaude = prompt("Se Considera Apto Para:", client.saude);
    const newMoney = prompt("Sua nova Renda é:", client.money);

    const { error: updateError } = await supabase
        .from('user')
        .update({
            Nome: newName || client.Nome,
            Rg: newRg || client.Rg,
            sigle: newSigle || client.sigle,
            uf: newUf || client.uf,
            nasc: newNasc || client.nasc,
            cep: newCep || client.cep,
            city: newCity || client.city,
            prof: newProf || client.prof,
            civil: newCivil || client.civil,
            cpf: newCpf || client.cpf,
            tel1: newTel1 || client.tel1,
            tel2: newTel2 || client.tel2,
            cond: newCond || client.cond,
            med: newMed || client.med,
            saude: newSaude || client.saude,
            money: newMoney || client.money,
            local: newLocal || client.local,
            cdn: newCdn || client.cdn,
            bairro: newBairro || client.bairro,
            num: newNum || client.num,
        })
        .eq('id', id);

    if (updateError) {
        console.error('Erro ao editar o cliente:', updateError.message);
        alert('Erro ao editar o cliente.');
    } else {
        alert('Cliente atualizado com sucesso!');
        loadClients(); 
    }
}

async function loadClients() {
    const { data: clients, error } = await supabase
        .from('user') 
        .select('*'); 

    if (error) {
        console.error('Erro ao carregar os clientes:', error.message);
        alert('Erro ao carregar os clientes.');
    } else {
        displayClients(clients); 
    }
}

function showModal(clientData) {
    const modal = document.getElementById('modal');
    const clientDetails = document.getElementById('clientDetails');
    clientDetails.textContent = JSON.stringify(clientData, null, 2);
    modal.style.display = 'flex';
}

function closeModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

async function viewClientDetails(clientId) {
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', clientId)
        .single();

    if (error) {
        console.error('Erro ao buscar os detalhes do cliente:', error);
    } else {
        showModal(data); 
    }
}

window.onload = () => {
    fetchClients();

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', closeModal);
    });
};
