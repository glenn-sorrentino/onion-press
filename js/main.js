async function loadMarkdown(containerId, filePath, isIntro) {
  const response = await fetch(filePath);
  const markdown = await response.text();
  const container = document.getElementById(containerId);

  if (!markdown) {
    container.classList.add('empty');
    return;
  }

  // Add content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = marked(markdown);
  container.appendChild(contentElement);

  if (isIntro) {
    // Calculate reading time
    const words = markdown.split(/\s+/g).length;
    const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute

    // Add reading time element
    const readingTimeElement = document.createElement("div");
    readingTimeElement.id = "reading-time";
    readingTimeElement.innerHTML = `${readingTime} min read`;
    container.insertBefore(readingTimeElement, container.firstChild);
  }
}

async function getTotalReadingTime() {
  const contentId = document.getElementById("content").dataset.content;
  if (contentId === 'cover') {
    let totalTime = 0;
    const chapterPattern = /chapter-\d+/g;
    const files = await fetch('md/');
    const fileList = await files.text();
    const chapters = fileList.match(chapterPattern);

    for (const chapter of chapters) {
      const response = await fetch(`md/${chapter}/intro.md`);
      const introMd = await response.text();
      const response2 = await fetch(`md/${chapter}/body.md`);
      const bodyMd = await response2.text();
      const words = (introMd + bodyMd).split(/\s+/g).length;
      totalTime += Math.ceil(words / 200);
    }
    return totalTime;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadMarkdown("nav", "md/nav.md");
  await loadMarkdown("footer-content", "md/footer.md");

  const contentId = document.getElementById("content").dataset.content;
  if (contentId) {
    const totalTime = await getTotalReadingTime();
    const isCover = contentId === 'cover';
    await loadMarkdown("intro-wrapper", `md/${contentId}/intro.md`, !isCover, isCover ? totalTime : null);
    await loadMarkdown("about-content", `md/${contentId}/body.md`);
    await loadMarkdown("pagination-content", `md/${contentId}/pagination.md`);
  }
});

function countWords() {
  const body = document.getElementById('about-content');
  const words = body.innerText.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200); // assuming an average reading speed of 200 words per minute
  const readingTimeText = readingTime === 1 ? '1 minute' : `~${readingTime} min read`;
  const readingTimeElement = document.getElementById('reading-time');
  readingTimeElement.innerText = readingTimeText;
}

$(document).ready(function() {
  $('.btnIcon').on('click', function() {
    $('nav ul').toggleClass('show');
  });

  $('nav li').on('click', function() {
    $('header nav ul').removeClass('show');
  });
});