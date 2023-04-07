🧅 Onion Press

## Running Locally

If you're running the app locally, clone the repository, then run dev.sh. Use a Debian build for an OS with verified functionality.

```
apt update && apt -y dist-upgrade && apt install -y git && git clone https://github.com/glenn-sorrentino/onion-press.git && cd onion-press && chmod +x dev.sh && ./dev.sh
```

Now just visit your IP address with port 3000 like this: 127.0.0.1:3000

Update with your server's IP address.

## Adding Content

Onion Press allows author to manage their content using markdown, a simplified formatting language making editing easy.

### Pages Included

* Cover
* Introduction
* Chapter 1
* Chapter 2
* Chapter 3

## Generating Static HTML

We're launching as an onion website, so a lot of the functionality making the development environment functional won't work in Tor Browser. Instead, we'll run build.sh to convert the markdown into HTML and generate our final, static pages. When you're ready to publish, navigate to the JS directory, then run build.js:

```
cd js && chmod +x build.sh && node build.sh && cd .. && mkdir markdown-templates && mv introduction.html markdown-templates/ && mv ch*.html markdown-templates/ && cd js/output/ && mv *.html ../../
```

Now, the root directory will have the static HTML files, and the markdown templates are located in the self-named folder.

Click on the new files and your content should render correctly.

## Publishing Your Book

When you're ready to share your book, it's as simple as running:

```
chmod +x setup.sh && ./setup.sh
```
