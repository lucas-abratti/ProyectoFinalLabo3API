const btnMagico = document.getElementById("btnMagico");

btnMagico.addEventListener("click", () =>{
  var url = "http://colormind.io/api/";
  var data = {
    model : "default",
    input : [[ 199, 42, 12 ],"N","N","N",[ 217, 218, 165 ]]
  }
  
  var http = new XMLHttpRequest();
  
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      var palette = JSON.parse(http.responseText).result;
      console.log(palette);
      
      document.documentElement.style.setProperty("--first-color", `rgb(${palette[0][0]},${palette[0][1]},${palette[0][2]})`);
      document.documentElement.style.setProperty("--second-color", `rgb(${palette[1][0]},${palette[1][1]},${palette[1][2]})`);
      document.documentElement.style.setProperty("--third-color", `rgb(${palette[2][0]},${palette[2][1]},${palette[2][2]})`);
      document.documentElement.style.setProperty("--fourth-color", `rgb(${palette[3][0]},${palette[3][1]},${palette[3][2]})`);
      document.documentElement.style.setProperty("--fifth-color", `rgb(${palette[4][0]},${palette[4][1]},${palette[4][2]})`);
    }
  }
  
  http.open("POST", url, true);
  http.send(JSON.stringify(data));
})
