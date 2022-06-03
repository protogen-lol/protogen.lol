function CalculateTimeStamp()
{
    var tDate = document.getElementById("tDate").value
    var tType = document.getElementById("tType").value
    var date = Date.parse(tDate)
    
    if(date.toString() === "NaN")
    {
        document.getElementById("tResult").innerHTML = `You need to select the time which the TimeStamp will show`
    }
    else
    {
        date = date.toString()/1000
        tType = tType.replace("unix", date).replace("<", "&lt;").replace(">","&gt;")
        console.log(tType)
        document.getElementById("tResult").innerHTML = `The TimeStamp is ${tType}`
    }
}