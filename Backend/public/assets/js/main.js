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
    
    $("#submit_question").click(function() {
        var fields = [
            "questioner_name",
            "recipt_id",
            "product_id",
            "question"
        ]
        var submit = {
            "question_tag": $("#question_tag").text()
        }
        for(var item in fields) {
            submit[fields[item]] = $(`#${fields[item]}`).val()
        }
        $.post( "/submit_problem", submit, function(data) {
            window.location.reload();
        });
    })
    
    $("#recipt_id, #product_id").keyup(function() {
        var fields = ["recipt_id", "product_id"]
        var submit = {}
        for(var item in fields) {
            submit[fields[item]] = $(`#${fields[item]}`).val()
        }
        $.post( "/query_car", submit, function(data) {
            if(data.length() == 0) {
                $('#name').val("???")
                $('#car_id').val("???")
                $("#product_name").val(`品名：?`)
            } else {
                $('#name').val(data[0].name)
                $('#car_id').val(data[0].car_id)
                $("#product_name").val(`品名：${data[0].product_name}`)
            }
        });
        
    })
    
    $("#submit_answer").click(function() {
        var fields = [
            "replyer_name",
            "reply"
        ]
        var submit = {
            "question_tag": $("#reply_tag").text()
        }
        for(var item in fields) {
            submit[fields[item]] = $(`#${fields[item]}`).val()
        }
        $.post( "/answer_problem", submit, function(data) {
            window.location.reload();
        });
    })
    
    function update_tag() {
        $("#question_tag").text(moment().format('YYYY/MM/DD HH:mm:ss'))
        $("#reply_tag").text(moment().format('YYYY/MM/DD HH:mm:ss'))
        setTimeout(update_tag, 500)
    }
    update_tag();
})