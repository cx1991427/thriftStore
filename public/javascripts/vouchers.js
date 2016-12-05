$.ajax({
    url: "images/vouchers/",
    success: function (data) 
    {
        var image_count = $(data).length(); 
        console.log("count of files" +image_count);    
    }
})(window.jQuery);