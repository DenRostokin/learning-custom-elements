import phones from 'mock/phones'

export const fetchPhone = ({ id }) => {
    const phone = phones.find(phone => phone.id == id)

    return { data: phone }
}
