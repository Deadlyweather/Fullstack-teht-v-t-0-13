// Testi 1

const getFrontPageHtml = noteCount => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class="container">
          <h1>Full stack -esimerkkisovellus</h1>
          <p>muistiinpanoja luotu ${noteCount} kappaletta</p>
          <a href="/notes">muistiinpanot</a>
          <img src="kuva.png" width="200" />
        </div>
      </body>
    </html>
  `
}

//app.get('/', (req, res) => {
//  const page = getFrontPageHtml(notes.length)
//  res.send(page)
//})