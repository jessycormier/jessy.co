---
id: "f-0001"
title: "Code name Figment"
date: 2025-06-2
aiEditor: true
description: "The origin story of Figment - a personal tool that grew from managing household items for insurance into a flexible system for tracking things, images, bookmarks, games, and projects with connected relationships."
keywords: "figment, personal project, project management, digital organization, household inventory, tagging system, connected data"
---

## TL;DR 

Figment started as a personal tool to track household items for insurance, but it quickly grew into a flexible, connected system for managing "things", images, bookmarks, games, and more. Along the way, I added tagging, relationship mapping, and basic project management. I'm now working on a backend API to clean up the architecture and finish phase one. This post walks through the journey so far.

## The Beginning: Managing My Things

One of the first features I built for Figment was the **things** manager. It kind of started the whole direction of what this project became. I needed a way to store information about the stuff I own, mainly for insurance purposes. I wanted to include photos, in case there's ever a fire, so I'd have proof of ownership and details about what was covered (if I wanted it to be insured vs not). Rather than dumping this all in a spreadsheet, I built an application where I could manually add the details, upload images, add original costs, estimated current market value, write any kind of description or details wanted, and links to where I could buy the item again if needed.

I threw all of that on a web page and displayed the items, totals, and the kind of calculations you'd need to hand off to an insurance company. But I had more ideas. I started playing around with the idea that anything in the database could be a **child** or **parent** of another thing. I called this concept a **construct** at the time.

For the things database, the idea was: you live in a house > in that house, you have a room > in that room, you have a desk > on that desk, there's an electronic > in that electronic, there's a battery. So, you can traverse things deeply. Another good example is a computer. It's in a room or on a desk, and it's made up of components you might need to keep track of, either for interest or for replacing something later. What if you wanted details about what you have and where it is. In a way Things becomes a map of your physical world but digitally.

This felt kind of similar to "linking your thinking" in Obsidian. But here, it's tied to physical items. It felt valuable to have a **digitized version** of your physical space, searchable, connected, and organized. At this point, the things database doesn't *do* a lot. It just lists the items. But it was really the **cornerstone idea** behind Figment. Imagine connectivity apps like home automation, or reminders for scheduled tasks, etc.

## Expanding with Collections

Right after the thing manager, I started creating **different collections of information**. I made collections for **canvases (images)**, **games**, and **bookmarks**. Each was its own thing, separate, not connected. I worked on some tooling that would help me transform dates in my obsidian vault to different formats. (this is for a personal project of transforming emails to markdown notes).

I built tooling for some of them too. For example, I built a **bookmark importer** that parsed exports from my browsers, and then set up a server-side API that could fetch metadata and images from those URLs.

For the games collection, I made a parser that hit my **Steam library**, pulled assets from that, and populated the database. I also created a **mini project manager** where you could make projects and add tasks. Most of that is in some stage of display-only, with basic editing support.


## Introducing Marks and Figments

When I built the **canvases** collection, I added support for uploading single or batch images. Drag and drop support. I introduced a kind of "tag mode" where you could tag images. I liked the idea a lot, so I took it further. I renamed it to **Mark**, as in, you're marking up an image. Then I pulled that feature out of canvases and made it part of the larger Figment app.

From there, I took every collection I had made and converted it into a **Figment**. Now that everything was a figment, users can **mark any figment**, and that opens the door for **filtering** and **connecting** everything. Users can link figments to each other, just like with the original thing manager, so figments can belong to or reference others above or below them. How those relationships work is up to the user.


## UI Iterations and Mark Mode

Then came a lot of UI work. I rebuilt the layout multiple times and still have plans to refine it further. I want the user experience to feel better than most modern apps that just throw data into tables. I am not compromising fluidity and app smoothness when presenting information whenever possible which takes a lot of knowhow and tinkering of things to get just right.

Currently, on the right-hand side of the app, there's a **Marks** sidebar/panel. You can filter by must include or will exclude marks. You can add new marks or click one to enter **Mark Mode**. Right now, Mark Mode only works in the canvases GUI, but its ready to be applied to any part of the app that displays figments. You select a mark, then click an image to apply it.

One nice workflow I came up with is using marks to **exclude** items. So, when in Mark Mode, clicking a canvas with a specific exclude mark makes it disappear. It's helpful if you're cataloguing and working through a large image collection or inventory.


## Future Features: Users and Spaces

I also wanted to add **Spaces**, but I didn't enable that yet, because I don't need it just now. What I *did* enable is the ability for different users to sign in and out.

Later on, I might revisit Spaces so a user can invite others to share and collaborate on the same figments. I really like the idea of a **traversing mechanism**, where if you set a figment as a parent or child, you can actually move through those connections visually or contextually.


## Where I'm At Now

So yeah, that's where I'm at. Figment has gone through a lot of transformations.

Right now, I'm working on a **backend API** to better organize how the data flows. The app has grown a lot, and I don't want all the business logic living in the front end anymore. The front end will focus on **displaying** and **normalizing** the data.

I definitely see room for something even more dynamic in the future, but that level of complexity is out of scope for **phase one** of this project.

Once the backend is complete and I've replaced the old frontend calls with the new API, I'll finish the remaining CRUD work. At that point, I'll consider phase one done, and I'll share another big update going over what changed, what got cut, what got built... and maybe, just maybe, get Figment online.

> Footnote: Special thanks to AI for translating my voice-to-text brainstorm into something readable. It bravely waded through my sentence fragments, double negatives, and whatever that one section was where I forgot how grammar works. p.s. AI also helped write that... I'm sorry not sorry.

