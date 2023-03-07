const searchInput = document.querySelector('#search-input');
const tableBody = document.querySelector('#table tbody');
const formContainer = document.querySelector('#form');
let details = [];

var form = `<div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Enter Your email">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="save()">Save</button>
</div>`;


function table() {
    let table = `<table class="table">
  <thead>
    <tr>
      <th clsaa="col-1">ID</th>
      <th clsaa="col-3">Name</th>
      <th clsaa="col-4">Email</th>
      <th clsaa="col-2">Edit</th>
      <th clsaa="col-2">Delete</th>
    </tr>
  </thead>
  <tbody>`;
    for (let i = 0; i < details.length; i++){
        table = table + `<tr>
      <td>${details[i].ID}</td>
      <td>${details[i].name}</td>
      <td>${details[i].email}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
    </tr> `;
    };
    table = table+`</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
};
document.getElementById("form").innerHTML = form;
details = [];
getData();
table();

function getData(){
    let Data = localStorage.getItem("details");
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    };
};
//data in local storage
function setData() {
    localStorage.setItem("details", JSON.stringify(details));
};

function save() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");

    if (name.value == 0) {
        alert("name is Empty");
        return
    }
    let data = {
        ID: GenerateUniqueID(),
        name: name.value,
        email: email.value
    };
    details.push(data);
    setData();

    // console.log(details)
    // console.log(email.value)
    table();
    name.value = "";
    email.value = "";
};

function deleteData(index) {
    details.splice(index, 1);
    setData();
    table();

    // console.log('delete work')
    // console.log(details)
};

function edit(index) {
    let editForm = `<div>
  <div class="form-group">
    <label for="name">Update Name</label>
    <input type="text" value="${details[index].name}" class="form-control" id="newName" aria-describedby="emailHelp" placeholder="Update Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input type="email" value="${details[index].email}" class="form-control" id="newEmail" placeholder="Update Your email">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="update(${index})">Update</button>
</div>`;
    document.getElementById("form").innerHTML = editForm;
    // console.log('edit work');
};

function update(index) {
    let newName = document.getElementById('newName');
    let newEmail = document.getElementById('newEmail');

    details[index] = {
        name: newName.value,
        email: newEmail.value
    };
    setData();
    table();
    document.getElementById("form").innerHTML = form;
// console.log('update work')
// console.log(details)
}

function handleSearch(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredDetails = details.filter(detail => {
    return detail.ID.toLowerCase().includes(searchText) ||
           detail.name.toLowerCase().includes(searchText) ||
           detail.email.toLowerCase().includes(searchText);
  });
  const tableBody = document.querySelector('#table tbody');
  tableBody.innerHTML = '';
  filteredDetails.forEach((detail, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${detail.ID}</td>
      <td>${detail.name}</td>
      <td>${detail.email}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${index})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${index})">Delete</button></td>
    `;
    tableBody.appendChild(tr);
  });
}
function GenerateUniqueID(){      
  let ID;
  do ID = Math.floor(Math.random()* 1000000).toString().padStart(10,"0");
  while (localStorage.getItem(ID));
  return ID;
}

searchInput.addEventListener('input', handleSearch);









