import axios from 'axios'

// export default async function getBooks( searchKey ) {
//     const apiKey = process.env.REACT_APP_BOOKS_API
//     if (!apiKey) {
//         console.log('No API KEY available');
//         return;
//     } 
    
//     const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`
//     //console.log(url);
//     return await axios.get(url).then(res => {
//         // console.log(res)
//         return res.data})
//     .catch(err => console.log(err.message));
    
// }