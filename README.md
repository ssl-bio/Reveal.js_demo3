# Example of a reveal.js presentation written in org-mode and customized with Tailwind


## Live version

-   [Here](https://ssl-bio.github.io/Reveal.js_demo3)


## Description

A sample [reveal.js](https://revealjs.com/) presentation customized using [Tailwind CSS](https://tailwindcss.com/). The presentation was written on Emacs org-mode and exported to HTML using [org-reveal](https://github.com/yjwen/org-reveal).

-   Since not all the customizations were possible using Tailwind utilities, a custom CSS and JS files were created.
-   It is recommended to check the [Readme](https://github.com/yjwen/org-reveal/blob/master/Readme.org) file from the org-reveal package in order to modify this presentation.
-   For those not familiar with reveal.js it is recommended to see the demo presentation (on the link above) to learn more about its capabilities.
-   Also check Tailwind [documentation](https://tailwindcss.com/docs/installation) to learn more about the utilities for customization since not all are covered here.


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


### Tailwind CLI

The following commands will setup a virtual environment where node.js will be installed and used to install tailwind command line interface (CLI).

```bash
# Anaconda is required
# Create a new virtual environment to install node.js
conda create --name inode-js -y
conda activate inode-js
conda install anaconda::nodejs -y

# Install tailwindcss (locally/globally) and create config file
# npm install -D tailwindcss
npm install -g tailwindcss
npx tailwindcss init
```

Then, the custom CSS file is built. Note the `--watch` option is recommended while modifying the presentation file.

```bash
conda activate inode-js
npx tailwindcss -i ./personal/css/icustom.css -o ./personal/css/custom_tailwind.css --watch
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
