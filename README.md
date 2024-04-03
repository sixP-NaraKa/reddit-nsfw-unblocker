<p align="center">
  <img src="assets/icon256.png" alt="icon"/>
</p>

# reddit-nsfw-unblocker

A browser extension to unblock and remove those pesky little popups and blurs to freely view NSFW content! No login required. Works with the new Reddit (Beta) UI.

Supports `reddit.com/r/*` and `reddit.com/user/*` links. Create an issue if you want support for more links.

Available for [Firefox & Firefox for Android](https://addons.mozilla.org/de/firefox/addon/reddit-nsfw-unblocker/). Edge and Chrome soon<sup>TM</sup> (maybe).

## Example

Before:
![before](assets/before.JPG)

After:
![after](assets/after.JPG)

Also works for Firefox for Android - same behavior.

When you are on the main page of a given subreddit, click on the image directly to view it - if it is a cross-post then the post will be opened and the extension will take effect.

## How it works

It simply manipulates the DOM - removes elements responsible for the popup and blur, re-enables scrolling and removes a NSFW prompt/warning inside the video player.

See the source: [unblocker.js](src/js/unblocker.js)
