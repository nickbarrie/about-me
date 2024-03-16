// sidebar.js
    const sidebarToggle = document.querySelector('#sidebarToggle');
    const sidebar = document.getElementById('sidebar');

        sidebarToggle.addEventListener('click', function() {
            if (sidebar.style.width === '250px') {
                sidebar.style.width = '0';
            } else {
                sidebar.style.width = '250px';
            }
        });
    
