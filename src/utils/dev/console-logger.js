export const s = {
    stomp: 'color: green; font-size: 1.2em; font-weight: 900;',
    context: 'color: orange; font-size: 1.2em; font-weight: 900;',
    api: 'color: purple; font-size: 1.2em; font-weight: 700;',
}

export const cl = (message, style) => {
    console.log(`%c${message}`, style)
}
