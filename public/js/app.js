console.log('Hai browser side');

const form = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p-1');
const p2 = document.querySelector('#p-2');

p1.textContent = 'Enter a city';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    p1.textContent = 'Getting the data...';
    p2.textContent = '';
    
    fetch('http://127.0.0.1:3000/weather?address=' + location)
    .then(res => {
        if (res.status != 200) {
            p1.textContent = 'There\'s an error';
            p2.textContent = '';
        } else {
            res.json().then(data => {
                if (data.err) {
                    p1.textContent = data.err;
                    p2.textContent = '';
                } else {
                    p1.textContent = data[0].location;
                    p2.textContent = `${data[0].temp} degree Fahrenheit`
                }
            })
        }
        
    })
})