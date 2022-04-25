import { animateOnce } from "./animate.js"

let body = document.querySelector('.cont')
let tankCont = document.querySelector('.tank')

let tank = document.createElement('img')
tank.src = '../png/' + localStorage.getItem('chosen_tank') + '.png'
tankCont.appendChild(tank)

let aims = [
    { type: 'stone_left', img: "../png/stone_left.png", location: [0, 378], ind: 2, dotLocation: [0 + 30, 378 + 30] },
    { type: 'stone_right', img: "../png/stone_right.png", location: [0, 521], ind: 3, dotLocation: [50, 521 + 30] },
    { type: 'tree', img: "../png/tree.png", location: [150, 124], ind: 1, dotLocation: [150 + 30, 124 + 70] },
    { type: 'tree', img: "../png/tree.png", location: [105, 358], ind: 3, dotLocation: [105 + 30, 358 + 30] },
    { type: 'tree', img: "../png/tree.png", location: [30, 184], ind: 1, dotLocation: [30 + 30, 184 + 30] },
    { type: 'tree', img: "../png/tree.png", location: [273, 254], ind: 2, dotLocation: [273 + 30, 254 + 30] }
]

for (let aim of aims) {
    let aimCont = document.createElement('div')
    aimCont.classList.add('aim_cont', aim.type)

    let aimPic = document.createElement('img')
    aimPic.src = aim.img
    aimCont.appendChild(aimPic)

    if (aim.type == 'stone_right') { aimCont.style.right = aim.location[0] + 'px' }
    else { aimCont.style.left = aim.location[0] + 'px' }
    aimCont.style.top = aim.location[1] + 'px'
    aimCont.style.zIndex = aim.ind

    let dot = document.createElement('div')
    dot.classList.add('dot')
    dot.dataset.type = aim.type
    dot.dataset.side = 'player'

    let dotPic = document.createElement('img')
    dotPic.src = '../png/aim.png'
    dot.appendChild(dotPic)

    if (aim.type == 'stone_right') { dot.style.right = aim.dotLocation[0] + 'px' }
    else { dot.style.left = aim.dotLocation[0] + 'px' }
    dot.style.top = aim.dotLocation[1] + 'px'

    body.appendChild(dot)
    body.appendChild(aimCont)
}

let playAgainButton = document.querySelector('.again')
let warning = document.querySelector('.warning')

let playing = false
let active = true
let prize = document.querySelector('.bet_cont .yellow')
let score = 0

for (let dot of document.querySelectorAll('.dot')) {
    dot.onclick = () => {
        if (!active) { return }
        dotHandler(dot)
    }
}

playAgainButton.onclick = () => {
    for (let aimCont of document.querySelectorAll('.aim_cont')) {
        aimCont.classList.remove('hidden')
    }

    for (let dot of document.querySelectorAll('.dot')) {
        dot.classList.remove('hidden')
        dot.dataset.side = 'player'
    }

    for (let enemy of document.querySelectorAll('.enemy')) {
        enemy.remove()
    }

    generateEnemies()

    playing = false
    active = true
    score = 0
    prize.innerHTML = 100
    warning.style.top = '-50%'
}

generateEnemies()

function generateEnemies() {
    let enemyDots = shuffle(document.querySelectorAll('.dot')).splice(3)

    for (let enemyDot of enemyDots) {
        enemyDot.dataset.side = 'enemy'
        let enemy = document.createElement('div')
        enemy.classList.add('enemy')

        let enemyPic = document.createElement('img')
        enemyPic.src = '../png/main_tank.png'
        enemy.appendChild(enemyPic)

        if (enemyDot.dataset.type == 'stone_right') { enemy.style.right = enemyDot.style.right }
        else {
            enemy.style.left = enemyDot.dataset.type == 'tree' ? Number(enemyDot.style.left.replace('px', '')) - 30 + 'px' : enemyDot.style.left
        }
        enemy.style.top = enemyDot.dataset.type == 'tree' ? Number(enemyDot.style.top.replace('px', '')) + 120 + 'px' : enemyDot.style.top
        enemy.classList.add('hidden')

        enemyDot.onclick = () => {
            dotHandler(enemyDot, enemy)
        }
        body.appendChild(enemy)
    }
}

function dotHandler(dot, enemy) {
    if (!active) { return }

    if (!playing) {
        if (Number(balance.innerHTML) >= 100) {
            playing = true
            changeBalance(-100)
        } else { return }
    }

    dot.classList.add('hidden')
    dot.nextElementSibling.classList.add('hidden')
    if (enemy) { enemy.classList.remove('hidden') }

    if (dot.dataset.side == 'enemy') {
        active = false
        localStorage.setItem('row_tank', 0)

        if (!score) { prize.innerHTML = 0 }
        setTimeout(() => {
            dot.dataset.side = 'player'

            warning.firstElementChild.innerHTML = prize.innerHTML != 0 ? 'Congrats!<br/>You have won<br/>' + prize.innerHTML : 'No way!<br/>Try again right now'
            warning.style.top = '300px'
            if (score) {
                animateOnce('.balance')
                changeBalance(Number(prize.innerHTML))
            }
        }, 1500);
    } else {
        score += 1
        prize.innerHTML = Number(prize.innerHTML) * (score + 1)
    }

    if (prize.innerHTML == 2400) {
        active = false

        if (localStorage.getItem('row_tank') != 2) {
            localStorage.setItem('row_tank', Number(localStorage.getItem('row_tank')) + 1)

            warning.firstElementChild.innerHTML = 'WOW<br/>You have ' + (3 - Number(localStorage.getItem('row_tank'))) + ' more victories<br/>to get jackpot'
            warning.style.top = '300px'
            changeBalance(Number(prize.innerHTML))
        } else {
            localStorage.setItem('row_tank', 0)
            changeBalance(1000000)

            warning.firstElementChild.innerHTML = 'Congrats!<br/>YOU HAVE WON JACKPOT'
            warning.style.top = '300px'
        }
    }
}

function changeBalance(amount) {
    localStorage.setItem('balance_tank', Number(localStorage.getItem('balance_tank')) + amount)
    balance.innerHTML = localStorage.getItem('balance_tank')
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}