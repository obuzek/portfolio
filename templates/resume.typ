// Resume template for Typst
// Data is injected via string replacement: {{KEY}}

#set page(
  paper: "us-letter",
  margin: (x: 0.7in, y: 0.6in),
)

#set text(
  font: "Palatino",
  size: 9pt,
)

#set par(justify: true, leading: 0.5em)

// Style links with underline
#show link: it => underline(it)

// Section heading
#let section(title) = {
  v(0.3em)
  text(size: 10pt, weight: "bold", fill: rgb("#333"))[#upper(title)]
  v(-0.4em)
  line(length: 100%, stroke: 0.4pt + rgb("#aaa"))
  v(0.15em)
}

// Experience entry - title, company, and highlights kept together
#let experience-entry(title, company, dates, highlights) = {
  block(breakable: false)[
    #v(0.4em)
    #grid(
      columns: (1fr, auto),
      text(weight: "bold")[#title],
      text(style: "italic", size: 8pt)[#dates],
    )
    #v(-0.3em)
    #text(fill: rgb("#555"))[#company]
    #v(0.2em)
    #highlights
  ]
}

// Education entry (institution first)
#let education-entry(institution, degree, location, dates) = {
  v(0.3em)
  grid(
    columns: (1fr, auto),
    text(weight: "bold")[#institution],
    text(style: "italic", size: 8pt)[#dates],
  )
  v(-0.3em)
  [#text(fill: rgb("#555"))[#degree] #h(0.5em) #text(size: 8pt, fill: rgb("#666"))[#location]]
}

// Icons as inline SVG paths
#let github-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/></svg>",
    format: "svg"
  )
)

#let linkedin-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>",
    format: "svg"
  )
)

#let youtube-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg>",
    format: "svg"
  )
)

#let web-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/></svg>",
    format: "svg"
  )
)

#let email-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/></svg>",
    format: "svg"
  )
)

#let location-icon = box(
  height: 0.85em,
  baseline: 15%,
  image.decode(
    "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='#555' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>",
    format: "svg"
  )
)

// ============================================
// RESUME CONTENT
// ============================================

// Compact header
#grid(
  columns: (1fr, auto),
  align: (left, right),
  [
    #text(size: 16pt, weight: "bold")[{{NAME}}] #h(0.5em) #text(size: 9pt, fill: rgb("#555"))[{{HEADLINE}}]
  ],
  [
    #text(size: 9pt, fill: rgb("#555"))[#location-icon #h(0.2em) {{LOCATION}}]
  ]
)

#v(0.15em)

#text(size: 8pt)[
  #email-icon #h(0.15em) #link("mailto:{{EMAIL}}")[#"{{EMAIL}}"]
  #h(1fr)
  #web-icon #h(0.15em) #link("{{WEBSITE}}")[decoding.ink]
  #h(1fr)
  #github-icon #h(0.15em) #link("{{GITHUB}}")[GitHub]
  #h(1fr)
  #linkedin-icon #h(0.15em) #link("{{LINKEDIN}}")[LinkedIn]
  #h(1fr)
  #youtube-icon #h(0.15em) #link("{{YOUTUBE}}")[YouTube]
]

#v(0.2em)

// Summary
#section[Summary]
{{SUMMARY}}

// Competencies
#section[Key Competencies]
{{COMPETENCIES}}

// Experience
#section[Experience]
{{EXPERIENCE}}

// Education
#section[Education]
{{EDUCATION}}

// Skills
#section[Skills]
{{SKILLS}}

// Awards
#section[Awards & Recognition]
{{AWARDS}}

// Selected Publications & Talks
#section[Selected Publications & Talks]
{{PUBLICATIONS_AND_TALKS}}
