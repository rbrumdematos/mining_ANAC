const csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("outatraso12.csv");
let data = [];
let i=0;

fs.createReadStream('VRA_201912.csv')
  .pipe(csv())
  .on('data', (row) => {
      //console.log("START");
    let horaReal 
    let diaPrevisto = Number(row.chegadaPrevista.substr(0, 2));

    let mesPrevisto = Number(row.chegadaPrevista.substr(3, 2));
    let anoReal = Number(row.chegadaReal.substr(6, 4));
    let anoPrevisto = Number(row.chegadaPrevista.substr(6, 4));

    diaPrevisto = mesPrevisto*30+diaPrevisto;
    let diaReal = Number(row.chegadaReal.substr(0, 2));
    let mesReal = Number(row.chegadaReal.substr(3, 2));
    diaReal = mesReal*30+diaReal;

    let horaPrevista = Number(row.chegadaPrevista.substr(11, 2));
    let minPrevista = Number(row.chegadaPrevista.substr(14, 2));
    let chegadaPrevistaMinutos = horaPrevista*60+minPrevista;
    if (diaReal == diaPrevisto)
    {
     horaReal = Number(row.chegadaReal.substr(11, 2));}
    if (diaReal>diaPrevisto) 
    { horaReal = Number(row.chegadaReal.substr(11, 2))+24;
        //console.log(row.chegadaPrevista)
        //console.log(row.chegadaReal)
        //console.log(horaReal);
    }
    if (diaReal<diaPrevisto)
    { horaReal = Number(row.chegadaReal.substr(11, 2))-24;
        //console.log(row.chegadaPrevista)
        //console.log(row.chegadaReal)
        //console.log(horaReal);
    }
    let minReal = Number(row.chegadaReal.substr(14, 2));
    let chegadaRealMinutos = horaReal*60+minReal
    let atrasoTotalMin=chegadaRealMinutos-chegadaPrevistaMinutos;
    if (atrasoTotalMin<=0)
    atrasoTotalMin=0;

    if (row.chegadaPrevista != "" && row.codigoTipo=="N" && row.situacaoVoo=="REALIZADO" && anoPrevisto == 2019 && anoReal ==2019){
      //row.chegadaReal = new Date(row.chegadaReal)
      //row.chegadaPrevista = new Date(row.chegadaPrevista)
      let temp = new Date(""+mesPrevisto+"/"+(row.chegadaPrevista.substr(0, 2))+"/2019");
      row.diaDaSemana = temp.getDay();
      row.hora = Number(row.chegadaReal.substr(11, 2));
      row.mes = mesPrevisto;
      //console.log(row.date);
      delete row.codigoTipo; 
    delete row.dI; 
    delete row.codigoJustificativa;
    delete row.situacaoVoo;
    delete row.chegadaPrevista;
    //delete row.chegadaReal;
    delete row.partidaPrevista;
    delete row.partidaReal;
    data[i]=row;
    data[i].atrasoTotalMinutos = atrasoTotalMin;
    if (atrasoTotalMin==0)
    data[i].binnedAtraso = 0;
    else if (atrasoTotalMin<30)
    data[i].binnedAtraso = 1;
    else if (atrasoTotalMin<60)
    data[i].binnedAtraso = 2;
    else if (atrasoTotalMin<120)
    data[i].binnedAtraso = 3;
    else 
    data[i].binnedAtraso = 4;

    
    i++;}
    
  })
  .on('end', () => {

    fastcsv
  .write(data, { headers: true })
  .pipe(ws);
  });