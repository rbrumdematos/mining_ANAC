const csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("Final_pronta2.csv");
let data = [];
let i=0;

fs.createReadStream('Final_pronta.csv')
  .pipe(csv())
  .on('data', (row) => {
    //onsole.log(row)
    if (row.voo != "" && (row.empresa=="GLO"||row.empresa=="TAM"||row.empresa=="AZU")){
    data[i]=row;
    //console.log(data[i])
    
    i++;
}
    
  })
  .on('end', () => {

    fastcsv
  .write(data, { headers: true })
  .pipe(ws);
  });