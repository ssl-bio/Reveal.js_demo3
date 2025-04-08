# Example of a Reveal.js presentation written in org-mode and customized with TailwindCSS v4.


## Live version

-   [[Here]​](https://ssl-bio.github.io/Reveal.js_demo3)


### Build/tested with:

The presentation was made and tested using:

-   **Emacs**: *v.30.1*
    -   **org-reveal**: commit f55c851b
-   **Reveal.js**: *v. 5.2.0* (commit 47ee25dd)
-   **nodejs**: *v. 20.17.0*
-   **TailwindCSS** and **TailwindCSS/cli**: *v. 4.0.14*


## Description

A sample [Reveal.js](https://revealjs.com/) presentation customized using [Tailwind CSS](https://tailwindcss.com/). The presentation was written on Emacs org-mode and exported to HTML using [org-reveal](https://github.com/yjwen/org-reveal).

-   Since not all the customizations were possible using Tailwind utilities, a custom CSS and JS files were created.
-   It is recommended to check the [Readme](https://github.com/yjwen/org-reveal/blob/master/Readme.org) file from the org-reveal package in order to modify this presentation.
-   For those not familiar with Reveal.js it is recommended to see the demo presentation (on the link above) to learn more about its capabilities.
-   Also check TailwindCSS [documentation](https://tailwindcss.com/docs/installation/tailwind-cli) to learn more about the utilities for customization since not all are covered here.


## Quick setup [local]


### Download reveal.js

The following code will clone/download reveal.js.

```sh
# Option 1 Download the zip file
# wget https://github.com/hakimel/reveal.js/archive/master.zip -O reveal_js.zip

# Option 2 - Clone the repository
git clone https://github.com/hakimel/reveal.js.git
```


### Emacs configuration

Check the files `init.el` and `config.org` in the folder `emacs_conf` for a sample configuration of org-reveal. Importantly, set the `reveal-path` variable with the correct location where reveal.js files were downloaded.


### Installation of TailwindCSS and Tailwind/CLI

The following commands will setup a virtual environment where node.js will be installed and used to install tailwind command line interface (CLI).

```bash
# Anaconda is required
# Create a new virtual environment to install node.js
conda create --name reveal-js -y
conda activate reveal-js
conda install anaconda::nodejs -y
npm install -g npm@11.2.0

# Change to the presentation folder
# cd /path/to/reveal/presentation/folder

# Tailwind local installation
npm install -D tailwindcss @tailwindcss/cli
```


### Upgrade projects from TailwindCSS v.3 to v.4 [Optional]

With the release of a new major version of TailwindCSS a number of changes have been introduced including how the default theme is extended or how new utilities are defined. Fortunately, most of these changes can be updated to the new syntax using the code below (see also the official [upgrade guide](https://tailwindcss.com/docs/upgrade-guide)).

```bash
npx @tailwindcss/upgrade
```


### Building the final CSS file

The code below was taken from the official [installation instructions](https://tailwindcss.com/docs/installation/tailwind-cli) on how to build a CSS file using `tailwind/cli`. The `--watch` flag is necessary while making the presentation to update the final CSS file with the utilities and classes used.

```bash
npx @tailwindcss/cli -i ./personal/css/icustom.css -o ./personal/css/custom_tailwind.css --watch
```


### Modify the presentation file to run it locally

Once reveal.js has been downloaded, org-reveal configured and tailwind installed (and running), it is possible to modify the presentation file to run it locally by changing the following lines.

```emacs-lisp
# Comment or delete the url for the reveal.js CDN
##+REVEAL_ROOT: https://cdn.jsdelivr.net/npm/reveal.js@5.1.0

# Change the path to reveal.js themes
# Use absolute path
themesPath:'/absolute/path/to/reveal-files/reveal.js/dist/theme'
```

Modify the content of the presentation and export it using `C-c C-e R R`.


### Troubleshoot using third-party plugins with a CDN

For some reason when setting the `REVEAL_ROOT` option to a content delivery network (CDN) as it is done in the presentation demo, `#+REVEAL_ROOT: https://cdn.jsdelivr.net/npm/reveal.js@5.1.0` the exported file can not use third-party plugins. To solve this issue, one has to comment out the above option, export the file (using the local reveal.js files) remove the comment and export again.
