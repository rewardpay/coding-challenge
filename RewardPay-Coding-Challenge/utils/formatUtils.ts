export const dollarFormatting = (dollar: number):string => {
    return `$${dollar.toLocaleString("en-US").split(".")[0]}`;
}

export const percentageFormatting = (percentageNumber: number):string => {
    return `${(percentageNumber * 100).toFixed(1)}%`;
}