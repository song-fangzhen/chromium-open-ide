# Chromium Open IDE (COI)

[![.github/workflows/CI.yml](https://img.shields.io/github/workflow/status/EFanZh/Graphviz-Preview/CI/master)](https://github.com/EFanZh/Graphviz-Preview/actions?query=workflow%3A.github%2Fworkflows%2FCI.yml)
[![Bors enabled](https://img.shields.io/badge/bors-enabled-brightgreen)](https://app.bors.tech/repositories/23758)

`COI` gives you a context menu for opening files in your editor (`VSCode`) on
[Chromium Code Search](https://source.chromium.org) and
[Chromium Code Review](https://chromium-review.googlesource.com).

## Installation

Install the [Chrome Extension](https://github.com/song-fangzhen/chromium-open-ide/releases/tag/v1.1) and related [VScode Extension](https://marketplace.visualstudio.com/items?itemName=FangzhenSong.chromium-source-opener).

## Usage

- For [Chromium Code Search](https://source.chromium.org), right click on code block and select `Open My Editor`, 
it will open the file in your editor at the selected line.

    <img src="images/COI01.png" onerror="this.onerror=null; this.remove();" alt="COI01.png" width="500"/>

- For [Chromium Code Review](https://chromium-review.googlesource.com), right click on a filename and select 
`Open My Editor`, it will open the file in your editor.

    <img src="images/COI02.png" onerror="this.onerror=null; this.remove();" alt="COI02.png" width="500"/>

    *Tips: Before using, we should check that have started listening from `VScode`.*

    <img src="images/COI03.png" onerror="this.onerror=null; this.remove();" alt="COI03.png" width="500"/>

**Enjoy!**
