// on page load
unblock();

// on further page navigation, in some cases needed, in others not:
//  - when navigating from a /r/subreddit to a post, the content is loaded dynamically (and vice versa) -> extension "content_scripts" is not executed
//  - when jumping from a post to a recommended post, then a page load is executed
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.target.nodeName.toLowerCase() === "shreddit-app") {
            unblock();
        }
    });
});

observer.observe(document.querySelector("shreddit-app"), {
    childList: true,
});

function unblock() {
    var loaders = document.getElementsByTagName("shreddit-async-loader");
    var popup = loaders[loaders.length - 1];
    if (popup.classList.contains("theme-beta")) {
        popup.remove();
        document.body.style = "";

        // on navigating into a post or from a post into a cross-post,
        // wait a minimum amount before trying to delete the post overlay prompt
        // because at first the element we are looking for does not seem to be loaded/present yet
        setTimeout(() => {
            document
                .getElementsByTagName("xpromo-nsfw-blocking-container")[0]
                ?.shadowRoot.children[1].remove();
        }, 1);
    }

    /**
     * Remove the "untagged blocking" modal, that warns that the content is not reviewed
     * and it prompts the user to use the Reddit app or go to the home page.
     * This popup seems to only appear on smaller screen sizes, e.g. on mobile.
     * This can be replicated by using the browsers devtools and emulating a mobile device.
     */
    const untaggedBlockingElement = document
        .getElementsByTagName("xpromo-untagged-content-blocking-modal")[0];
    untaggedBlockingElement?.remove();
}
