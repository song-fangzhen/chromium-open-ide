# Chromium Open IDE (COI)

[![CodeQL workflow](https://github.com/song-fangzhen/chromium-open-ide/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/song-fangzhen/chromium-open-ide/actions/workflows/codeql-analysis.yml)
[![Bors enabled](https://bors.tech/images/badge_small.svg)](https://app.bors.tech/repositories/37745)

`COI` gives you a context menu for opening files in your editor (`VSCode`) on
[Chromium Code Search](https://source.chromium.org),
[Chromium Gerrit](https://chromium-review.googlesource.com),
[Google Git](https://chromium.googlesource.com) and
[webdiff-for-coi](https://pypi.org/project/webdiff-for-coi).

## Installation

Install this 
[Chrome Extension](https://chrome.google.com/webstore/detail/chromium-open-ide/oodolphplfmnljcohclgdikkoljjambi)/[MSEdge Extension](https://microsoftedge.microsoft.com/addons/detail/chromium-open-ide/ggfoollpnfolfaejalpiihpobcpbegkl) and related 
[VSCode Extension](https://marketplace.visualstudio.com/items?itemName=FangzhenSong.chromium-source-opener).

## Usage

- For [Chromium Code Search](https://source.chromium.org): \
right-click on line number and select `Open My Editor`,
it will open the file in your editor at the selected line.

    <img src="images/COI01.png" onerror="this.onerror=null; this.remove();" alt="COI01.png" width="500"/>

- For [Chromium Gerrit](https://chromium-review.googlesource.com): \
right-click on code block and select `Open My Editor`, 
it will open the file in your editor at the selected line.

    <img src="images/COI02.png" onerror="this.onerror=null; this.remove();" alt="COI02.png" width="500"/>

- For [Google Git](https://chromium.googlesource.com):

    - click on the line number (optional).
    - choose and right-click on any code block.
    - select `Open My Editor`.

    It will open the file in your editor (at the selected line).

    <img src="images/COI03.png" onerror="this.onerror=null; this.remove();" alt="COI03.png" width="500"/>

- For [webdiff-for-coi](https://pypi.org/project/webdiff-for-coi): \
right-click on code block and select `Open My Editor`,
it will open the file in your editor.

    <img src="images/COI04.png" onerror="this.onerror=null; this.remove();" alt="COI04.png" width="500"/>
    
*Tips: before using, we should check that have started listening from `VSCode`.*

<img src="images/COI-Tips.png" onerror="this.onerror=null; this.remove();" alt="COI-Tips.png" width="500"/>

**Enjoy!**
