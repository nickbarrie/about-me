const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add('show');
        } else{
        entry.target.classList.remove('show');
        }
    });
    }
);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => {observer.observe(element);});



function getRandomSnippetFromFile(fileContent) {
    const lines = fileContent.split('\n');
    
    const snippetLength = 15 + Math.floor(Math.random() * 10); 

    // Get the total number of lines in the file
    const totalLines = lines.length;

    // Pick a random starting line index, ensuring there are enough lines for a complete snippet
    const startLine = Math.floor(Math.random() * (totalLines - snippetLength));

    // Extract the snippet from the file content
    const snippet = lines.slice(startLine, startLine + snippetLength).join('\n');

    return snippet;
}


document.addEventListener("DOMContentLoaded", function () {
    const githubRepoUrls = [
        "https://api.github.com/repos/nickbarrie/CrashRecovery/contents/src/crashRecovery/main",
        "https://api.github.com/repos/nickbarrie/car-detailing/contents/frontend/src/components",
        "https://api.github.com/repos/nickbarrie/particle-sim/contents",
        "https://api.github.com/repos/nickbarrie/HomeHive/contents",
        "https://api.github.com/repos/nickbarrie/Pygame-tennis/contents"
    ];

    // Function to process each repository
    function fetchAndDisplayFiles(repoUrl) {
        fetch(repoUrl)
            .then((response) => response.json())
            .then((data) => {
                const codeFiles = data.filter(file => file.type === "file" && (file.name.endsWith(".js") || file.name.endsWith(".java") || file.name.endsWith(".c") || file.name.endsWith(".vue") || file.name.endsWith(".cpp")));
                if (codeFiles.length > 0) {
                    const randomFile = codeFiles[Math.floor(Math.random() * codeFiles.length)];
                    fetch(randomFile.download_url)
                        .then(response => response.text())
                        .then(fileContent => {
                            const snippet = getRandomSnippetFromFile(fileContent);
                            createFloatingCodeElement(snippet, randomFile.name);
                        });
                }
            })
            .catch((error) => console.error("Error fetching GitHub content from:", repoUrl, error));
    }

    // Loop through each repository URL and fetch the content
    githubRepoUrls.forEach(repoUrl => {
        fetchAndDisplayFiles(repoUrl);
    });
});

function createFloatingCodeElement(codeSnippet, fileName) {
    const codeElement = document.createElement("div");
    codeElement.classList.add("floating-code");
    
    const fileTitle = document.createElement("h3");
    fileTitle.textContent = `File: ${fileName}`;
    codeElement.appendChild(fileTitle);
    
    const codeText = document.createElement("pre");
    codeText.textContent = codeSnippet;
    codeElement.appendChild(codeText);

    document.body.appendChild(codeElement);
    
    positionCodeElementWithinBounds(codeElement);
    
    animateCodeElement(codeElement);
}

function positionCodeElementWithinBounds(element) {
    const elemWidth = element.offsetWidth;
    const elemHeight = element.offsetHeight;

    const maxX = window.innerWidth - elemWidth;
    var maxY = document.documentElement.scrollHeight - elemHeight;

    if(maxY > 1500){
        maxY = 1500;
    }
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function animateCodeElement(element) {
    let rect = element.getBoundingClientRect();
    let baseX = rect.left;
    let baseY = rect.top;
    let x = 0;
    let y = 0;

    // Define the radius of the area within which the element will hover
    const hoverRadius = 20;

    // Define the speed of movement
    let angle = 0; // Start angle
    const speed = 0.01; // Slow speed

    function move() {
        // Update angle for smooth, circular movement
        angle += speed;

        // Calculate new x and y offsets within the radius
        x = Math.cos(angle) * hoverRadius;
        y = Math.sin(angle) * hoverRadius;

        // Apply the transformation relative to the base position
        element.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(move);
    }

    move();
}
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');
    let currentIndex = 0;
    const intervalTime = 4000; // Change image every 4 seconds

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);

    // Autoplay
    let autoplay = setInterval(moveToNextSlide, intervalTime);

    // Pause autoplay on hover
    carousel.addEventListener('mouseover', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => autoplay = setInterval(moveToNextSlide, intervalTime));
});

