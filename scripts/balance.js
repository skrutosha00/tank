let balanceField = document.querySelector('.balance_field')

let currency = document.createElement('img')
currency.src = '../png/currency.png'
balanceField.appendChild(currency)

let balance = document.createElement('div')
balance.classList.add('balance')
balanceField.appendChild(balance)
balance.innerHTML = localStorage.getItem('balance_tank')
