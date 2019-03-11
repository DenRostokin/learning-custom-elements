import phones from 'mock/phones'

export const fetchPhones = ({ offset }) => Promise.resolve({ data: phones })
