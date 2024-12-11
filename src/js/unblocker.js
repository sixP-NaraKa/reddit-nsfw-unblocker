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
     * Remove the "untagged blocking" tag, that warns that the content is not reviewed
     * and it prompts the user to use the Reddit app or go to the home page.
     * Therefore, this popup seems to only appear on smaller screen sizes, e.g. on mobile.
     * This can also be emulated by using the browsers devtools and changing the screen size.
     *
     * The difference between this popup and the NSFW one, is that this one is always (re)loaded, no matter where the user navigates to:
     *  - on a /r/subreddit page its a direct child of the main "shreddit-app" element
     *  - on a post it resides as a child element of "dsa-transparency-modal-provider"
     *
     * The main (parent) element we care about is the "shreddit-experience-tree" element.
     * While this element contains not only the popup in question, we will just delete that whole element anyway,
     * because the actual content that creates that popup resides a bit deeper in the elements children/shadowRoot.
     *
     * A page can contain both the NSFW popup as well as this "shreddit-experience-tree" parent element, but in this case
     * the "active-experiences" property of the element does not contain "untagged_blocking" and the child element.
     * Meaning the popup does not appear.
     */
    const untaggedBlockingElement = document
        .getElementsByTagName("shreddit-experience-tree")[0];
    untaggedBlockingElement?.remove();
}
