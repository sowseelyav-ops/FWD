const energySources = [
 {name:"coal",cost:6,carbon:1.2,region:"all",type:"Non-Renewable"},
 {name:"grid",cost:8,carbon:0.9,region:"all",type:"Mixed"},
 {name:"solar",cost:4,carbon:0.1,region:"sunny",type:"Renewable"},
 {name:"wind",cost:5,carbon:0.05,region:"windy",type:"Renewable"},
 {name:"hydro",cost:5.5,carbon:0.07,region:"water",type:"Renewable"}
];

function analyze(){

 let kwh = parseFloat(document.getElementById("kwh").value);
 let region = document.getElementById("region").value;
 let priority = document.getElementById("priority").value;
 let currentSource = document.getElementById("current").value;

 if (isNaN(kwh) || kwh <= 0) {
     document.getElementById("result").innerHTML =
     "⚠ Please enter valid electricity usage.";
     return;
 }

 let best = null;
 let bestScore = Infinity;

 energySources.forEach(e => {

    if(e.region !== "all" && e.region !== region) return;

    let score = 0;

    if(priority === "cost")
        score = e.cost * 3;
    else if(priority === "eco")
        score = e.carbon * 100;
    else
        score = e.cost * 2 + e.carbon * 50;

    if(score < bestScore){
        bestScore = score;
        best = e;
    }
 });

 let totalCost = (kwh * best.cost).toFixed(2);
 let totalCarbon = (kwh * best.carbon).toFixed(2);

 let usageLevel = "";
 if(kwh < 200) usageLevel = "Low";
 else if(kwh < 500) usageLevel = "Medium";
 else usageLevel = "High";

 let suitabilityMessage = "";

 if(currentSource === best.name){
     suitabilityMessage = "✅ Your current energy source is suitable based on your conditions.";
 } else {
     suitabilityMessage = `🔄 Switching to ${best.name.toUpperCase()} is recommended for better performance.`;
 }

 document.getElementById("result").innerHTML = `
    <p>⚡ Usage Level: <b>${usageLevel}</b></p>
    <p>💰 Estimated Monthly Cost: ₹ ${totalCost}</p>
    <p>🌍 Carbon Emission: ${totalCarbon} kg CO₂</p>
    <p>📊 Energy Type: <b>${best.type.toUpperCase()}</b></p>
    <br>
    <p><b>${suitabilityMessage}</b></p>
 `;
}