const kickstarterUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
const movieUrl = " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
const gameUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"


let movieData;
let kickstarterData;
let gameData;



const svg = d3.select(".container")
              .append("svg")
              .attr("width", 1000)
              .attr("height", 600)

const divTooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .attr("id", "tooltip")
                    .style("opacity", 0)
             
                   
const drawTreeMap =()=>{
    let hierarchy = d3.hierarchy(movieData, (node)=> node.children)
                      .sum((node)=>node.value)
                      .sort((node1,node2)=>node2.value - node1.value)
console.log(hierarchy.leaves())

const createTreeMap = d3.treemap()
                        .size([1000,600])

createTreeMap(hierarchy)

let movieTitles = hierarchy.leaves()

  let group = svg.selectAll("g")
                    .data(movieTitles)
                    .enter()
                    .append("g")
                    .attr("transform", (m)=>{
                        return 'translate('+m.x0+', '+m.y0+')'})

    group.append("rect")
         .attr("class", "tile")
         .attr("fill", (m)=>{
            const category = m.data.category
            if(category == "Action"){
                return "#64a800"
            }else if(category == "Adventure"){
                return "#a84400"
            }else if(category == "Comedy"){
                return "#e5e8ff"
            }else if(category == "Drama"){
                return "#ccd1ff"
            }else if(category == "Animation"){
                return "#808cff"
            }else if(category == "Family"){
                return "#cac150"
            }else{
                return "#56cb50"
            }
         })
         .attr("data-name", (m)=>m.data.name)
         .attr("data-category", (m)=>m.data.category)
         .attr("data-value", (m)=>m.data.value)
         .attr('width', (m)=> m.x1 - m.x0)
         .attr('height', (m)=> m.y1 - m.y0)
         .on("mousemove", function(event, m){
            divTooltip.style("opacity", 0.9)
                      .html(
                        'Name: '+ m.data.name+'<br/>'
                        +'Category: '+m.data.category+'<br/>' 
                        +'Value: '+m.data.value
                      )
                      .style("left", event.pageX +"px")
                      .style("top", event.pageY-28 +"px")
                      .attr("data-value", m.data.value)
         })
         .on("mouseout", ()=>{
            divTooltip.style("opacity", 0)
         })

    group.append("text")
         .text((m)=> m.data.name)
         .attr("x", 5)
         .attr("y", 20)
         .style("font-size", 8+"px")

}


d3.json(movieUrl).then(
    (data, error)=>{
        if(error){
            console.log(error)
        }else{
         
            movieData = data
            console.log(movieData)
            drawTreeMap();
        }
    }
)




