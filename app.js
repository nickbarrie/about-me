let data = [
    {
        name: 'John Doe',
        age: 25
    },
    {
        name: 'Jane Doe',
        age: 24
    }
];

const info = document.querySelector('#info');

let details = data.map(function(person) {
        return (
            '<div>'+ person.name +' is ' + person.age+ ' years old ' + '<div>'
    )
        }
)
    
info.innerHTML = details.join('\n');
