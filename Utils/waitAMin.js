module.exports = (time = Number /** in milliseconds */) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, time);
    })
}