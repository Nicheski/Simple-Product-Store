const beverages = [
    {
        id:1,
        img: 'images/skopsko.jpeg',
        title:'Skopsko 0.33',
        quantity: 'Quantity' + 20,

    },
    {
        id:2,
        img: 'images/coca-cola.jpeg',
        title:'Coca-Cola 0.25',
        quantity: 'Quantity' + 24,

    },
    {
        id:3,
        img: 'images/fanta.png',
        title:'Fanta 0.25',
        quantity: 'Quantity' + 24,

    },   {
        id:4,
        img: 'images/sprite.png',
        title:'Sprite 0.25',
        quantity: 'Quantity' + 24,

    }
    ,   {
        id:6,
        img: 'images/schw.png',
        title:'Schweepes 0.25',
        quantity: 'Quantity' + 24,

    },

    {
        id:7,
        img: 'images/smooth.jpeg',
        title:'Skopsko Smooth 0.25',
        quantity: 'Quantity' + 24,
    },

    {
        id:8,
        img: 'images/heineken.png',
        title:'Heineken 0.25',
        quantity: 'Quantity' + 24,

    }

]

const searchField = document.querySelector('#search');
const searchResultsContainer = document.querySelector('#searchresult');

searchField.addEventListener('input', (e) => {
  
  // if input field is empty, clear the search results
  if(e.target.value === '') {
     searchResultsContainer.innerHTML = '';
     return;
  }
  
  // filter the meals array
  const searchResults = beverages.filter(beverage => {
      return beverage.title.toLowerCase().includes(e.target.value.toLowerCase());
      
  });
  
  // before displaying the search results, clear the search results div
  searchResultsContainer.innerHTML = '';
  
  // display the titles of the meal objects that include the text entered in input field
  searchResults.forEach((element, index) => {
     const tr = document.createElement('tr');
     const tr1 = document.createElement('td');
     const td = document.createTextNode(element.title);
     const td1 = document.createTextNode(element.quantity);
     tr.classList.add('trr');
     tr1.classList.add('trr');
    
     tr.append(td)
     tr.textContent = (index + 1) + '. ' + element.title;

     tr1.append(td1)
     tr1.textContent = (index + 1) + '. ' + element.quantity;
     
     searchResultsContainer.appendChild(tr);
     searchResultsContainer.appendChild(tr1);
  });
});
const productTable = document.getElementById('table');

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productQuant = document.getElementById('quantity');
const productAdd = document.getElementById('addProduct');

initProductAddition(productAdd, productTable, productName, productPrice, productQuant);

function initProductAddition(button, table, name, price, quantity) {
  button.addEventListener('click', () => {
    fillProductsTable(table, name.value, price.value, quantity.value);
  });
}


function fillProductsTable(table, name, price, quantity) { 
      
    let tr = document.createElement('tr');

    createTd(name, tr, 'name', true);
    createTd(Number(price), tr, 'price', true);
    createTd(Number(quantity), tr, 'quantity', true);
    createTd(Number((price) * Number(quantity) *18) / 100, tr,  false);
    createTd(Number((price) * Number(quantity)* 18) / 100 +  (price) * Number(quantity)  , tr, 'cost', false);
 
    createTdWithRemoveBtn(table, tr);
    table.appendChild(tr);    
    
    createTotalField(table);  
  
}

function setTdEditable(table, tr, td, editable) {
  if (editable)  {
    td.addEventListener('click', function edit() {
    let text = this.innerHTML;
    this.innerHTML = '';

    let inp = document.createElement('input');
    inp.value = text;
    this.appendChild(inp)

    let that = this;
    inp.addEventListener('blur', () => {
      that.innerHTML = inp.value;
      self.addEventListener('click', edit);

      recalculateCost(table, tr);
    });

    this.removeEventListener('click', edit);
    });
  }
}

function recalculateCost(table, tr) {
  let price = Number(tr.querySelector('.price').innerHTML);
  let quantity = Number(tr.querySelector('.quantity').innerHTML);
  let cost = tr.querySelector('.cost');
  let totalCost = document.querySelector('p');
  cost.innerHTML = price * quantity;
  totalCost.innerHTML = computeTotalCost(table);
}

function createTd(text, tr, className, editable) {
  
  let td = document.createElement('td');
  td.innerHTML = text;
  tr.appendChild(td);  
  
  if (className != undefined) {
    td.classList.add(className);
  }
  
  setTdEditable(table, tr, td, editable);
  
}

function createTdWithRemoveBtn(table, tr) {
  
  let td = document.createElement('td');
  tr.appendChild(td);
  
  let btn = document.createElement('button');  
  btn.innerHTML = 'remove';
  btn.classList = 'rem';
  td.appendChild(btn);
  
  btn.addEventListener('click', () => {    
    table.removeChild(tr);
    
    let total = document.querySelector('p');      
    total.innerHTML = computeTotalCost(table);
    
    if (table.innerHTML == '') {
      total.parentNode.removeChild(total);
    }
    
  });    
}



function computeTotalCost(table) {
  
  let costs = table.querySelectorAll('.cost');
  let sum = 0;
  costs.forEach(elem => {
    sum += Number(elem.innerHTML);
  });
  return sum;
  
}

