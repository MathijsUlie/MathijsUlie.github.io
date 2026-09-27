const username = "mathijs_545a5df5dc7d8304a";
const fetchLimit = 20;
const displayLimit = 6;

const blogGrid = document.getElementById("blog-grid");
const blogStatus = document.getElementById("blog-status");

async function loadDevtoPosts() {
  try {
    const apiUrl = `https://dev.to/api/articles?username=${username}&per_page=${fetchLimit}&_=${Date.now()}`;

    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const articles = await response.json();

    const visibleArticles = articles
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      .slice(0, displayLimit);

    if (!visibleArticles.length) {
      blogStatus.textContent = "Geen artikelen gevonden. Controleer je username of publiceerde posts.";
      return;
    }

    blogStatus.style.display = "none";
    blogGrid.style.display = "grid";

    blogGrid.innerHTML = visibleArticles.map(article => {
      const tags = Array.isArray(article.tag_list)
        ? article.tag_list.map(tag => `<span class="tag">#${tag}</span>`).join("")
        : "";

      const date = new Date(article.published_at).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      return `
        <article class="card_blog">
          <h2>${article.title}</h2>
          <div class="blog-meta">${date}</div>
          <p>${article.description || "Geen beschrijving beschikbaar."}</p>
          <div class="tags">${tags}</div>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">Lees artikel</a>
        </article>
      `;
    }).join("");
  } catch (error) {
    blogStatus.textContent = "Er ging iets mis bij het ophalen van je DEV.to-posts.";
    console.error(error);
  }
}

loadDevtoPosts();