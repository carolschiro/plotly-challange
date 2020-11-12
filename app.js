    // initial data rendering
function init() {
    // dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("StarterCode/samples.json").then((data)=> {
        console.log(data)

    // id dropdwown menu
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value");
        });

    // display the data and the plots to the page
        charts(data.names[0]);
        table(data.names[0]);
    });
}

init();

// create the function for the change event
function optionChanged(id) {
    charts(id);
    table(id);
}

//d3.selectAll("#selDataset").on("change", charts);//
function charts(id) {
    //Read samples.json
    d3.json("StarterCode/samples.json").then (sampledata => {
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
    // get top 10 otu ids for the plot  
        var outTop = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    // formatt for the plot
        var outId = outTop.map(d => "OTU" + d);
        console.log(`OTU IDS: ${outId}`)
     // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: outId,
            text: labels,
            marker: {
            color: 'light blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable 
        var layoutbar = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
   
        // create the bar plot
    Plotly.newPlot("bar", data, layoutbar);

//        var bar= d3.select("#bar");
//        bar.html("");
   
//    Object.entries(result).forEach((key) => {   
//        bar.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n"); 
//   };
//
        // create the bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // layout for the bubble plot
        var layoutBubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        //data variable 
        var data1 = [trace1];

    // create the bubble plot
    Plotly.newPlot("bubble", data1, layoutBubble); 
    });
}  
// get the data
function table(id) {
// read the json file to get data
    d3.json("StarterCode/samples.json").then((data)=> {
// metadata for the demographic panel
    var metadata = data.metadata;

    console.log(metadata)

      // filter metadata info by id
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // select demographic panel to put data
    var demographicInfo = d3.select("#sample-metadata");
        
     // empty the demographic panel
    demographicInfo.html("");

     // demographic data to append on change event
    Object.entries(result).forEach((key) => {   
        demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
});
}

