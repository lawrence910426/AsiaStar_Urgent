function gen(row) {
    return `
<div class="card" style="margin-top:100px">
    <div class="card-body">
<div class="row">
    <div class="col">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th><strong>貨主</strong></th>
                        <th><strong>發問人</strong></th>
                        <th><strong>單號</strong></th>
                        <th><strong>料號</strong></th>
                        <th><strong>須追蹤問題</strong></th>
                        <th><strong>發問時間</strong></th>
                        <th><strong>配送司機</strong></th>
                        <th><strong>配送車號</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>維達</td>
                        <td><textarea class="asia_disable" style="height: 30px;width: 100%;" placeholder="[吳邦寧]" disabled="disabled">${row.questioner_name}</textarea></td>
                        <td><textarea class="asia_disable" style="height: 30px;width: 100%;" placeholder="[5487580]" disabled="disabled">${row.recipt_id}</textarea></td>
                        <td><textarea class="asia_disable" style="height: 30px;width: 100%;" placeholder="[5809487]" disabled="disabled">${row.product_id}</textarea><label id="product_name" style="width: 100%;">品名：???</label></td>
                        <td><textarea id="question" class="asia_disable" style="width: 100%;height: 150px;" placeholder="[Why is it so late?]" disabled="disabled">${row.question}</textarea>
                            <div class="d-xl-flex justify-content-xl-end"><button class="btn btn-primary asia_disable" id="submit_question" type="button" disabled="disabled">發問</button></div>
                        </td>
                        <td><label id="question_tag">${row.question_tag}</label></td>
                        <td><label id="name">???</label></td>
                        <td><label id="car_id">???</label></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th><strong>回覆人</strong><br /></th>
                        <th><strong>回覆情形</strong><br /></th>
                        <th><strong>回覆時間</strong><br /></th>
                        <th><strong>解決否</strong><br /></th>
                        <th><strong>解決時間</strong><br /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label></label><textarea class="weida_disable" style="height: 30px;width: 100%;" placeholder="[吳邦寧]" id="${row.id}_replyer_name">${row.replyer_name == undefined ? "" : row.replyer_name}</textarea></td>
                        <td><textarea class="weida_disable" style="width: 100%;height: 150px;" placeholder="[Replied]" id="${row.id}_reply">${row.reply == undefined ? "" : row.reply}</textarea>
                            <div class="d-xl-flex justify-content-xl-end"><button class="btn btn-primary weida_disable submit_answer" self_id="${row.id}" type="button">回答</button></div>
                        </td>
                        <td><label id="${row.id}_reply_tag" class="reply_tag">???</label></td>
                        <td>
                            <div class="form-check"><input id="${row.id}_solve" type="checkbox" class="form-check-input weida_disable solve" self_id="${row.id}" /><label class="form-check-label" for="${row.id}_solve">是否解決</label></div>
                        </td>
                        <td><label class="solve_tag" id="${row.id}_solve_tag">???</label></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div></div>`
}

$(document).ready(function() {
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
    
    
    $.post( "/get_questions", function(data) {
        for(var i in data) {
            $("#history").append(gen(data[i]))
        }
        hook();
    });
    
    function hook() {
        function update_tag() {
            $(".question_tag, .reply_tag, .solve_tag, #question_tag ").text(moment().format('YYYY/MM/DD HH:mm:ss'))
            setTimeout(update_tag, 500)
        }
        update_tag();

        let githubURL = new URL(window.location.href);
        let params = githubURL.searchParams;
        let type = params.get('q'); 
        if(type == "weida") {
            $(".asia_star_only").css("display", "none")
            $(".weida_disable").attr('disabled','disabled');
        }
        if(type == "asia") {
            $(".weida_only").css("display", "none")
            $(".asia_disable").attr('disabled','disabled');
        }
        
        $(".submit_answer").off().click(function() {
            var id = $(this).attr('self_id')
            var submit = {
                "id": id,
                "content": {
                    "question_tag": $(`#${id}_reply_tag`).text(),
                    "replyer_name": $(`${id}_replyer_name`).val(),
                    "reply": $(`#${id}_reply`).val()
                }
            }
            $.post("/answer_problem", submit, function(data) {
                //window.location.reload();
            });
        })
        
        $(".solve").off().click(function() {
            var id = $(this).attr('self_id')
            var submit = {
                "id": id,
                "content": {
                    "tag": $(`#${id}_solve_tag`).text(),
                    "solve": $(`#${id}_solve`).prop("checked") ? 1 : 0 
                }
            }
            $.post("/solve_problem", submit, function(data) {
                //window.location.reload();
            });
        })
    }
    hook();
})