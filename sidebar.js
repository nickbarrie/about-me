document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.className = 'sidebar';

    const sidebarContent = `
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
    `;

    sidebar.innerHTML = sidebarContent;

    document.querySelector('.container').appendChild(sidebar);

    const sidebarToggle = document.createElement('button');
    sidebarToggle.id = 'sidebarToggle';
    sidebarToggle.innerHTML = '&#x22EE;';

    document.querySelector('.content').appendChild(sidebarToggle);

    sidebarToggle.addEventListener('click', function() {
        if (sidebar.style.width === '250px') {
            sidebar.style.width = '0';
        } else {
            sidebar.style.width = '250px';
        }
    });
});
