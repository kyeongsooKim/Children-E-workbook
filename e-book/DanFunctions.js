﻿
var ResizeHandle = 0;
var ResizeCounter = 0;

var autoSizeText = function(El, ElParent) {
    if (El == undefined || ElParent == undefined) return
    var A = 100;
    ElParent.style.fontSize = A + '%';
    while ($(El).scroll()[0].scrollWidth > $(El).width() && A > 10) {
        ElParent.style.fontSize = A + '%';
        A--;
    }
    while ($(El).scroll()[0].scrollHeight > $(El).height() && A > 10) {
        ElParent.style.fontSize = A + '%';
        A--;
    }
};

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

function ResizeText() {
    var Width = 0;
    var Height = 0;
    var MinWidth = 1000;
    var DefaultRatio = 16 / 9;
    var CurrentScreenWidth = $('#Resizer').width();
    var CurrentScreenHeight = $('#Resizer').height();
    //close the chopping cart if open
    ToggleShoppingCart(false);

    //close the dropdown menu
    if (getComputedStyle(document.getElementById('NavigationSelectDropDown'), null).getPropertyValue('display') != "none") {
        document.getElementById('NavigationSelectDropDown').style.display = "none";
    }

    if (document.getElementsByClassName("WebsiteBody")[0].style.display != "block") document.getElementsByClassName("WebsiteBody")[0].style.display = "block";

    //check for mobile mode
    var W = getComputedStyle(document.getElementById('MobileSize'), null).getPropertyValue('width');
    if (W == "1px") {
        document.getElementById('WidthDiv').style.minWidth = "320px";
        document.getElementById('WidthDiv').style.marginLeft = "0px";
        document.getElementById('WidthDiv').style.left = "0px";

        //mobile mode
        document.getElementById("WidthDiv").style.width = document.getElementById('Resizer').clientWidth + "px";
        document.body.width = document.getElementById('Resizer').clientWidth + "px";

        document.getElementById("WidthDiv").style.height = "auto";
        document.body.height = "auto";
        document.getElementById("WidthDiv").style.bottom = "0px";


        //resize the text size according to the window size
        document.body.style.fontSize = '100%';

        //change the bottom of the content area to but up against the nav bar
        //document.getElementById("ContentArea").style.height = document.getElementById('Content').offsetHeight - document.getElementById('NavigationBar').offsetHeight - 20 + "px";
        //document.getElementById("WorkSpace").style.height = document.getElementById('Content').offsetHeight - document.getElementById('NavigationBar').offsetHeight - 20 + "px";

        //resize the header title
        autoSizeText(document.getElementsByClassName('HeaderTitle')[0], document.getElementsByClassName('HeaderTitle')[0].parentNode);

        //resize the review window title
        autoSizeText(document.getElementById('ReviewTitle'), document.getElementById('ReviewTitle').parentNode);

        //resize the review window title
        autoSizeText(document.getElementById('AddAddReviewTitle'), document.getElementById('AddAddReviewTitle').parentNode);

        //redraw the productpage
        autoSizeText(document.getElementById('ProductTitle'), document.getElementById('ProductTitleParent'));
        var E = document.getElementsByClassName("ProductNames");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("ProductNamesNew");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("ProductPrice");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("ProductPriceNoReview");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("ProductStock");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("ProductStockNoReview");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        var E = document.getElementsByClassName("LargePictureTitle");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }


        //resize any product fonts
        var E = document.getElementsByClassName("ShoppingCartPrice");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }
        var E = document.getElementsByClassName("ShoppingCartName");
        for (var A = 0; A < E.length; A++) {
            autoSizeText(E[A], E[A].parentNode);
        }

        //redraw teh shopping car items
        if (document.getElementById('Cart').style.visibility == "hidden") {
            UpdateShoppingCart();
        }
        return;
    }

    //if confirmation page is on screen
    if (ConfirmationPage == "true") {
        document.getElementById('PayPalConfirmDiv').style.display = "block";
    }

    //check if this is the second time where checking the screen ratio and adjusting the font size and screen
    ResizeCounter++;
    if (ResizeCounter > 2) {
        clearInterval(ResizeHandle);
        return;
    }

    //set the minimum width
    //document.getElementById('Resizer').style.minWidth = MinWidth + "px";
    document.getElementById('WidthDiv').style.minWidth = MinWidth + "px";

    //get current screen ratio
    var Ratio = screen.width / screen.height; //$('#Resizer').width() / $('#Resizer').height();

    var ScreenHeight = document.getElementById('Resizer').clientHeight;

    //if the current ratio is not in the limits of the wanted ratio then make it the wanted ratio
    if (Ratio < DefaultRatio - .15 || Ratio > DefaultRatio + .15) Ratio = DefaultRatio;

    //set up a double checking for when you press f11
    clearInterval(ResizeHandle);
    ResizeHandle = setTimeout("ResizeText();", 100);

    //figure out min height
    var MinHeight = MinWidth / Ratio;

    //set the minimum height
    //document.getElementById('Resizer').style.minHeight = MinHeight + "px";
    document.getElementById('WidthDiv').style.minHeight = MinHeight + "px";

    //uncenter the width div
    document.getElementById('WidthDiv').style.left = "0px";
    document.getElementById('WidthDiv').style.marginLeft = "0px";

    //get current window width and figure out what the height is suposed to be
    Width = CurrentScreenWidth;
    if (Width < MinWidth) Width = MinWidth;
    Height = Width / Ratio;

    //if the height is larger the what the ratio puts it at then size according to the height
    if (CurrentScreenHeight > Height) {
        //get current window height and figure out what the width is suposed to be
        Height = CurrentScreenHeight
        if (Height < MinHeight) Height = MinHeight;
        Width = Height * Ratio;
    }

    //if height is greater then screen with by just a little bit then resize the widthdiv with the height ratio and center widthdiv
    if (screen.height < CurrentScreenHeight + 75) {
        Height = CurrentScreenHeight;
        if (Height < MinHeight) Height = MinHeight;
        Width = Height * Ratio;
        if (CurrentScreenWidth > Width) {
            //center the widthdiv
            document.getElementById('WidthDiv').style.left = CurrentScreenWidth / 2 + "px";
            document.getElementById('WidthDiv').style.marginLeft = -Width / 2 + "px";
        }
    }


    //resize the text size according to the window size
    //alert(screen.width+" "+CurrentScreenWidth);

    if (screen.width > MinWidth) {
        if (CurrentScreenWidth <= Width) {
            var S1 = (Width / screen.width) * 100 + "%";
            //set the size
            document.getElementById("WidthDiv").style.width = CurrentScreenWidth + "px";
            document.body.width = CurrentScreenWidth + "px";

            document.getElementById("WidthDiv").style.height = CurrentScreenHeight + "px";
            document.body.height = CurrentScreenHeight + "px";
        } else {
            var S1 = (Width / CurrentScreenWidth) * 100 + "%";
            //set the size
            document.getElementById("WidthDiv").style.width = Width + "px";
            document.body.width = Width + "px";

            document.getElementById("WidthDiv").style.height = Height + "px";
            document.body.height = Height + "px";
        }
    } else {
        var S1 = (screen.width / MinWidth) * 100 + "%";
    }
    document.body.style.fontSize = S1;

    //resize the header title
    autoSizeText(document.getElementsByClassName('HeaderTitle')[0], document.getElementsByClassName('HeaderTitle')[0].parentNode);

    //resize the review window title
    autoSizeText(document.getElementById('ReviewTitle'), document.getElementById('ReviewTitle').parentNode);

    //resize the review window title
    autoSizeText(document.getElementById('AddAddReviewTitle'), document.getElementById('AddAddReviewTitle').parentNode);

    //resize any product fonts
    var E = document.getElementsByClassName("ShoppingCartPrice");
    for (var A = 0; A < E.length; A++) {
        autoSizeText(E[A], E[A].parentNode);
    }
    var E = document.getElementsByClassName("ShoppingCartName");
    for (var A = 0; A < E.length; A++) {
        autoSizeText(E[A], E[A].parentNode);
    }

    //redraw teh shopping car items
    UpdateShoppingCart();

    //change the bottom of the content area to but up against the nav bar
    // document.getElementById("ContentArea").style.height = document.getElementById('Content').offsetHeight - document.getElementById('NavigationBar').offsetHeight - 20 + "px";
    //document.getElementById("WorkSpace").style.height = document.getElementById('Content').offsetHeight - document.getElementById('NavigationBar').offsetHeight - 20 + "px";

}

function CheckTouchScreenDevice() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function CheckIfItIsANumber(Number) {
    var R = false;
    try {
        Number = Number * 1;
        R = true;
    } catch (y) {

    }
    return R;
}

function getStyle(oElm, strCssRule) {
    var RetrievedStyle = getStyleCrude(oElm, strCssRule);

    if (RetrievedStyle.substr(RetrievedStyle.length - 2, RetrievedStyle.length).toLowerCase() == 'px') {
        //take away the px
        RetrievedStyle = parseInt(RetrievedStyle.substr(0, RetrievedStyle.length - 2));
    } else if (RetrievedStyle.substr(RetrievedStyle.length - 1, RetrievedStyle.length) == '%') {
        //take away the %
        RetrievedStyle = parseInt(RetrievedStyle.substr(0, RetrievedStyle.length - 1));
    } else if (RetrievedStyle.substr(RetrievedStyle.length - 2, RetrievedStyle.length).toLowerCase() == 'em') {
        //take away the em
        RetrievedStyle = parseInt(RetrievedStyle.substr(0, RetrievedStyle.length - 2));
    }

    if (CheckIfItIsANumber(RetrievedStyle) == true) return RetrievedStyle * 1;

    return RetrievedStyle;
}

function getStyleCrude(oElm, strCssRule) {
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
        strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

function ExtractValueFromCss(CSSValue) {
    //extracts the px or the % from the value
    var S = CSSValue.toString();
    var A = 0;
    if (S.substring(S.length - 2, S.length).toLowerCase() == "px") {
        A = S.substring(0, S.length - 2);
    } else if (S.substring(S.length - 2, S.length).toLowerCase() == "em") {
        A = S.substring(0, S.length - 2);
    } else if (S.substring(S.length - 1, S.length).toLowerCase() == "%") {
        A = S.substring(0, S.length - 1);
    }
    if (CheckIfItIsANumber(A) == true) return A * 1;

    return A;
}

function ExtractUnitFromCss(CSSValue) {
    //returns the px or the % from the value
    var S = CSSValue.toString();
    var A = 0;
    if (S.substring(S.length - 2, S.length).toLowerCase() == "px") {
        A = "px";
    } else if (S.substring(S.length - 2, S.length).toLowerCase() == "em") {
        A = "em";
    } else if (S.substring(S.length - 1, S.length).toLowerCase() == "%") {
        A = "%";
    }
    return A;
}

function AddToCSSValue(CSSValue, AddNumber) {
    var S = CSSValue.toString();
    var A = 0;
    if (S.substring(S.length - 2, S.length).toLowerCase() == "px") {
        A = S.substring(0, S.length - 2);
        A = (1 * A) + (AddNumber * 1);
        A = A.toFixed(3);
        A += "px";
    } else if (S.substring(S.length - 2, S.length).toLowerCase() == "em") {
        A = S.substring(0, S.length - 2);
        A = (1 * A) + (AddNumber * 1);
        A = A.toFixed(3);
        A += "em";
    } else if (S.substring(S.length - 1, S.length).toLowerCase() == "%") {
        A = S.substring(0, S.length - 1);
        A = (1 * A) + (AddNumber * 1);
        A = A.toFixed(3);
        A += "%";

    }
    return A;

}

function DistanceBetween(AX, AY, BX, BY) {
    //good old distance formular
    var X = BX - AX;
    var Y = BY - AY;

    X *= X;
    Y *= Y;

    return Math.sqrt(X + Y);
}

var ControlCount = 0;

function SetObjectToWindow(Name, Object) {
    //give the object a unique Id and set it to the window object and return the handle
    //var D = new Date;
    //var DMill = D.getUTCMilliseconds();
    var DMill = ControlCount;
    var F = "W" + Name + DMill; //.toString();
    while (window[F] != null) {
        DMill++;
        F = "W" + Name + DMill; //.toString();
    }
    window[F] = Object;
    ControlCount++;
    return F;
}

function CheckForUnits(Value, DefaultUnit) {
    //check to see if px em or % is attached to this unit
    Value = Value.toString();
    try {
        if (Value.substr(Value.length - 2, Value.length).toLowerCase() != 'px' && Value.substr(Value.length - 2, Value.length).toLowerCase() != 'em' && Value.substr(Value.length - 1, Value.length).toLowerCase() != '%' && Value.substr(Value.length - DefaultUnit.length, Value.length).toLowerCase() != DefaultUnit) {
            //add px to the end
            Value += DefaultUnit;
        }
    } catch (e) {
        Value = '0' + DefaultUnit;
    }
    return Value;
}

function ConvertUnits(Destination, Value, Unit, Direction) {
    var ScreenSize = 0;
    var Temp = 0;
    //get screen pixels in a specific direction
    if (Direction.toLowerCase() == 'y') {
        ScreenSize = $(Destination).height(); // getStyle(Destination, 'height');
    } else {
        ScreenSize = $(Destination).width(); // getStyle(Destination, 'width');
    }
    Value = CheckForUnits(Value, 'px');

    //find the unit of the Value
    if (Value.substr(Value.length - 2, Value.length).toLowerCase() == 'px') {
        if (Unit.toLowerCase() == 'em') {
            Temp = ExtractValueFromCss(Value) / 16;
            return Temp.toString() + 'em';
        } else if (Unit.toLowerCase() == '%') {
            Temp = (ExtractValueFromCss(Value) / ScreenSize) * 100;
            return Temp.toString() + '%';
        }
    } else if (Value.substr(Value.length - 2, Value.length).toLowerCase() == 'em') {
        if (Unit.toLowerCase() == 'px') {
            Temp = ExtractValueFromCss(Value) * 16;
            return Temp.toString() + 'px';
        } else if (Unit.toLowerCase() == '%') {
            Temp = ExtractValueFromCss(Value) * 16;
            Temp = (Temp / ScreenSize) * 100;
            return Temp.toString() + '%';
        }

    } else if (Value.substr(Value.length - 1, Value.length).toLowerCase() == '%') {
        if (Unit.toLowerCase() == 'px') {
            Temp = (ExtractValueFromCss(Value) / 100) * ScreenSize;
            return Temp.toString() + 'px';
        } else if (Unit.toLowerCase() == 'em') {
            Temp = (ExtractValueFromCss(Value) / 100) * ScreenSize;
            Temp = Temp / 16;
            return Temp.toString() + 'em';
        }
    }
    return Value;
}

function CreateCanvasGradientForControls(TheControl, ctx, GradientType, LightAngle, ColorArray, RadialOffset, RadialRadius1, RadialRadius2) {
    var Gradient = 0;
    GradientType = GradientType.toLowerCase();

    if (GradientType == "linear") {
        var LightAngle = LightAngle;
        if (LightAngle > 359) {
            do {
                LightAngle -= 360;
            }
            while (LightAngle > 359);
        }
        //setup local varible
        var InnerControl = TheControl.Control;

        //dynamic radius change for the gradient for rectangels
        //Make large circle
        var Radius = DistanceBetween(InnerControl.ImageRadiusX, InnerControl.ImageRadiusY, InnerControl.WidthInPixels, InnerControl.HeightInPixels);

        //get X and Y on radius circle
        var RX = (Radius * Math.cos((LightAngle) * (Math.PI / 180)));
        var RY = (Radius * Math.sin((LightAngle) * (Math.PI / 180)));

        //adjust the X and Y to be on the BorderLine of the Control
        var W = InnerControl.WidthInPixels / 2;
        var H = InnerControl.HeightInPixels / 2;
        if (RX > W) RX = W;
        if (RX < (0 - W)) RX = 0 - W;
        if (RY > H) RY = H;
        if (RY < (0 - H)) RY = 0 - H;

        //find the distance and make that the radius
        Radius = (DistanceBetween(0, 0, RX, RY));

        var TopX = TheControl.ControlShadowOffsetInPixels + InnerControl.ImageRadiusX + (Radius * Math.cos(LightAngle * (Math.PI / 180)));
        var TopY = TheControl.ControlShadowOffsetInPixels + InnerControl.ImageRadiusY + (Radius * Math.sin(LightAngle * (Math.PI / 180)));
        var BottomX = TheControl.ControlShadowOffsetInPixels + InnerControl.ImageRadiusX + (Radius * Math.cos((LightAngle + 180) * (Math.PI / 180)));
        var BottomY = TheControl.ControlShadowOffsetInPixels + InnerControl.ImageRadiusY + (Radius * Math.sin((LightAngle + 180) * (Math.PI / 180)));

        Gradient = ctx.createLinearGradient(TopX, TopY, BottomX, BottomY);
        if (ColorArray.length > 1) {
            //user supplied gradient
            for (A = 0; A < ColorArray.length; A = A + 2) {
                Gradient.addColorStop(ColorArray[A], ColorArray[A + 1]);
            }
        } else {
            //default gradient if user didn't suply one
            Gradient.addColorStop(0, 'rgba(255,255,255,255)');
            Gradient.addColorStop(1, 'rgba(100,100,100,255)');
        }
    } else if (GradientType == "radial") {
        var LightAngle = LightAngle;
        if (LightAngle > 359) {
            do {
                LightAngle -= 360;
            }
            while (LightAngle > 359);
        }

        var OriginX1 = (TheControl.Control.CanvasWidthNumber / 2) + (RadialOffset * (Math.cos(LightAngle * (Math.PI / 180))));
        var OriginY1 = (TheControl.Control.CanvasHeightNumber / 2) + (RadialOffset * (Math.sin(LightAngle * (Math.PI / 180))));
        var OriginX2 = (TheControl.Control.CanvasWidthNumber / 2);
        var OriginY2 = (TheControl.Control.CanvasHeightNumber / 2);


        Gradient = ctx.createRadialGradient(OriginX1, OriginY1, RadialRadius1, OriginX2, OriginY2, RadialRadius2);

        if (ColorArray.length > 1) {
            //user supplied gradient
            for (A = 0; A < ColorArray.length; A = A + 2) {
                Gradient.addColorStop(ColorArray[A], ColorArray[A + 1]);
            }
        } else {
            //default gradient if user didn't suply one
            Gradient.addColorStop(0, 'rgba(255,255,255,255)');
            Gradient.addColorStop(1, 'rgba(100,100,100,255)');
        }
    } else {
        Gradient = GradientType;
    }

    return Gradient;
}

function CreateCanvasGradient(ctx, OriginX, OriginY, GradientType, LightAngle, ColorArray) {
    var Gradient = 0;

    if (GradientType == "Linear") {
        var LightAngle = LightAngle;
        var TopX = OriginX + (OriginX * Math.cos(LightAngle * (Math.PI / 180)));
        var TopY = OriginY + (OriginY * Math.sin(LightAngle * (Math.PI / 180)));
        var BottomX = OriginX + (OriginX * Math.cos((LightAngle + 180) * (Math.PI / 180)));
        var BottomY = OriginY + (OriginY * Math.sin((LightAngle + 180) * (Math.PI / 180)));
        Gradient = ctx.createLinearGradient(TopX, TopY, BottomX, BottomY);
        if (ColorArray.length > 1) {
            //alert(ColorArray.length);
            //user supplied gradient
            for (A = 0; A < ColorArray.length; A = A + 2) {
                //console.log(ColorArray[A]);    
                Gradient.addColorStop(ColorArray[A], ColorArray[A + 1]);
            }
        } else {
            //default gradient if user didn't suply one
            Gradient.addColorStop(0, 'rgba(255,255,255,255)');
            Gradient.addColorStop(1, 'rgba(100,100,100,255)');
        }
    } else if (GradientType == "Radial") {
        Gradient = ctx.createRadialGradient(1, 1, 1, 5, 5, 5);

    } else {
        Gradient = GradientType;
    }

    return Gradient;
}

function AddImagetoCanvas(ImageName, ctx, Image, OffsetX, OffsetY, Rotation, RotationPointX, RotationPointY, PixelInteraction, RepetitionType, Stroke, ScaleX, ScaleY) {
    ctx.save();
    try {
        var Gradient = ctx.createPattern(Image, RepetitionType);
    } catch (err) {
        alert("Check FileName of " + ImageName + " or Repetition Type");
        ctx.restore();
        return;
    }
    try {
        ctx.translate(OffsetX, OffsetY);
    } catch (err) {
        alert("Check OffsetX and OffsetY of " + ImageName);
        ctx.restore();
        return;
    }
    try {
        ctx.translate(RotationPointX, RotationPointY);
        ctx.rotate(Rotation * (Math.PI / 180));
        ctx.translate(-RotationPointX, -RotationPointY);
    } catch (err) {
        alert("Check Rotation of " + ImageName);
        ctx.restore();
        return;
    }
    try {
        //turn off shadow
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgba(0,0,0,0)';

        ctx.globalCompositeOperation = PixelInteraction;
    } catch (err) {
        alert("Check PixelInteraction of " + ImageName);
        ctx.restore();
        return;

    }
    try {
        //scale image
        ctx.scale(ScaleX, ScaleY);
    } catch (err) {
        alert("Check scaleing of " + ImageName);
        ctx.restore();
        return;

    }
    if (Stroke == true) {
        //stroke Style
        try {
            ctx.strokeStyle = Gradient;
            ctx.stroke();
            ctx.restore();
        } catch (err) {
            alert("Errors Applying Stroke Image " + ImageName + " To Canvas");
            ctx.restore();
        }
    } else if (Stroke == false) {
        //Fill Style
        try {
            ctx.fillStyle = Gradient;
            ctx.fill();
            ctx.restore();
        } catch (err) {
            alert("Errors Applying Fill Image " + ImageName + " To Canvas");
            ctx.restore();
        }
    } else if (Stroke == "FillText") {
        //Set the fill style only no fill use this for filltext
        try {
            ctx.fillStyle = Gradient;
        } catch (err) {
            alert("Errors Applying Fill Text " + ImageName + " To Canvas");
        }
    } else if (Stroke == "StrokeText") {
        //Set the Stroke style only no Stroke use this for Stroketext
        try {
            ctx.strokeStyle = Gradient;
        } catch (err) {
            alert("Errors Applying stroke Text " + ImageName + " To Canvas");
        }

    }

}

function MakeCanvasStereoScopic(ctx, width, height, Depth3D) {
    // Create Dummy anvas Elements to make the cyan and magenta images
    var canvas1 = document.createElement('canvas');
    var canvas2 = document.createElement('canvas');

    // grabbing 2-dimensional context
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    // Resize the Canvas to the size of the image
    var width = width;
    var height = height;
    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;

    //    // draw the two images to the <canvas>'s
    //    canvasContext.drawImage(image1, 0, 0);
    //    canvasContext2.drawImage(image2, 0, 0);

    // grab the pixel data from the original canvas and place it on the 2 other canvases
    var imgDataO = ctx.getImageData(0, 0, width, height);
    ctx1.putImageData(imgDataO, 0, 0);
    ctx2.putImageData(imgDataO, Depth3D, 0);

    //now grab the pixels from the 2 canvas
    var imgData = ctx1.getImageData(0, 0, width, height);
    var imgData2 = ctx2.getImageData(0, 0, width, height);

    var data = imgData.data;
    var data2 = imgData2.data;
    // loop through the pixels, and apply effect
    var xmax = imgData.width;
    var ymax = imgData.height;
    for (var y = 0; y < ymax; y++) {
        for (var x = 0; x < xmax; x++) {
            var i = (y * 4) * xmax + x * 4;
            // seperate colors, and multiply the two layers together
            data[i] = data[i] * 255 / 0xFF;
            data[i + 1] = 255 * data2[i + 1] / 0xFF;
            data[i + 2] = 255 * data2[i + 2] / 0xFF;
            data[i + 3] = 255 * data2[i + 3] / 0xFF;
            //data[i + 3] = 1 * data2[i + 3] / 0x01;
        }
    }
    // push the data to become visible on the canvas
    ctx.putImageData(imgData, 0, 0);
}

function GetBrowserType() {
    if (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)) {
        //Chrome
        return "Chrome";
    } else if ( /*@cc_on!@*/ false || !!document.documentMode) {
        //IE
        return "IE"
    } else if (typeof InstallTrigger !== 'undefined') {
        //Fire Fox
        return "Mozilla";
    } else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        //safari
        return "Safari";
    } else if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        //opera
        return "Opera";
    }
}
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 1;

function init() {
    console.log("init function called");
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
}


function draw() {
    console.log("preX is ", prevX);
    console.log("currentX is ", currX);
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
		
		currX = e.pageX - $(document).scrollLeft() - $('#can').offset().left;
        currY = e.pageY - $(document).scrollTop() - $('#can').offset().top;
        

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.pageX - $(document).scrollLeft() - $('#can').offset().left;
        currY = e.pageY - $(document).scrollTop() - $('#can').offset().top;
            draw();
        }
    }
}

function clearCanvas(){
	var canvas = document.getElementById('can');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function savePageInput(pageNumber) {
    console.log("save data called with", pageNumber);
    if (pageNumber == 22) {
        console.log(document.getElementById('purposeField1'));

        if (document.getElementById('purposeField1') != null || document.getElementById('purposeField1') != undefined) {
            console.log("inside inner condition");
            localStorage.setItem("page" + pageNumber + "val1", document.getElementById('purposeField1').value);
            localStorage.setItem("page" + pageNumber + "val2", document.getElementById('purposeField2').value);
            localStorage.setItem("page" + pageNumber + "val3", document.getElementById('purposeField3').value);
            localStorage.setItem("page" + pageNumber + "val4", document.getElementById('purposeField4').value);
        }
    } else if (pageNumber == 23) {} else if (pageNumber == 31) {} else if (pageNumber == 25) {
        localStorage.setItem("page" + pageNumber + "val1", document.getElementById('happy-healthy').value);
        localStorage.setItem("page" + pageNumber + "val2", document.getElementById('happy-unhealth').value);
        localStorage.setItem("page" + pageNumber + "val3", document.getElementById('sad-health').value);
        localStorage.setItem("page" + pageNumber + "val4", document.getElementById('sad-unhealth').value);
        localStorage.setItem("page" + pageNumber + "val5", document.getElementById('mad-healthy').value);
        localStorage.setItem("page" + pageNumber + "val6", document.getElementById('mad-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val7", document.getElementById('scare-health').value);
        localStorage.setItem("page" + pageNumber + "val8", document.getElementById('scares-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val9", document.getElementById('embarrased-health').value);
        localStorage.setItem("page" + pageNumber + "val10", document.getElementById('embarrased-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val11", document.getElementById('anxious-health').value);
        localStorage.setItem("page" + pageNumber + "val12", document.getElementById('anxious-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val13", document.getElementById('excited-health').value);
        localStorage.setItem("page" + pageNumber + "val14", document.getElementById('excited-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val15", document.getElementById('worried-health').value);
        localStorage.setItem("page" + pageNumber + "val16", document.getElementById('worried-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val17", document.getElementById('shy-health').value);
        localStorage.setItem("page" + pageNumber + "val18", document.getElementById('shy-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val19", document.getElementById('disappointed-health').value);
        localStorage.setItem("page" + pageNumber + "val20", document.getElementById('disappointed-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val21", document.getElementById('lonely-health').value);
        localStorage.setItem("page" + pageNumber + "val22", document.getElementById('lonely-unhealthy').value);
        localStorage.setItem("page" + pageNumber + "val23", document.getElementById('hurt-health').value);
        localStorage.setItem("page" + pageNumber + "val24", document.getElementById('hurt-unhealthy').value);
    } else if (pageNumber == 26) {
		var step1 = document.getElementById('step1');
		var step2 = document.getElementById('step2');
		var step3 = document.getElementById('step3');
		var step4 = document.getElementById('step4');
		var step5 = document.getElementById('step5');
		//step1.childNodes[1].id
		try{
			localStorage.setItem("step1" , step1.childNodes[1].id);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			localStorage.setItem("step2" , step2.childNodes[1].id);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			localStorage.setItem("step3" , step3.childNodes[1].id);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			localStorage.setItem("step4" , step4.childNodes[1].id);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			localStorage.setItem("step5" , step5.childNodes[1].id);
		}catch(exp){
			console.log(exp);
		}
	
	} else if (pageNumber == 27) {
        var walkaway = document.getElementById('walkaway_p');
        var ignorethebully = document.getElementById('ignorethebully_p');
        var askanadultforhelp = document.getElementById('askanadultforhelp_p');
        var beresfectful = document.getElementById('beresfectful_p');
        var talktoafriend = document.getElementById('talktoafriend_p');
        var beproudandconfident = document.getElementById('beproudandconfident_p');
        var userhumor = document.getElementById('userhumor_p');

        var wrong1 = document.getElementById('hitthebully_p');
        var wrong2 = document.getElementById('bebullyback_p');
        var wrong3 = document.getElementById('screamandyell_p');
        var wrong4 = document.getElementById('Getinthebullysface_p');
        var wrong5 = document.getElementById('teasethebully_p');
        var wrong6 = document.getElementById('pushthebully_p');
        var wrong7 = document.getElementById('makefunofbully_p');
        var wrong8 = document.getElementById('askthebullyincalmvoice_p');
        var wrong9 = document.getElementById('whineandpout_p');
        var wrong10 = document.getElementById('threatenthebully_p');

        try {
            localStorage.setItem("walkaway_p", walkaway.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("ignorethebully_p", ignorethebully.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("askanadultforhelp_p", askanadultforhelp.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("beresfectful_p", beresfectful.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("talktoafriend_p", talktoafriend.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("beproudandconfident_p", beproudandconfident.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("userhumor_p", userhumor.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("hitthebully_p", wrong1.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("bebullyback_p", wrong2.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("screamandyell_p", wrong3.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("Getinthebullysface_p", wrong4.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("teasethebully_p", wrong5.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("pushthebully_p", wrong6.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("makefunofbully_p", wrong7.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("askthebullyincalmvoice_p", wrong8.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("whineandpout_p", wrong9.childNodes[1].alt);
        } catch (exp) {

        }

        try {
            localStorage.setItem("threatenthebully_p", wrong10.childNodes[1].alt);
        } catch (exp) {

        }

    } else if (pageNumber == 28) {} else if (pageNumber == 29) {
		var smile1 = document.getElementById('sharingmytoys_p');
        var sad1 = document.getElementById('beingmean_p');
        var smile6 = document.getElementById('callingthemonphone_p');
        var sad2 = document.getElementById('talkingbehindtheirback_p');
        var sad3 = document.getElementById('screaming_p');
        var sad4 = document.getElementById('makingthemdowhatiwant_p');
        var smile2 = document.getElementById('makinganewfriend_p');
        var smile3 = document.getElementById('beingrespectful_p');
        var smile8 = document.getElementById('lisyeningtioneanother_p');
        var sad5 = document.getElementById('hittingorpunching_p');
        var smile4 = document.getElementById('givingcompliments_p');
        var sad6 = document.getElementById('makingfunoftheotherperson_p');
        var sad7 = document.getElementById('bullying_p');
        var smile5 = document.getElementById('invitingthemonmyparty_p');
        var sad8 = document.getElementById('teasing_p');
        var smile7 = document.getElementById('helping_p');
		
		try{
			localStorage.setItem("sharingmytoys_p", smile1.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("beingmean_p", sad1.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("callingthemonphone_p", smile6.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("talkingbehindtheirback_p", sad2.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("screaming_p", sad3.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("makingthemdowhatiwant_p", sad4.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("makinganewfriend_p", smile2.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("beingrespectful_p", smile3.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("lisyeningtioneanother_p", smile8.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("hittingorpunching_p", sad5.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("givingcompliments_p", smile4.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("makingfunoftheotherperson_p", sad6.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("bullying_p", sad7.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("invitingthemonmyparty_p", smile5.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("teasing_p", sad8.childNodes[0].alt);
		}catch(exp){
		}
		try{
			localStorage.setItem("helping_p", smile7.childNodes[0].alt);
		}catch(exp){
		}
	} else if (pageNumber == 30) {} else if (pageNumber == 32) {} else {}

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    pageFiveResult();
}

function rightWrongImageClicked(event) {
    console.log(event);
    //try{
    event.preventDefault();
    var id;
    if (event.target != undefined && event.target != null) {
        id = event.target.id.split("_")[0];
    } else {
        id = event.explicitOriginalTarget.id.split("_")[0];
    }
    console.log("id is ", id);

    document.getElementById(id + "_p").removeChild(document.getElementById(id + "_1"));
    if (event.button == 0) {
        var img = document.createElement('img');
        img.alt = "right";
        img.src = "images/image-right-1.gif";
        img.style.height = "40px";
        img.style.width = "120px";
        img.style.position = "absolute";
        img.style.marginLeft = "-100px";
        img.id = "" + id + "_1";
        img.addEventListener("mousedown", function(event) {
            rightWrongImageClicked(event);
        });
        document.getElementById(id + "_p").appendChild(img);
    } else if (event.button == 2) {
        var img = document.createElement('img');
        img.alt = "wrong";
        img.src = "images/image-wrong-1.gif";
        img.style.height = "40px";
        img.style.width = "120px";
        img.style.position = "absolute";
        img.style.marginLeft = "-100px";
        img.id = "" + id + "_1";
        img.addEventListener("mousedown", function(event) {
            rightWrongImageClicked(event);
        });
        document.getElementById(id + "_p").appendChild(img);
    } else {

    }
    checkResults();
    /*}catch(exp){
    	console.log(exp.message);
    }*/
}

function WhichButton(event) {
    event.preventDefault();
    try {
        document.getElementById(event.target.attributes.id.value + "_p").removeChild(document.getElementById(event.target.attributes.id.value + "_1"));
    } catch (exp) {}
    if (event.button == 0) {
        var img = document.createElement('img');
        img.alt = "right";
        img.src = "images/image-right-1.gif";
        img.style.height = "40px";
        img.style.width = "120px";
        img.style.position = "absolute";
        img.style.marginLeft = "-100px";
        img.id = "" + event.target.attributes.id.value + "_1";
        img.addEventListener("mousedown", function(event) {
            rightWrongImageClicked(event);
        });
        document.getElementById(event.target.attributes.id.value + "_p").appendChild(img);
    } else if (event.button == 2) {
        var img = document.createElement('img');
        img.alt = "wrong";
        img.src = "images/image-wrong-1.gif";
        img.style.height = "40px";
        img.style.width = "120px";
        img.style.position = "absolute";
        img.style.marginLeft = "-100px";
        img.id = "" + event.target.attributes.id.value + "_1";
        img.addEventListener("mousedown", function(event) {
            rightWrongImageClicked(event);
        });
        document.getElementById(event.target.attributes.id.value + "_p").appendChild(img);
    } else {

    }
    checkResults();
}

function checkResults() {
    try {
        var walkaway = document.getElementById('walkaway_p');
        var ignorethebully = document.getElementById('ignorethebully_p');
        var askanadultforhelp = document.getElementById('askanadultforhelp_p');
        var beresfectful = document.getElementById('beresfectful_p');
        var talktoafriend = document.getElementById('talktoafriend_p');
        var beproudandconfident = document.getElementById('beproudandconfident_p');
        var userhumor = document.getElementById('userhumor_p');

        var wrong1 = document.getElementById('hitthebully_p');
        var wrong2 = document.getElementById('bebullyback_p');
        var wrong3 = document.getElementById('screamandyell_p');
        var wrong4 = document.getElementById('Getinthebullysface_p');
        var wrong5 = document.getElementById('teasethebully_p');
        var wrong6 = document.getElementById('pushthebully_p');
        var wrong7 = document.getElementById('makefunofbully_p');
        var wrong8 = document.getElementById('askthebullyincalmvoice_p');
        var wrong9 = document.getElementById('whineandpout_p');
        var wrong10 = document.getElementById('threatenthebully_p');
		
		console.log(wrong8.childNodes);
		

		if (walkaway.childNodes[3].alt == "right" && ignorethebully.childNodes[3].alt == "right" && askanadultforhelp.childNodes[3].alt == "right" && beresfectful.childNodes[3].alt == "right" && talktoafriend.childNodes[3].alt == "right" && beproudandconfident.childNodes[3].alt == "right" && userhumor.childNodes[3].alt == "right" &&
			wrong1.childNodes[3].alt == "wrong" && wrong2.childNodes[3].alt == "wrong" && wrong3.childNodes[3].alt == "wrong" && wrong4.childNodes[3].alt == "wrong" && wrong5.childNodes[3].alt == "wrong" && wrong6.childNodes[3].alt == "wrong" && wrong7.childNodes[3].alt == "wrong" && wrong8.childNodes[2].alt == "wrong" && wrong9.childNodes[3].alt == "wrong" && wrong10.childNodes[3].alt == "wrong") {
			drawCorrectMark();
		} else {
			console.log(walkaway.childNodes);
			console.log("ye bik gai hai gormint");
		}
		
        
    } catch (exp) {
        console.log(exp.message);
    }



}

function checkSmileyResults() {
    try {
        var smile1 = document.getElementById('sharingmytoys_p');
        var sad1 = document.getElementById('beingmean_p');
        var smile6 = document.getElementById('callingthemonphone_p');
        var sad2 = document.getElementById('talkingbehindtheirback_p');
        var sad3 = document.getElementById('screaming_p');
        var sad4 = document.getElementById('makingthemdowhatiwant_p');
        var smile2 = document.getElementById('makinganewfriend_p');
        var smile3 = document.getElementById('beingrespectful_p');
        var smile8 = document.getElementById('lisyeningtioneanother_p');
        var sad5 = document.getElementById('hittingorpunching_p');
        var smile4 = document.getElementById('givingcompliments_p');
        var sad6 = document.getElementById('makingfunoftheotherperson_p');
        var sad7 = document.getElementById('bullying_p');
        var smile5 = document.getElementById('invitingthemonmyparty_p');
        var sad8 = document.getElementById('teasing_p');
        var smile7 = document.getElementById('helping_p');
		
        if (smile1.childNodes[0].alt == "smile" && smile2.childNodes[0].alt == "smile" && smile3.childNodes[0].alt == "smile" && smile4.childNodes[0].alt == "smile" && smile5.childNodes[0].alt == "smile" && smile6.childNodes[0].alt == "smile" && smile7.childNodes[0].alt == "smile" && smile8.childNodes[0].alt == "smile" &&
            sad1.childNodes[0].alt == "sad" && sad2.childNodes[0].alt == "sad" && sad3.childNodes[0].alt == "sad" && sad4.childNodes[0].alt == "sad" && sad5.childNodes[0].alt == "sad" && sad6.childNodes[0].alt == "sad" && sad7.childNodes[0].alt == "sad" && sad8.childNodes[0].alt == "sad") {
            console.log("inside if success");
            drawCorrectMark();
        } else {
            console.log("Ganderiaaaaan Ganderiaaaaan Rusk Rusk");
        }
    } catch (exp) {
        console.log(exp.message);
    }
}

function happySadSmiley(event) {
    event.preventDefault();
    if (event.button == 0) {
        var img = document.createElement('img');
        img.alt = "smile";
        img.src = "images/smiley face.png";
        img.style.height = "35px";
        img.style.width = "35px";
        img.style.marginTop = "-2px";
        img.style.marginLeft = "-3px";
        document.getElementById(event.target.attributes.id.value + "_p").innerHTML = "";
        document.getElementById(event.target.attributes.id.value + "_p").appendChild(img);
    } else if (event.button == 2) {
        var img = document.createElement('img');
        img.alt = "sad";
        img.src = "images/angry face.png";
        img.style.height = "35px";
        img.style.width = "35px";
        img.style.marginTop = "-2px";
        img.style.marginLeft = "-2px";
        document.getElementById(event.target.attributes.id.value + "_p").innerHTML = "";
        document.getElementById(event.target.attributes.id.value + "_p").appendChild(img);
    } else {

    }
    checkSmileyResults();
}

function happySadSmiley2(event) {
    event.preventDefault();
    if (event.button == 0) {
        var img = document.createElement('img');
        img.alt = "smile";
        img.src = "images/smiley face.png";
        img.style.height = "35px";
        img.style.width = "35px";
        img.style.marginTop = "-2px";
        img.style.marginLeft = "-3px";
        document.getElementById(event.target.attributes.id.value).innerHTML = "";
        document.getElementById(event.target.attributes.id.value).appendChild(img);
    } else if (event.button == 2) {
        var img = document.createElement('img');
        img.alt = "sad";
        img.src = "images/angry face.png";
        img.style.height = "35px";
        img.style.width = "35px";
        img.style.marginTop = "-2px";
        img.style.marginLeft = "-2px";
        document.getElementById(event.target.attributes.id.value).innerHTML = "";
        document.getElementById(event.target.attributes.id.value).appendChild(img);
    } else {

    }
    checkSmileyResults();
}

function drawCorrectMark() {

    var parentDiv = document.getElementById('WorkSpace');
    var img = document.createElement('img');
    img.alt = "";
    img.src = "images/correct-1.gif";
    img.style.height = "200px";
    img.style.width = "200px";
    img.style.left = "40%";
    img.style.top = "45%";
    img.style.position = "absolute";
    parentDiv.appendChild(img);

}

function pageFiveResult() {
    console.log("in function correct img page 5");
    var step1 = document.getElementById('step1');
    var step2 = document.getElementById('step2');
    var step3 = document.getElementById('step3');
    var step4 = document.getElementById('step4');
    var step5 = document.getElementById('step5');
    try {
        if (step1.childNodes[1].id == "step2_ans" && step2.childNodes[1].id == "step4_ans" && step3.childNodes[1].id == "step3_ans" && step4.childNodes[1].id == "step1_ans" && step5.childNodes[1].id == "step5_ans") {
            drawCorrectMark();
        }
    } catch (exp) {
        console.log(exp.message);
    }
}

function shiftFocus(event, id){
	if(event.keyCode == 13){
		document.getElementById(id).focus();
	}
}

function keyPressed(event) {
    if (event.keyCode == 13) {
        if (event.target.id == "purposeField1") {
            document.getElementById("purposeField2").focus();
        } else if (event.target.id == "purposeField2") {
            document.getElementById("purposeField3").focus();
        } else if (event.target.id == "purposeField3") {
            document.getElementById("purposeField4").focus();
        } else if (event.target.id == "purposeField4") {
            console.log("ganderiaaan");
        } else {

        }
    }
}

var displayObj = 0;

function showHint(pageID) {
    displayObj = 1;
    var hint = document.getElementById("hintDiv");
    hint.style.display = "block";
}

function hideHintButton() {
    if (displayObj == 0) {
		if(document.getElementById("hintDiv")){
			document.getElementById("hintDiv").style.display = "none";
		} 
	}else {
        displayObj = 0;
    }
}

function clearUserData() {
    try {
        localStorage.removeItem("page25val1");
        localStorage.removeItem("page25val2");
        localStorage.removeItem("page25val3");
        localStorage.removeItem("page25val4");
        localStorage.removeItem("page25val5");
        localStorage.removeItem("page25val6");
        localStorage.removeItem("page25val7");
        localStorage.removeItem("page25val8");
        localStorage.removeItem("page25val9");
        localStorage.removeItem("page25val10");
        localStorage.removeItem("page25val11");
        localStorage.removeItem("page25val12");
        localStorage.removeItem("page25val13");
        localStorage.removeItem("page25val14");
        localStorage.removeItem("page25val15");
        localStorage.removeItem("page25val16");
        localStorage.removeItem("page25val17");
        localStorage.removeItem("page25val18");
        localStorage.removeItem("page25val19");
        localStorage.removeItem("page25val20");
        localStorage.removeItem("page25val21");
        localStorage.removeItem("page25val22");
        localStorage.removeItem("page25val23");
        localStorage.removeItem("page25val24");
        localStorage.removeItem("page22val1");
        localStorage.removeItem("page22val2");
        localStorage.removeItem("page22val3");
        localStorage.removeItem("page22val4");
    } catch (exp) {
        console.log(exp.message);
    }
}