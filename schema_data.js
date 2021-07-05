const authorTbl = [
  { id: '6r5679cfr558a5cff1d81', firstName: 'Ram', lastName: 'Das', email: 'a@a.com', age: 36, gender: 'Male', isBestSeller: 'Yes', hobby: ['playing', 'singing'] },
  { id: '7r5674d92558a5cff1d81', firstName: 'Shyam', lastName: 'De', email: 'b@a.com', age: 46, gender: 'Male', isBestSeller: 'No', hobby: ['playing', 'singing'] },
  { id: '8r5674d92558a5cff123y', firstName: 'Sita', lastName: 'Dhor', email: 'c@a.com', age: 33, gender: 'Female', isBestSeller: 'Yes', hobby: ['dancing'] },
];

const bookTbl = [
  { id: '9j2374d92558a5cff1d81', name: 'book1', price: 360, aid: '6r5679cfr558a5cff1d81' },
  { id: '45e374d92558a5cff1d81', name: 'book2', price: 510, aid: '7r5674d92558a5cff1d81' },
  { id: '85r5674d92598rx8ff1d81', name: 'book3', price: 220, aid: '8r5674d92558a5cff123y' },
];

export { authorTbl, bookTbl };
