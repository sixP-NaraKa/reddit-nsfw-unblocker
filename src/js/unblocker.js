var loaders = document.getElementsByTagName("shreddit-async-loader");
var popup = loaders[loaders.length - 1];
if (popup.classList.contains("theme-beta")) {
    popup.remove();
    var blurElement =
        document.getElementsByTagName("reddit-breadcrumbs")[0]
            ?.nextElementSibling;
    if (blurElement !== undefined) {
        blurElement.style = "";
        document.body.style = "";

        document
            .getElementsByTagName("xpromo-nsfw-blocking-container")[0]
            ?.shadowRoot.children[1].remove();
    }
}
