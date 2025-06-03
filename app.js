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
        "https://github.com/nickbarrie/ImageBasedSatelliteTracking",
        "https://api.github.com/repos/nickbarrie/Pygame-tennis/contents"
    ];

    // Function to process each repository
    function fetchAndDisplayFiles(repoUrl) {
        fetch(repoUrl)
            .then((response) => response.json())
            .then((data) => {
                const codeFiles = data.filter(file => file.type === "file" && (file.name.endsWith(".js") || file.name.endsWith(".java") || file.name.endsWith(".c") || file.name.endsWith(".vue") || file.name.endsWith(".cpp")|| file.name.endsWith(".py")));
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

const placedRects = []; // Global array to track placed code boxes

function positionCodeElementWithinBounds(element) {
    const maxAttempts = 20;
    const buffer = 20; // Extra space between elements

    document.body.appendChild(element); // Temporarily add to measure size
    const elemWidth = element.offsetWidth;
    const elemHeight = element.offsetHeight;

    const maxX = window.innerWidth - elemWidth;
    const maxY = Math.min(document.documentElement.scrollHeight - elemHeight, 1500);

    let placed = false;

    for (let i = 0; i < maxAttempts && !placed; i++) {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        const newRect = {
            left: x - buffer,
            top: y - buffer,
            right: x + elemWidth + buffer,
            bottom: y + elemHeight + buffer
        };

        // Check against all previously placed rects
        const overlaps = placedRects.some(r =>
            !(newRect.right < r.left || newRect.left > r.right || newRect.bottom < r.top || newRect.top > r.bottom)
        );

        if (!overlaps) {
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            placedRects.push(newRect);
            placed = true;
        }
    }

    if (!placed) {
        console.warn("Could not find non-overlapping position.");
        element.remove(); // Optional: Remove or let it overlap
    }
}


function animateCodeElement(element) {
    let offset = 0;
    const amplitude = 8;
    const speed = 0.02;

    function float() {
        offset += speed;
        const y = Math.sin(offset) * amplitude;
        element.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(float);
    }

    float();
}
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');
    let currentIndex = 0;
    const intervalTime = 10000; 

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

    let autoplay = setInterval(moveToNextSlide, intervalTime);

    carousel.addEventListener('mouseover', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => autoplay = setInterval(moveToNextSlide, intervalTime));
});

document.addEventListener("DOMContentLoaded", () => {
    const titles = ["Software Developer", "QA Analyst"];
    const titleElement = document.getElementById("rotating-title");
    let index = 0;

    setInterval(() => {
        titleElement.style.opacity = 0;
        setTimeout(() => {
            index = (index + 1) % titles.length;
            titleElement.textContent = titles[index];
            titleElement.style.opacity = 1;
        }, 500); // Match the CSS transition duration
    }, 8000);
});


