const openEdit = () => {
    document.getElementById('save-edit').removeAttribute('hidden')
    document.getElementById('save').setAttribute('hidden','hidden')
}
const closeEdit = () => {
    document.getElementById('save-edit').setAttribute('hidden','hidden')
    document.getElementById('save').removeAttribute('hidden')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) || [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

//crud - CREATE, READ, UPDATE, DELETE

const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index, 1);
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
    return document.querySelector('.form').checkValidity()
}

//Interações com layout
const createTable = () => {
    if(readClient().length > 0){
        document.getElementById('tableClient').removeAttribute('hidden')
    }
}
createTable()

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${formatDate(client.data)}</td>
        <td>
            <input class="button-client button-editar" type="button" value="Editar" id="edit-${index}"></input>
            <input class="button-client button-excluir" type="button" value="Excluir" id="delete-${index}"></input>
        </td>
    `
    document.querySelector('table>tbody').appendChild(newRow)
}

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field');
    fields.forEach(field => field.value = '')
    document.getElementById('name').dataset.index = 'new'
}

const formatDate = (data) => {
    const dataFormatada = data.split('-');
    return `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`
    
}

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById("name").value,
      data: document.getElementById("birth-date").value,
    };
    const index = document.getElementById('name').dataset.index
    if(index == 'new'){
        createClient(client)
        updateTable()
        createTable()
        clearFields()
    } else{
        updateClient(index, client);
        updateTable();
        clearFields();
    }
  }
};

const clearTable = () => {
    const rows = document.querySelectorAll("table>tbody tr");
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('name').value = client.nome;
    document.getElementById('birth-date').value = client.data
    document.getElementById('name').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');
        if(action == 'edit'){
            editClient(index);
        } else {
            const client = readClient()[index]
            const response = confirm(`Você deseja excluir o usuário ${client.nome}?`)
            if (response){
                deleteClient(index)
                updateTable();
            }
        }
    }
}

updateTable()

//eventos
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveClient();
});

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)