/**
 * Created by 品牌部 on 2016/11/01.
 */
$(document).ready(function(){
    //此处判断所有人
    if(false){
       $(".clsspepl").hide();
       $(".partorgn").hide();
    }
    var m="";
    $("#test").on("click",function(){
        var uu=[];
        alert(uu.length)
        m=getSelectedOrgId();
        //alert(m);
    });

    function setData($isShowAll,$josnData){
        $("#menu").append('<li class="clsspepl"><span><input type="radio" checked="checked" class="allpepl"/></span><span class="alpepltit">所有人</span></li>');
        $("#menu").append('<li class="fathcol"><span><input type="radio" class="partorgn"/></span><span class="orgntit">仅限部分组织</span><a href="javascript:;" class="all">全选</a></li>');
        $("#menu").append('<ul class="submenu" id="submenu"></ul>');
        var jsonArray = eval($josnData);
        for (var i = 0; i < jsonArray.length; i++){
            $("#submenu").append('<li><input type="checkbox" orgId="'+jsonArray[i]["orgId"] +'"/><span class="subtita">'+jsonArray[i]["name"]+'</span></li>');
            if(jsonArray[i].sub)
            {
                var submenuId = 'submenucol_' + i;
                $("#submenu").append('<ul class="submenucol" id=' + submenuId +'></ul>');
                for(var j=0;j<jsonArray[i].sub.length;j++)
                {
                    $("#" + submenuId).append('<li><input type="checkbox" orgId="' +jsonArray[i].sub[j]["orgId"]+ '"/><span class="subtitsa">'+jsonArray[i].sub[j]["name"]+'</span></li>');
                }
            }
        }
    }

    function getSelectedOrgId(){
        var allCheckedOrgIdArray = new Array();
        $('#submenu :checkbox:checked').each(function(){
            var orgId = $(this).attr('orgId');
            if(orgId != undefined){
                allCheckedOrgIdArray[allCheckedOrgIdArray.length] = orgId;
            }
        });
        return allCheckedOrgIdArray.join(",");
    }


    //正常调用
    function isAllChecked(){
        var chkAllNum = $("#submenu :checkbox").length;
        var chkedNum =  $('#submenu :checkbox:checked').length;
        return chkAllNum == chkedNum;
    }
    function setAllChk(){
        if(isAllChecked()){
            $(".all").text("取消");
        }else{
            $(".partorgn").attr("checked","checked");
            $(".all").text("全选");
        }
    }
    $.ajax({
        type:"POST",
        url:"test.json",
        data:{"orgid":m},
        dataType:"json",
        success:function(data){
            setData(1,data);
            $(".allpepl").on("click",function(){
                $(".partorgn").prop("checked",false);
                $(".menu :checkbox").prop("checked",false);
                $(".all").text("全选");
            });
            $(".partorgn").on("click",function(){
                $(".allpepl").prop("checked",false);
            });

            $(".all").on("click",function(){
                $(".partorgn").prop("checked",true);
                $(".allpepl").prop("checked",false);
                if(isAllChecked()){
                    $(".menu :checkbox").prop("checked", false);
                    $(".all").text("全选");
                }else{
                    $(".menu :checkbox").prop("checked", true);
                    $(".all").text("取消");
                }
            });
            $(".menu :checkbox").on("click",function(){
                $(".allpepl").prop("checked",false);
                $(".partorgn").prop("checked",true);
                setAllChk();
            });
            function isAllChecked(){
                var chkAllNum = $(".menu :checkbox").length;
                var chkedNum = $('#submenu').find('input:checked').length;
                return chkAllNum == chkedNum;
            }
        },
        error:function(){
            console.log("报错了！")
        }
    })

})