# Open Multiple URLs

Paste a list of URLs and open them all in new tabs at once. No more clicking links one by one.

## What it does

You paste URLs into the text area, one per line, and click Open All. Every URL opens in its own tab simultaneously. The extension validates each URL before opening it, automatically adds https:// if you forgot the protocol, and tells you at the end how many tabs were opened and how many invalid entries were skipped.

## Options

There is a toggle to open all URLs in a new window instead of your current one, which is useful when you want to group a batch of related links together.

There is also a deduplicate toggle that removes duplicate URLs from your list before opening, so if you accidentally pasted the same link twice you will not end up with two identical tabs.

The URL counter updates live as you type so you always know how many tabs you are about to open before you click the button.

## Version 2

The original version had some reliability issues when handling large numbers of URLs, particularly around URL validation and protocol handling. Version 2 is a clean rewrite. It properly validates every URL using the browser's built-in URL parser, handles URLs without a protocol prefix automatically, gives clear feedback on exactly what was opened and what was skipped, and performs better with large lists.

## How to install

Clone or download this repo, open Chrome and go to chrome://extensions, enable Developer Mode, click Load unpacked, and select this folder.

## Built with

Manifest V3, vanilla JavaScript and CSS, Chrome's tabs and windows APIs.
