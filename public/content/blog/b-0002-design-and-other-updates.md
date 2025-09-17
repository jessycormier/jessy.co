---
id: "b-0002"
title: "Website update"
date: "2025-09-17"
category: "blog"
description: "Details on the website's design updates, including DaisyUI integration, theming improvements, and developer experience enhancements."
keywords: "site update, DaisyUI, theming, developer experience, Tailwind, content-index-builder"
---
I've updated the websites design. I've added DaisyUI as a component library as well as the feature I like the most; it's them-ability. It adds the concept that Bootstrap has which is to have named utilities like success, error, warning, info as well as primary, secondary, accent, neutral and base-100, base-200, base-300. This is such a better system on top of the tailwind system. I tested it out while building the figment app I've been working on and just ended up loving it.

On the code side, I've mostly changed things around the design changes and some things setup for the DX (Developer Experience). 

The menu button was moved from a button on the top right, to a menu button. I had it hiding and only showing on hover but I thought that might confuse some people on how to find it so I left it alone for now. This also means the strange pop effect when the site loads is fixed as well.

With DaisyUI I setup 2 themes a dark and light So that's added with its themeing also added in some fixes for a flicker effect that happens when themeing things.

For the code, I've updated the name of the generated files called content-index-builder. I've added a config and pulled out some magic strings and numbers so we can have a word associated with those magic values now. There's a few more changes I want to do but I'll do it on another branch/release.

I'm going to test out having a specific `content` branch for managing these folders and written stuff. As well I'm writing in Obsidian so I may start attempting to create a better build system to "link my thinking".
