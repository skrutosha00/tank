import { animate } from "./animate.js";

animate('.button')

if (!localStorage.getItem('balance_tank')) {
    localStorage.setItem('balance_tank', 1000)
}

if (!localStorage.getItem('red_tank')) {
    localStorage.setItem('red_tank', 0)
}

if (!localStorage.getItem('gray_tank')) {
    localStorage.setItem('gray_tank', 0)
}

if (!localStorage.getItem('chosen_tank')) {
    localStorage.setItem('chosen_tank', 'common_tank')
}

if (!localStorage.getItem('row_tank')) {
    localStorage.setItem('row_tank', 0)
}