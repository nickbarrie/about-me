let data = [
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/nick-w-barrie/'
    },
    {
        name: 'Github',
        link: 'https://github.com/nickbarrie'
    },
    {
        name: 'Youtube',
        link: 'https://www.youtube.com/@nickbarrie1014'
    },
    {
        name: '',
        link: 28
    }
];

const info = document.querySelector('#info');

let details = data.map(function(item) {
        return (
            '<div> <a href=' + item.link + ' target="_blank">' + item.name + '</a></div>'
    )
        }
)
    
info.innerHTML = details.join('\n');
