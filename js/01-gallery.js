import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<li class="gallery-item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>
      </li>`
    )
    .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.innerHTML = addGalleryMarkup;

galleryEl.addEventListener("click", onImageClick);

function onImageClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  galleryEl.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onImageClick);
    }
  });
}

console.log(galleryItems);
