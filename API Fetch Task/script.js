let videos=document.getElementById("videos");
$(document).ready(function(){
    var API_KEY="your api key";
    var video='';
    var desc=""
    $("#form").submit(function(event){
        event.preventDefault()
        var search=$("#search").val()
        // alert("form is submit");
        videoSearch(API_KEY,search,15)
    })
    function videoSearch(key,search,maxResults){
        $.get("https://www.googleapis.com/youtube/v3/search?key="+key
        +"&type=video&part=snippet&maxResults="+maxResults+"&q="+search,function(data){
            console.log(data)
            data.items.forEach(item=>{
                desc=`${item.snippet.description}`;
                
                video=`
               
                <iframe id="player" type="text/html" width="640" height="390"src="http://www.youtube.com/embed/${item.id.videoId}"
  frameborder="0"></iframe>
                `
                let addVideo=document.createElement('div');
                let addDesc=document.createElement('p');
                addVideo.className="items";
                addDesc.className="desc";
                addVideo.innerHTML=video;
                addDesc.innerHTML=desc;
                videos.appendChild(addVideo);
                videos.appendChild(addDesc);
                // $("#videos").append(video)
                // $("#desc").append(desc)
                
                
            })
        })
    }
})

//  <iframe width="420" height="315" src="https://www.youtube.com.embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
