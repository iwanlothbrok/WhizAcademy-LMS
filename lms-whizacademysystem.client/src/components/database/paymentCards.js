import add from '../../assets/images/payment/23.png'
import all from '../../assets/images/payment/24.png'


const paymentCards = [
    { id: 1, src: add, link: '/payment/add', information: 'Добави' },
    { id: 2, src: all, link: '/payment/all', information: 'Плащания' },
    // { id: 3, src: remove, link: '/page3', information: 'Изтрий' },
    // { id: 4, src: edit, link: '/page4', information: 'Промени' },
];

const PaymentTitle = 'Плащания'
export { paymentCards, PaymentTitle };