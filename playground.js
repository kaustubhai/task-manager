const add = (a, b) => {
    return new Promise((resolve, reject) => {
        resolve(a+b)
    })
}

const sum = async () => {
    const sum = await add(1, 2);
    console.log(sum)
}

sum()