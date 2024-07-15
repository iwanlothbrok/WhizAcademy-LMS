import add from '../../assets/images/students/20.png'
import all from '../../assets/images/students/19.png'
import remove from '../../assets/images/graffits/17.png'
import edit from '../../assets/images/graffits/18.png'


const studentCards = [
    { id: 1, src: add, link: '/students/add', information: 'Добави' },
    { id: 2, src: all, link: '/students/all', information: 'Студенти' },
    // { id: 3, src: remove, link: '/page3', information: 'Изтрий' },
    // { id: 4, src: edit, link: '/page4', information: 'Промени' },
];

const studentTitle = 'Ученици'
export { studentCards, studentTitle };