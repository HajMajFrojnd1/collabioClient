

const formatProjectDate = (date) => {
    const [first, second] = date.toLocaleString ().split('T');
    const [f,s,t] = first.split("-");
    return t + "." + s + "." + f + "  " + second.split(".")[0];
}

export {formatProjectDate}