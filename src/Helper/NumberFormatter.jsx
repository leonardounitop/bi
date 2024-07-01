export const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: "BRL"
});

export const decimalFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    grouping: {
        primary: 3,
        separator: '.'
    }
});
