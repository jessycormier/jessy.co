---
id: b-0003
title: writing system update
date: 2025-09-18
category: blog
description: ""
tags: []
---

I've published a new system for the website that'll allow me to write and author content from within obsidian and have GitHub actions pick up the changes and auto publish the site. 

This involves me writing content on a `content` branch. GitHub actions picking up commits and pushing to `main` branch which triggers a build and release in Vercel.

I think I'm going to make a change later on so Vercel wont auto publish content right off main, but right off of a `publish` branch. But for now this was a fun little thing to update things on.

While doing that the site now has a fix for the issues I was seeing for content popping. This was caused by Angular v20 styles optimization and I think how Tailwind css gets processed and placed in the generated index file. I've turned off CSS optimizations on production builds as well as add in a few tweaks related to hiding content until the system is loaded for a bit. Now the issue is resolved content doesn't shift around on load, (rapid spam refresh) and darkmode flashbang is gone (screen starting white and going to darkmode). There is still a second where on the white theme it starts black and goes white; again, not sure what's going on here yet.

Menu navigation in the breadcrumb (that kind of mimics the url) now works as a means to navigate to the *list* or root which feels more functional than static text.

And that's about it. I do want to start thinking about the processor I built to potentially make more features like making markdown tags work, or other means of organization but that's future projects for fun.