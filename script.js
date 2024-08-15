const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) || [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

//crud - CREATE, READ, UPDATE, DELETE

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

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${formatDate(client.data)}</td>
        <td>
            <input class="button-client" type="button" value="Editar"></input>
            <input class="button-client" type="button" value="Excluir"></input>
        </td>
    `
    document.querySelector('table>tbody').appendChild(newRow)
}

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field');
    fields.forEach(field => field.value = '')
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
    
    createClient(client)
    updateTable()
    createTable()
    clearFields()
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

updateTable()

//eventos
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveClient();
});
