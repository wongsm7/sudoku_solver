let randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let sample = (arr: Array<number>, n: number): Array<number> => {
    let output = []
    for (let i = 0; i < n; i++) {
        let temp = randomNumber(0, arr.length - 1)
        output.push(arr[temp])
        arr.splice(temp, 1)
    }
    return output
}

export { randomNumber, sample }