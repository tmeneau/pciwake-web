# PCI Wake Web

A somewhat experimental web UI for the PCI Wake project using Angular2 and
TypeScript.

## Hacks

A few knowingly poor decisions made at the outset of this project (such as
using the still-beta Angular2) will inevitably lead to the need to implement
multiple workarounds/hacks in this project until central or peripheral
technologies mature to a point of stability. This section is devoted to listing
the workarounds/hacks used with references to their associated issues so that
the hacks/workarounds can be removed as they become (blissfully) obsolete:

* [ng2-bootstrap source files are compiled by tsconfig configuration](https://github.com/valor-software/ng2-bootstrap/issues/128).

  (the workaround for this is implemented in the package.json#postinstall
  script)

* [ng2-bs3-modal is not recognized by the SystemJS configuration]

  (this might be my own ignorance, but a workaround is implemented in the
  `gulpfile.js` and `src/index.html` files)

# Quick Start

To get started:

1. start a local instance of the [PCI Wake
server](https://github.com/xetus-oss/pciwake).

2. run:

```
npm start
```

Your default browser should be opened to the running client by the
Browser-Sync/Live-Reload development utility.

# Notes

This is still very much a work in progress.

# Git Note

This project will only temporarily be a separate git repository from the
PCI Wake server project. This is partly to discourage explicit coupling between
the server and client, partly to defer decision making for *how* it should be
integrated until it meets a functional base-line, but mostly from my own
ineptitude.
