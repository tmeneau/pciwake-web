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