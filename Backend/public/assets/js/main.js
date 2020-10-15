$(document).ready(function() {
    let githubURL = new URL(window.location.href);
    let params = githubURL.searchParams;
    let type = params.get('q'); 
    if(type == "weida") {
        $(".asia_star_only").css("display", "none")
        $(".weida_disable").attr('disabled','disabled');
    }
    if(type == "asia") {
        $(".asia_disable").attr('disabled','disabled');
    }
    
    $("input[type=file]").change(function(){
        alert($(this).val());
    });
})