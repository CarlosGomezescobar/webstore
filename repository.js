const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "166901468381-i9na9odsit6a9sefi2eafaiu4j5snts3.apps.googleusercontent.com",
  "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",
  "https://webstore.vercel.app/"
);

oAuth2Client.setCredentials({
  "access_token": "ya29.a0AX9GBdVmOVYrHOe8D6S7aaHIELsunKiOKMXXV8dLqp0Tk865-lskrgsz0IQ19DzjAGNLk1X9lrhPA1fSutug-I8j5rkoTRRbqJbypiX9pUFjhrrR1trFQZzVZK9y4ljLfuPS7lp1hOr_ovYDg3zj4iSE1lVEaCgYKAXMSAQ8SFQHUCsbChQ_pyI4fS_VbtRCGocMvZw0163", 
  "scope": "https://www.googleapis.com/auth/spreadsheets", 
  "token_type": "Bearer", 
  "expires_in": 3599, 
  "refresh_token": "1//04vfKknfA8ARoCgYIARAAGAQSNwF-L9IrmEIPS_vcnaemrh_X2S2NHUxkInTQaRHVN3wcGIKckh9DxSoSI8tiiNqSEIT-XE0Tc60"

});

const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

async function read() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1fKav2iI-PXBlvEDDrn1d8HaiFG5Lfnvt8Z3Y3NXk95k",
    range: "Products!A2:E",
  });

  const rows = response.data.values;
  const products = rows.map((row) => ({
    id: +row[0],
    name: row[1],
    price: +row[2],
    image: row[3],
    stock: +row[4],
  }));

  return products;
}

async function write(products) {
  let values = products.map((p) => [p.id, p.name, p.price, p.image, p.stock]);

  const resource = {
    values,
  };
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1fKav2iI-PXBlvEDDrn1d8HaiFG5Lfnvt8Z3Y3NXk95k",
    range: "Products!A2:E",
    valueInputOption: "RAW",
    resource,
  });

  console.log(result.updatedCells);
}

// async function readAndWrite() {
//   const products = await read();
//   products[0].stock = 20;
//   await write(products);
// }

// readAndWrite();

module.exports = {
  read,
  write,
};
