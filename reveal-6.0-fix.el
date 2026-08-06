;;; reveal-6.0-fix.el --- patch org-reveal plugin paths for reveal.js >= 6.0, version-aware

(defun my/org-reveal--major-version-from-root (root-path)
  "Returns the major version from the url in #+REVEAL_ROOT
Returns nil if no version string is found."
  (when (and root-path (string-match "reveal\\.js@\\([0-9]+\\)\\." root-path))
    (string-to-number (match-string 1 root-path))))

(defun my/org-reveal-plugin-scripts-4-6.x (orig-fn plugins info in-single-file)
  "Re-writes the plugins' path if reveal version is 6 or above
plugin/<name>/<name>.js to dist/plugin/<name>.js.
By calling org-reveal org-reveal-plugin-scripts-4 function"
  (let* ((root-path (plist-get info :reveal-root))
         (ver (my/org-reveal--major-version-from-root root-path))
         (result (funcall orig-fn plugins info in-single-file)))
    (if (and ver (>= ver 6) (car result))
        (cons
         (replace-regexp-in-string
          "plugin/\\([a-z]+\\)/\\1\\.js" "dist/plugin/\\1.js"
          (car result))
         (cdr result))
      result)))

;; Remove ALL existing advice on the above function,
;; then add the current one. Makes re-loading this file safe
;; no matter what was attached in a previous version.
(advice-mapc
 (lambda (advice-fn _props)
   (advice-remove 'org-reveal-plugin-scripts-4 advice-fn))
 'org-reveal-plugin-scripts-4)

(advice-add 'org-reveal-plugin-scripts-4 :around #'my/org-reveal-plugin-scripts-4-6.x)

;; (setq-local org-reveal-plugins '(highlight notes))

(provide 'org-reveal-6.0-fix)
