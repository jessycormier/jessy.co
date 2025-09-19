---
id: "markdown-test"
title: "Markdown Feature Test"
description: "A comprehensive test file showcasing all markdown features"
keywords: "markdown, test, features, syntax, formatting"
---

# Markdown Feature Test

This is a comprehensive test file that demonstrates all the major markdown features and syntax elements.

## Table of Contents

- [Headers](#headers)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Links and Images](#links-and-images)
- [Code](#code)
- [Tables](#tables)
- [Blockquotes](#blockquotes)
- [Horizontal Rules](#horizontal-rules)
- [Math (KaTeX)](#math-katex)
- [Special Characters](#special-characters)

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Text Formatting

This is **bold text** and this is __also bold__.

This is *italic text* and this is _also italic_.

This is ***bold and italic*** text.

This is ~~strikethrough~~ text.

This is `inline code`.

This is a line with a manual line break.  
Notice the two spaces at the end of the previous line.

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Deep nested item
- Third item

* Alternative syntax
* Using asterisks
  * Nested with asterisk

+ Another alternative
+ Using plus signs

### Ordered Lists

1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
      1. Deep nested numbered
3. Third item

1. Lists with same numbers
1. Will auto-increment
1. When rendered

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Another incomplete task

## Links and Images

### Links

[This is a link to Google](https://www.google.com)

[This is a link with title](https://www.google.com "Google Homepage")

<https://www.example.com> - Automatic link

### Reference Links

[Reference link][1]

[Another reference link][google]

[1]: https://www.example.com
[google]: https://www.google.com "Google"

### Images

TODO

## Code

### Inline Code

Here's some `inline code` within a sentence.

Use `npm install` to install packages.

### Code Blocks

```
Plain code block without syntax highlighting
const example = "basic code block";
```

```javascript
// JavaScript code block
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome, ${name}`;
}

const user = "Developer";
greetUser(user);
```

```typescript
// TypeScript code block
interface User {
    id: number;
    name: string;
    email?: string;
}

class UserService {
    private users: User[] = [];
    
    addUser(user: User): void {
        this.users.push(user);
    }
    
    getUser(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
```

```css
/* CSS code block */
.markdown-test {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

.code-block {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
}
```

```html
<!-- HTML code block -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Test</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a <strong>sample</strong> HTML document.</p>
</body>
</html>
```

```json
{
  "name": "markdown-test",
  "version": "1.0.0",
  "description": "A test file for markdown features",
  "keywords": ["markdown", "test", "features"],
  "author": "Developer",
  "license": "MIT"
}
```

## Tables

### Basic Table

| Name | Age | City |
|------|-----|------|
| John | 25 | New York |
| Jane | 30 | Los Angeles |
| Bob | 35 | Chicago |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| More text | More text | More text |

### Complex Table

| Feature | Supported | Notes |
|---------|:---------:|-------|
| **Bold text** | ✅ | Works perfectly |
| *Italic text* | ✅ | Also supported |
| `Code` | ✅ | Inline code works |
| [Links](https://example.com) | ✅ | External links |
| Images | ❌ | Not in tables |

## Blockquotes

> This is a simple blockquote.

> This is a blockquote
> that spans multiple lines
> and continues here.

> ### Blockquote with Header
> 
> This blockquote contains a header and multiple paragraphs.
> 
> It can contain **formatted text** and other markdown elements.

> Nested blockquotes work too:
> 
> > This is a nested blockquote
> > inside another blockquote.

## Horizontal Rules

Here's a horizontal rule:

---

And another one:

***

And one more:

___

## Math (KaTeX)

### Inline Math

The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Einstein's famous equation: $E = mc^2$.

### Block Math

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

## Special Characters

### Escaping Characters

\*This is not italic\*

\# This is not a header

\[This is not a link\](http://example.com)

### HTML Entities

&copy; Copyright 2025

&amp; Ampersand

&lt; Less than

&gt; Greater than

### Emoji

:smile: :heart: :thumbsup: :rocket: :star: :fire:

😀 😍 👍 🚀 ⭐ 🔥

## Mixed Content Example

Here's a complex example combining multiple features:

> **Important Note**: The following code snippet demonstrates a TypeScript function:
> 
> ```typescript
> // Calculate factorial recursively
> function factorial(n: number): number {
>     if (n <= 1) return 1;
>     return n * factorial(n - 1);
> }
> ```
> 
> | Input | Output | Formula |
> |-------|--------|---------|
> | 5 | 120 | $5! = 5 \times 4 \times 3 \times 2 \times 1$ |
> | 0 | 1 | $0! = 1$ (by definition) |

## Conclusion

This test file covers most of the markdown features available. It should help demonstrate how the markdown processor handles various syntax elements and formatting options.

### Features Tested

- [x] Headers (H1-H6)
- [x] Text formatting (bold, italic, strikethrough)
- [x] Lists (ordered, unordered, nested, tasks)
- [x] Links (inline, reference, automatic)
- [x] Images
- [x] Code (inline, blocks with syntax highlighting)
- [x] Tables (basic, aligned, complex)
- [x] Blockquotes (simple, nested, with formatting)
- [x] Horizontal rules
- [x] Math equations (inline and block)
- [x] Special characters and escaping
- [x] Mixed content combinations

---

*This test file was generated on 2025-09-19 for testing markdown rendering capabilities.*
