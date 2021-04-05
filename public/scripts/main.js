const mountNode = document.getElementById('mount');

fetch('/api/v1/cars', {
  headers: { 
    'Content-Type': 'application/json'
  }
}).then(resp => resp.json())
.then((cars) => {
  const ul = document.createElement('ul');
  for(const car of cars) {
    const li = document.createElement('li');
    li.classList.add('car');
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = car.avatar_url;
    avatar.alt = car.name;
    li.append(avatar);
    const desc = document.createElement('div');
    desc.textContent = `${car.name} (${car.bhp})`;
    li.append(desc);
    ul.append(li)
  }
  mountNode.innerHTML = "";
  mountNode.append(ul);
})
.catch((err) =>{
  console.error(err);
  mountNode.textContent = err.message || err.statusCode;
});

const addForm = document.forms['addForm'];

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const FD = new FormData(addForm);
  const data = Object.fromEntries(FD);
  console.log("🚀 ~ file: main.js ~ line 36 ~ addForm.addEventListener ~ data", data)
  
  fetch('/api/v1/cars', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp;
    }
  })
  .then((car) => {
    alert(`${car.name} added`)
  })
  .catch((err) =>{
    console.error(err);
    alert(err.message || err.statusCode);
  });
});