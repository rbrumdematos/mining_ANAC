const csv = require('csv-parser');
const fs = require('fs');

let empresa = [];
let voo = [];
let aerportoOrigem = [];
let aeroportoDestino = [];
let diaDaSemana = [];
let hora = [];
let mes = [];
let binnedAtraso = [];
let uniqueEmpresa;
let structureEmpresa=[];
let structureAerportosOrigem=[];
let structureAerportosDestino=[];
let structureVoos=[];
let structureHora=[];
let structureMes=[];
let structureDiaDaSemana=[];
const listaDiaDaSemana = [0,1,2,3,4,5,6,7]
const listaMes= [1,2,3,4,5,6,7,8,9,10,11,12]
const listaHora= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
let temp=[];
let totalAtraso0 =0;
let totalAtraso1 =0;
let totalAtraso2 =0;
let totalAtraso3 =0;
let totalAtraso4 =0;
let classifiedAs =0;
let classifiedCorrectly=0;
let incorrectClassifiedCorrectly=0;
let incorrectClassifiedCorrectlyby1 =0 ;
let incorrectClassifiedCorrectlyby2 =0 ;

let i=0;
let j=0;
let acumulador=0;

fs.createReadStream('Final_pronta2.csv')
  .pipe(csv())
  .on('data', (row) => {
    
    temp[i] = row; //remover depois

    empresa[i]=row.empresa;    
    voo[i]=row.voo;    
    aerportoOrigem[i]=row.aerportoOrigem;    
    aeroportoDestino[i]=row.aeroportoDestino;    
    diaDaSemana[i]=row.diaDaSemana;    
    hora[i]=row.hora; 
    mes[i]=row.mes; 
    binnedAtraso[i]=row.binnedAtraso; 
    if (binnedAtraso[i]==0)
    totalAtraso0++;
    if (binnedAtraso[i]==1)
    totalAtraso1++;
    if (binnedAtraso[i]==2)
    totalAtraso2++;
    if (binnedAtraso[i]==3)
    totalAtraso3++;
    if (binnedAtraso[i]==4)
    totalAtraso4++;
    i++;
    //console.log(empresa);
  })
  .on('end', () => {


    const listaEmpresas = [... new Set(empresa)]
    //console.log(listaEmpresas);
    for (j=0;j<listaEmpresas.length;j++){
    let entry = {"name":listaEmpresas[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
    structureEmpresa.push(entry);
    }

    const listaAeroportos = [... new Set(aerportoOrigem)]
    for (j=0;j<listaAeroportos.length;j++){
      let entry = {"name":listaAeroportos[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
      structureAerportosOrigem.push(entry);
      structureAerportosDestino.push(entry);
      }


    const listaVoo = [... new Set(voo)]
    for (j=0;j<listaVoo.length;j++){
      let entry = {"name":listaVoo[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
      structureVoos.push(entry);
      }

      for (j=0;j<listaDiaDaSemana.length;j++){
        let entry = {"name":listaDiaDaSemana[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
        structureDiaDaSemana.push(entry);
        }  

        for (j=0;j<listaMes.length;j++){
          let entry = {"name":listaMes[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
          structureMes.push(entry);
          }  
          for (j=0;j<listaHora.length;j++){
            let entry = {"name":listaHora[j],"p0":0,"p1":0,"p2":0,"p3":0,"p4":0}
            structureHora.push(entry);
            }  

    for (j=0;j<i;j++)
    {
      let result0 = structureEmpresa.find( ({ name }) => name === empresa[j]);
      let result1 = structureVoos.find( ({ name }) => name === voo[j]);
      let result2 = structureAerportosOrigem.find( ({ name }) => name === aerportoOrigem[j]);
      let result3 = structureAerportosDestino.find( ({ name }) => name === aeroportoDestino[j]);
      let result4 = structureDiaDaSemana.find( ({ name }) => name == diaDaSemana[j]);
      let result5 = structureHora.find( ({ name }) => name == hora[j]);
      let result6 = structureMes.find( ({ name }) => name == mes[j]);

      if (binnedAtraso[j]==0)
      {
      result0.p0++;
      result1.p0++;
      result2.p0++;
      result3.p0++;
      result4.p0++;
      result5.p0++;
      result6.p0++;}
      if (binnedAtraso[j]==1)
      {
        result0.p1++;
        result1.p1++;
        result2.p1++;
        result3.p1++;
        result4.p1++;
        result5.p1++;
        result6.p1++;}
      if (binnedAtraso[j]==2)
      {
        result0.p2++;
        result1.p2++;
        result2.p2++;
        result3.p2++;
        result4.p2++;
        result5.p2++;
        result6.p2++;}
      if (binnedAtraso[j]==3)
      {
        result0.p3++;
        result1.p3++;
        result2.p3++;
        result3.p3++;
        result4.p3++;
        result5.p3++;
        result6.p3++;}
      if (binnedAtraso[j]==4)
      {
        result0.p4++;
        result1.p4++;
        result2.p4++;
        result3.p4++;
        result4.p4++;
        result5.p4++;
        result6.p4++;}

    }


      // end of modeling


      for (j=0;j<temp.length;j++)
      //for (j=0;j<30;j++)
      {


  let probEmpresa = structureEmpresa.find( ({ name }) => name === temp[j].empresa);
  let probEmpresaBayes = calcProb (probEmpresa.p0,probEmpresa.p1,probEmpresa.p2,probEmpresa.p3,probEmpresa.p4);
  let probVoo = structureVoos.find( ({ name }) => name === temp[j].voo);
  let probVooBayes = calcProb (probVoo.p0,probVoo.p1,probVoo.p2,probVoo.p3,probVoo.p4);
  let probAeroOrigem = structureAerportosOrigem.find( ({ name }) => name === temp[j].aerportoOrigem);
  let probAeroOrigemBayes = calcProb (probAeroOrigem.p0,probAeroOrigem.p1,probAeroOrigem.p2,probAeroOrigem.p3,probAeroOrigem.p4);
  let probAeroDestino = structureAerportosDestino.find( ({ name }) => name === temp[j].aeroportoDestino);
  let probAeroDestinoBayes = calcProb (probAeroDestino.p0,probAeroDestino.p1,probAeroDestino.p2,probAeroDestino.p3,probAeroDestino.p4);
  let probSemana = structureDiaDaSemana.find( ({ name }) => name == temp[j].diaDaSemana);
  let probSemanaBayes = calcProb (probSemana.p0,probSemana.p1,probSemana.p2,probSemana.p3,probSemana.p4);
  let probHora = structureHora.find( ({ name }) => name == temp[j].hora);
  let probHoraBayes = calcProb (probHora.p0,probHora.p1,probHora.p2,probHora.p3,probHora.p4);
  let probMes = structureMes.find( ({ name }) => name == temp[j].mes);
  let probMesBayes = calcProb (probMes.p0,probMes.p1,probMes.p2,probMes.p3,probMes.p4);

    let probBayes = calcBayes (probEmpresaBayes,probVooBayes,probAeroOrigemBayes,probAeroDestinoBayes,
      probSemanaBayes,probHoraBayes,probMesBayes);


    if (probBayes.p0>probBayes.p1&&probBayes.p0>probBayes.p2&&probBayes.p0>probBayes.p3&&probBayes.p0>probBayes.p4)
    classifiedAs = 0;
    else if (probBayes.p1>probBayes.p2&&probBayes.p1>probBayes.p3&&probBayes.p1>probBayes.p4)
    classifiedAs = 1;
    else if (probBayes.p2>probBayes.p3&&probBayes.p2>probBayes.p4)
    classifiedAs = 2;
    else if (probBayes.p3>probBayes.p4)
    classifiedAs = 3;
    else
    classifiedAs = 4;



if (classifiedAs==temp[j].binnedAtraso)
classifiedCorrectly++;
else if(Math.abs(classifiedAs-temp[j].binnedAtraso)==1)
incorrectClassifiedCorrectlyby1++;
else if(Math.abs(classifiedAs-temp[j].binnedAtraso)==2)
incorrectClassifiedCorrectlyby2++;
else
incorrectClassifiedCorrectly++;


        }
      
        console.log("classifiedCorrectly "+classifiedCorrectly);
        console.log("incorrectClassifiedCorrectlyby1 "+incorrectClassifiedCorrectlyby1);
        console.log("incorrectClassifiedCorrectlyby2 "+incorrectClassifiedCorrectlyby2);
        console.log("incorrectClassifiedCorrectly "+incorrectClassifiedCorrectly);
  //  fastcsv
  //.write(data, { headers: true })
  //.pipe(ws);
  });

function calcProb(a,b,c,d,e) {
  let prob=[];
  prob.p0=a/totalAtraso0
  prob.p1=b/totalAtraso1
  prob.p2=c/totalAtraso2
  prob.p3=d/totalAtraso3
  prob.p4=e/totalAtraso4


  return prob;
}

function calcBayes(probEmpresa,probVoo,probAeroOrigem,probAeroDestino,probSemana,probHora,probMes) {

  let probAtraso =[];
  probAtraso.p0 = probEmpresa.p0*probVoo.p0*probAeroOrigem.p0*probAeroDestino.p0*probSemana.p0*probHora.p0*probMes.p0;
  probAtraso.p1 = probEmpresa.p1*probVoo.p1*probAeroOrigem.p1*probAeroDestino.p1*probSemana.p1*probHora.p1*probMes.p1;
  probAtraso.p2 = probEmpresa.p2*probVoo.p2*probAeroOrigem.p2*probAeroDestino.p2*probSemana.p2*probHora.p2*probMes.p2;
  probAtraso.p3 = probEmpresa.p3*probVoo.p3*probAeroOrigem.p3*probAeroDestino.p3*probSemana.p3*probHora.p3*probMes.p3;
  probAtraso.p4 = probEmpresa.p4*probVoo.p4*probAeroOrigem.p4*probAeroDestino.p4*probSemana.p4*probHora.p4*probMes.p4;

  return probAtraso;
}



//var predictions = model.predict(Xtest);