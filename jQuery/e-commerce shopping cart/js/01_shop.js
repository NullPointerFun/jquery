$(document).ready(function () {
    // 全选按钮点击事件
    $(".selectAll").click(function () {
        // 被勾选，勾选全部单个商品对应的勾选框
        if ($(this).prop("checked")) {
            $("input:checkbox").prop("checked", true);
        } else { // 取消勾选，取消全部单个商品对应的勾选框
            $("input:checkbox").prop("checked", false);
        }

    });

    // 单个商品对应的勾选框的点击事件
    $(".goodsBox input:checkbox").click(function () {
        var isAll = true;
        // 被勾选，若其他商品都被勾选，全选框勾选
        if ($(this).prop("checked")) {
            var checkArr = $(".goodsBox input:checkbox");
            for (var i = 0; i < checkArr.length; i++) {
                if (!(checkArr.eq(i).prop("checked"))) {
                    isAll = false;
                    break;
                }
            }
        } else {// 未勾选，取消全选框勾选
            isAll = false;
        }

        $(".selectAll").prop("checked", isAll);

        // 更新购物车总金额
         updateTotalPrice();
        
    });

    // 减号按钮点击事件
    $(".minBtn").click(function () {
        // 获取输入框的值
        var nums = $(this).siblings(".goods_num").val();
        if (nums > 1) {
            nums--;
            $(this).siblings(".goods_num").val(nums);  

        } else {
            alert("商品数量至少为1件");
        }
        // 更新当前商品金额

        updatePrice($(this).parents(),nums);
 
        // 更新购物车总金额
         updateTotalPrice();
        

    });

    // 加号按钮点击事件
    $(".maxBtn").click(function () {
        // 获取输入框的值
        var nums = $(this).siblings(".goods_num").val();
        if (nums < 999) {
            nums++;
            $(this).siblings(".goods_num").val(nums);
        } else {
            alert("商品数量并不能超过999");
        }

        

        // 更新当前商品金额

        updatePrice($(this).parents(),nums);
        

        // 更新购物车总金额

         updateTotalPrice();


    });

    // 删除按钮点击事件
    $(".delBtn").click(function(){
        //弹出确认框提醒用户（返回值true表示确认）
		var result = confirm("您确认删除当前商品吗？");
        if(result){
            $(this).parents(".goodsBox").remove();

            //更新结算总价
             updateTotalPrice();
        }
        
    });

    // 清空购物车点击事件
    $(".clearshop").click(function(){
        var result = confirm("是否确认清空购物车？");
        if(result){
            $("tr.goodsBox").remove();
            $(".total_price").text("0.00");
        }
    })





    /**
     * 更新单个商品的总金额
     * @param {*} td 当前商品数量控件的父元素
     * @param {*} nums 当前商品的单价
     */
    //更新指定商品总价
    function updatePrice(td,nums){
        var unit_price=td.prev().children(".unit_price").text();
        var price=(unit_price * nums).toFixed(2);
        td.next().children(".price").text(price);
    } 




    /**
     * 计算购物车的总价
     */
    //更新结算总金额
    function updateTotalPrice(){
        
        var total_price=0;

        var checkArr=$(".goodsBox input:checkbox");

        for(var i=0;i<checkArr.length;i++){
            if(checkArr.eq(i).prop("checked")){
                var price=checkArr.eq(i).parents(".goodsBox").find(".price").text();
                total_price+=Number(price);
            }
        }
        $(".total_price").text(total_price.toFixed(2));
    }




    // 结算按钮点击事件
    $('.calculate').click(function () {
        let totalPrice = parseFloat($('.total_price').text()); // 获取当前的总金额
        let selectedGoods = $('.goodsBox input[type="checkbox"]:checked'); // 获取被选中的商品
        if (totalPrice > 0 && selectedGoods.length > 0) {
            alert('已成功支付的总金额：￥' + totalPrice.toFixed(2)); // 弹窗提示已成功支付的总金额
            // 移除已付款商品
            selectedGoods.each(function () {
                $(this).closest('.goodsBox').remove();
            });
            // 更新结算总金额
            updateTotalPrice();
        } else {
            alert('请先选择商品进行结算');
        }
    });
    // 更新结算总金额的函数
    function updateTotalPrice() {
        let totalPrice = 0;
        $('.goodsBox input[type="checkbox"]:checked').each(function () {
            let price = parseFloat($(this).closest('.goodsBox').find('.price').text());
            totalPrice += price;
        });
        $('.total_price').text(totalPrice.toFixed(2)); // 更新底部结算工具栏中显示的结算总金额
    }





    // 单个商品对应的勾选框的点击事件
    $(".goodsBox input:checkbox").click(function () {
        var isAll = true;
        // 被勾选，若其他商品都被勾选，全选框勾选
        if ($(this).prop("checked")) {
            var checkArr = $(".goodsBox input:checkbox");
            for (var i = 0; i < checkArr.length; i++) {
                if (!(checkArr.eq(i).prop("checked"))) {
                    isAll = false;
                    break;
                }
            }
        } else { // 未勾选，取消全选框勾选
            isAll = false;
        }

        // 更新全选框状态
        $(".selectAll").prop("checked", isAll);

        // 动态更新背景颜色
        if ($(this).prop("checked")) {
            $(this).closest('.goodsBox').addClass('selected'); // 选择背景颜色
        } else {
            $(this).closest('.goodsBox').removeClass('selected'); // 移除背景颜色
        }

        // 更新购物车总金额
        updateTotalPrice();
    });



    $(document).ready(function () {
        // 监听商品图片的点击事件
        $('.goodsBox img').click(function () {
            // 获取点击的商品图片的 URL
            var imageUrl = $(this).attr('src');

            // 设置预览图的图片 URL
            $('.modalImage').attr('src', imageUrl).show();

            // 显示预览图
            $('#previewModal').fadeIn(500);
        });

        // 监听关闭按钮的点击事件
        $('.closeButton').click(function () {
            // 隐藏预览图，使用 fadeOut 动画
            $('#previewModal').fadeOut(500, function () {
                // 隐藏预览图的图片
                $('.modalImage').hide();
            });
        });
    });







});
