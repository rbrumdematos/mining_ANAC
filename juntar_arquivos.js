const csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("out.csv");

i=0;
let data=[] ;



fs.createReadStream('outatraso1.csv')
  .pipe(csv())
  .on('data', (row) => {
    data [i++] =(row);
  })
  .on('end', () => {

    fs.createReadStream('outatraso2.csv')
    .pipe(csv())
    .on('data', (row) => {
      data [i++] =(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
  
      fs.createReadStream('outatraso3.csv')
      .pipe(csv())
      .on('data', (row) => {
        data [i++] =(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
    
        fs.createReadStream('outatraso4.csv')
        .pipe(csv())
        .on('data', (row) => {
          data [i++] =(row);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');

                fs.createReadStream('outatraso5.csv')
            .pipe(csv())
            .on('data', (row) => {
                data [i++] =(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');


                fs.createReadStream('outatraso6.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');

                    fs.createReadStream('outatraso7.csv')
                    .pipe(csv())
                    .on('data', (row) => {
                        data [i++] =(row);
                    })
                    .on('end', () => {
                        console.log('CSV file successfully processed');

                fs.createReadStream('outatraso8.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');

                fs.createReadStream('outatraso9.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');

                fs.createReadStream('outatraso10.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');

                fs.createReadStream('outatraso11.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');

                fs.createReadStream('outatraso12.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data [i++] =(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    fastcsv
  .write(data, { headers: true })
  .pipe(ws);

  });
  });    
  });
  });
  });  
  });
});
});
});
});
});
});

  

