let projects = [];
let blogs = [];
let currentProject = 0;

const container = document.getElementById("projects-container");
const blogContainer = document.getElementById("blog-container");

const lightbox = document.getElementById("lightbox");
const lightImg = document.getElementById("lightbox-img");
const lightTitle = document.getElementById("lightbox-title");
const closeBtn = document.getElementById("close");

/* THEME */
document.getElementById("theme-toggle").onclick = () => {
    document.body.classList.toggle("dark");
};

/* LOAD PROJECTS */
fetch("data/projects.json")
.then(res => res.json())
.then(data => {
    projects = data;
    renderProjects();
});

/* LOAD BLOG */
fetch("data/blog.json")
.then(res => res.json())
.then(data => {
    blogs = data;
    renderBlog();
});

/* RENDER PROJECTS */
function renderProjects() {

    container.innerHTML = "";

    projects.forEach((p, i) => {

        if (p.type === "image") {

            container.innerHTML += `

            <div class="insta-card"
                 onclick="openLightbox(${i})">

                <img src="${p.file}">

            </div>

            `;

        }

        else if (p.type === "video") {

            container.innerHTML += `

            <div class="insta-card"
                 onclick="openLightbox(${i})">

                <video
                    muted
                    autoplay
                    loop
                    playsinline>

                    <source
                        src="${p.file}"
                        type="video/mp4">

                </video>

            </div>

            `;

        }

    });

}
/* LIGHTBOX */
function openLightbox(index) {

    currentProject = index;

    const content =
    document.getElementById(
        "lightbox-content"
    );

    lightbox.style.display =
    "flex";

    if (
        projects[index].type ===
        "image"
    ) {

        content.innerHTML = `

        <img
            src="${projects[index].file}">

        `;

    }

    else {

        content.innerHTML = `

        <video
            controls
            autoplay>

            <source
                src="${projects[index].file}"
                type="video/mp4">

        </video>

        `;

    }

}
function showNextProject() {

    currentProject++;

    if (currentProject >= projects.length) {
        currentProject = 0;
    }

    openLightbox(currentProject);

}

function showPreviousProject() {

    currentProject--;

    if (currentProject < 0) {
        currentProject =
        projects.length - 1;
    }

    openLightbox(currentProject);

}

/* CLOSE */
closeBtn.onclick = () => {
    lightbox.style.display = "none";
};

/* BLOG */
function renderBlog() {
    blogContainer.innerHTML = "";

    blogs.forEach(b => {
        blogContainer.innerHTML += `
            <div class="blog-card">
                <h3>${b.title}</h3>
                <small>${b.date}</small>
                <p>${b.excerpt}</p>
            </div>
        `;
    });
}

document.getElementById("next-btn")
.addEventListener(
    "click",
    showNextProject
);

document.getElementById("prev-btn")
.addEventListener(
    "click",
    showPreviousProject
);
document.addEventListener(
    "keydown",
    (event) => {

        if (
            lightbox.style.display === "flex"
        ) {

            if (event.key === "ArrowRight") {

                showNextProject();

            }

            if (event.key === "ArrowLeft") {

                showPreviousProject();

            }

            if (event.key === "Escape") {

                lightbox.style.display =
                "none";

            }

        }

    }
);
