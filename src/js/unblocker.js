var loaders = document.getElementsByTagName("shreddit-async-loader");
var popup = loaders[loaders.length - 1];
if (popup.classList.contains("theme-beta")) {
    popup.remove();
    var breadcrumbs = document.getElementsByTagName("reddit-breadcrumbs");
    var blurElement =
        breadcrumbs !== null && breadcrumbs !== undefined
            ? breadcrumbs[0].nextElementSibling
            : null;
    if (blurElement !== null) {
        blurElement.style = "";
        document.body.style = "";

        var blockingContainer = document.getElementsByTagName(
            "xpromo-nsfw-blocking-container"
        );
        blockingContainer[0].shadowRoot.children[1].remove();
    }
}
