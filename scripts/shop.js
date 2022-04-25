import { animate } from "./animate.js"

let players = [
    { name: "red_tank", img: "../png/red_tank.png", price: 15000 },
    { name: "gray_tank", img: "../png/gray_tank.png", price: 20000 }
]

let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.card_cont')

for (let player of players) {
    let card = document.createElement('div')
    card.classList.add('card')

    let picCont = document.createElement('div')
    picCont.classList.add('pic_cont')

    let pic = document.createElement('img')
    pic.classList.add('pic')
    pic.src = player.img

    picCont.appendChild(pic)
    card.appendChild(picCont)

    let priceCont = document.createElement('div')
    priceCont.classList.add('price_cont', 'yellow')
    priceCont.dataset.player = player.name

    if (localStorage.getItem(player.name.toLowerCase()) == 1) {
        priceCont.innerHTML = 'GOT IT'
    } else {
        let price = document.createElement('div')
        price.innerHTML = player.price
        priceCont.appendChild(price)
    }
    card.appendChild(priceCont)

    priceCont.onclick = () => {
        let price = priceCont.querySelector('div')

        if (priceCont.innerHTML != 'GOT IT') {
            if (Number(balance.innerHTML) <= Number(price.innerHTML)) { return }
            changeBalance(-Number(price.innerHTML))

            priceCont.innerHTML = 'GOT IT'
            localStorage.setItem('chosen_tank', player.name)

            localStorage.setItem(priceCont.dataset.player, 1)
        } else {
            localStorage.setItem('chosen_tank', player.name)
        }
    }

    cardCont.appendChild(card)
}

animate('.pic')

document.querySelector('body').classList.remove('hidden')

function changeBalance(amount) {
    localStorage.setItem('balance_tank', Number(localStorage.getItem('balance_tank')) + amount)
    balance.innerHTML = localStorage.getItem('balance_tank')
}