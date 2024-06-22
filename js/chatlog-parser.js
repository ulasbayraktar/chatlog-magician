function useRegex(input) {
    let regex = /([01]\d|2[0-3]):[0-5]\d:[0-5]\d/;
    return regex.test(input);
}

$(document).ready(function() {
    function e() {
        $(".generated").remove(), $(".clear").remove();
        for (var e = $("textarea").val().replace("<script>", "").replace("</script>", "").split("\n"), t = 0; t < e.length; t++)
            $(".output").append(
                '<div class="generated" id="chatlogOutput">' +
                (useRegex(e[t]) ? e[t].slice(10) : e[t].slice(0)) +
                '</div><div class="clear"></div>'
            );
        $(".generated").each(function() {
            var lines = $(this).text().split('\n');
            var formattedLines = [];

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                function replaceColorCodes(str) {
                    return str.replace(/\{([A-Fa-f0-9]{6})\}/g, function(match, p1) {
                        return '<span style="color: #' + p1 + ';">';
                    }).replace(/\{([A-Fa-f0-9]{6})\}/g, '</span>');
                }

                line = replaceColorCodes(line);
                formattedLines.push(line);
            }

            
            var formattedText = formattedLines.join('<br>');

            navigator.userAgent.indexOf("Chrome") != -1 && $(this).append(" ⠀");

            formattedText.toLowerCase().indexOf("*") >= 0 && $(this).addClass("me");

            formattedText.toLowerCase().indexOf(" says:") >= 0 && $(this).addClass("white");
            formattedText.toLowerCase().indexOf(" [low]:") >= 0 && $(this).addClass("grey");

            formattedText.toLowerCase().indexOf(", $") >= 0 && $(this).addClass("grey");
            formattedText.toLowerCase().indexOf("you have received $") >= 0 && $(this).addClass("grey");

            formattedText.toLowerCase().indexOf(" whispers:") >= 0 && $(this).addClass("whisper");
            formattedText.toLowerCase().indexOf(" whispers:") >= 0 && formattedText.toLowerCase().indexOf("(car)") >= 0 && $(this).addClass("carwhisper");
            formattedText.toLowerCase().indexOf(" (phone)") >= 0 && $(this).addClass("whisper");
            formattedText.toLowerCase().indexOf(":o<") >= 0 && $(this).addClass("whisper");
            formattedText.toLowerCase().indexOf(" (phone - low)") >= 0 && $(this).addClass("whisper");

            formattedText.toLowerCase().indexOf(" [san interview]") == 0 && $(this).addClass("news");
            formattedText.toLowerCase().indexOf("[san interview]") == 0 && $(this).addClass("news");
            formattedText.toLowerCase().indexOf(" **[ch:") == 0 && $(this).addClass("radio");
            formattedText.toLowerCase().indexOf("**[ch:") == 0 && $(this).addClass("radio");

            formattedText.toLowerCase().startsWith(" ** [") && formattedText.toLowerCase().includes("]") && /\[.*?\]/.test(formattedText) && $(this).addClass("dep");
            formattedText.toLowerCase().startsWith("** [") && formattedText.toLowerCase().includes("]") && /\[.*?\]/.test(formattedText) && $(this).addClass("dep");



            $(this).html(formattedText); 

            $(this).textContent += "‎  ";
            formattedText || $(this).remove();
            $(".generated:first").css("margin-top", "30px");
            $(".generated:first").css("padding-top", "10px");
            $(".generated:last").css("padding-bottom", "10px");
            $(".generated:last").css("margin-bottom", "30px");
            $(".generated").css(
                "background-color",
                "transparent"
            );
        });

    }
    charName = $("#name").val().toLowerCase();
    var t = $.jStorage.get("lastCharName");
    t || $.jStorage.set("lastCharName", ""),
        $("#name").val($.jStorage.get("lastCharName")),
        $("#name").bind("input propertychange", function() {
            (charName = $("#name").val().toLowerCase()),
            $.jStorage.set("lastCharName", charName),
                e();
        });
    var r = $.jStorage.get("lastFontSize"),
        o = $.jStorage.get("lastLineHeight");
        r || o ? ($(".output").css({
                "font-size": $.jStorage.get("lastFontSize") + "px",
                "line-height": ($.jStorage.get("lastFontSize") - 10) + "px",
            }),
            $("#font-label").text(
                "font size (" + $.jStorage.get("lastFontSize") + "px):"
            )) :
        ($.jStorage.set("lastFontSize", "12"),
        $.jStorage.set("lastLineHeight", ($.jStorage.get("lastFontSize") - 10))),
        $(".output").css({
            "font-size": "12px",
            "line-height": "2px",
        })
        
        $("input[name='font-label']").bind("input propertychange", function() {
            var newSize = parseInt($(this).val());
            if (newSize >= 10 && newSize <= 64) {
                $(".output").css({
                    "font-size": newSize + "px",
                    "line-height": (newSize - 10) + "px",
                });
                $("#font-label").text("font size (" + newSize + "px):");
                $.jStorage.set("lastFontSize", newSize);
                $.jStorage.set("lastLineHeight", newSize);
            } else {}
        });


    $("textarea").bind("input propertychange", function() {
            e();
        }),
        $("#color-picker").spectrum({
            color: "#000",
            showInput: !0,
            preferredFormat: "hex",
            change: function() {
                $.jStorage.set("lastColor", $("#color-picker").spectrum("get").toHex()),
                    $(".generated").css(
                        "background-color",
                        "transparent"
                    );
            },
        }),
        $("#color-picker").spectrum("set", $.jStorage.get("lastColor"));
});