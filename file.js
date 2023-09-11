const fs = require("node:fs/promises");
const cityname =
  "casablanca,paris,london,lisbon,cairo,tanger,agadir,madrid,roma,liverpool,oujda,milan";

// for choice city randomly
function choiceRandomly(cityname) {
  let index = Math.floor(Math.random() * cityname.length);
  return index;
}
// this function for create input file
async function Createfile(cityname) {
  try {
    await fs.writeFile("input.txt", cityname);
  } catch (err) {
    console.log("can not create the input file:", err);
  }
}
// for fetch the data of the city choice
async function returnData(cityname) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=d18e304704a44a208db102705232908&q=${cityname}&aqi=no`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    } else {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    return err;
  }
}
//function make choice a city
async function choiceCity() {
  try {
    let data = await fs.readFile("input.txt", "utf-8");
    let cities = data.split(",");
    return cities[choiceRandomly(cities)];
  } catch (err) {
    console.log("can not read file", err);
  }
}

choiceCity().then((data) => {
  returnData(data.toUpperCase())
    .then((data) => {
      if (data instanceof Error) {
        console.error(data);
        return;
      }
      fs.writeFile(
        data.location["name"] + ".txt",
        data.current["temp_c"].toString(),
        "utf-8"
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

// async function returnData(cityname){
//   try{
//   let response=await fetch(`http://api.weatherapi.com/v1/current.json?key=d18e304704a44a208db102705232908&q=${cityname}&aqi=no`);
//     if (!response.ok) {
//             throw new Error(`Request failed with status ${reponse.status}`)
//      }else{
//             let data=await response.json()
//             return data
//      }
//    }catch(err){
//     console.log("can not fetch the data",err);
//    }
// }
// returnData("casablanca")

// let randomindex=Math.floor(Math.random()*cities.length)
// let randomcity=cities[randomindex];
// let response=await fetch(`http://api.weatherapi.com/v1/current.json?key=d18e304704a44a208db102705232908&q=${randomcity}&aqi=no`)
// let citydata=await response.json();
// console.log(citydata);
// fs.writeFile(randomcity+'.txt',citydata.current["temp_c"].toString(),{encoding:'utf-8'})
// console.log(cities[choiceRandomly(cities)]);

// fs.unlink("input.txt",(err)=>{
//     if (err){
//         console.log("can not delete a file");
//     }else{
//         console.log("file deleted");
//     }
// })
