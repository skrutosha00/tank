function animate(selector) {
    for (let node of document.querySelectorAll(selector)) {
        setInterval(() => {
            node.classList.add('anim')
            setTimeout(() => {
                node.classList.remove('anim')
            }, 500);
        }, 2500);
    }
}

function animateOnce(selector) {
    for (let node of document.querySelectorAll(selector)) {
        node.classList.add('anim')
        setTimeout(() => {
            node.classList.remove('anim')
        }, 500);
    }
}

export { animate, animateOnce }