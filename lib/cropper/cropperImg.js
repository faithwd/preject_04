"use strict";

function _classCallCheck(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function") }
var _createClass = function() {
        function a(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
        }
        return function(b, c, d) { return c && a(b.prototype, c), d && a(b, d), b }
    }(),
    imgInfo = { width: null, height: null, rotate: 0, scale: 1 },
    cropperIng = void 0,
    cropperTarget = void 0,
    userImg = void 0,
    UpdateCropper = function() {
        function a(b) { _classCallCheck(this, a), this.callBack = b }
        return _createClass(a, [{ key: "init", value: function() { imgInfo.width = null, imgInfo.height = null, imgInfo.rotate = 0, imgInfo.scale = 1, cropperIng = !1, cropperTarget = $("#J-update-img"), userImg = $("#J-update-user-header"), $("#J-update-wrapper").fadeIn("slow"), this.addEvent() } }, {
            key: "addEvent",
            value: function() {
                var a = this,
                    b = this;
                $("#J-update-img-file").on("change", function(a) {
                    this.files[0].type.match(/image.*/) || alert("请选择正确的图片!");
                    var c = URL.createObjectURL(this.files[0]);
                    b.createCropper(c)
                }), $("#J-update-wrapper").on("click", ".J-close", function() { a.destroy() }), $("#J-update-wrapper").on("click", ".J-update-btn", function() { document.getElementById("J-update-img-file").click() }), $("#J-update-wrapper").on("click", ".J-operation-btn", function() { b.operation($(this)) }), $("#J-update-wrapper").on("click", ".J-operation-save", function() { a.getCroppedCanvas() })
            }
        }, { key: "destroy", value: function() { this.removeEvent(), cropperTarget.cropper("destroy"), userImg.attr("src", "").hide(), cropperTarget.attr("src", "").hide(), $("#J-update-wrapper").fadeOut("slow") } }, { key: "removeEvent", value: function() { $("#J-update-img-file").off(), $("#J-update-wrapper").off() } }, {
            key: "createCropper",
            value: function(a) {
                var b = this;
                document.getElementById("J-update-img").onload = function() {
                    var c = document.getElementById("J-update-img");
                    imgInfo.width = c.naturalWidth, imgInfo.height = c.naturalHeight, userImg.attr("src", a).show(), cropperIng = !0, cropperTarget.cropper("destroy"), cropperTarget.cropper({ aspectRatio: 1, viewMode: 1, crop: function(a) { b.changeImg(a.detail) } })
                }, cropperTarget.attr("src", a).show()
            }
        }, {
            key: "changeImg",
            value: function(a) {
                var b = 180 / a.width;
                userImg.css({ transform: "translate(-" + a.x * b + "px, -" + a.y * b + "px) rotate(" + imgInfo.rotate + "deg)", width: imgInfo.width * b + "px", height: imgInfo.heigh * b + "px" })
            }
        }, {
            key: "operation",
            value: function(a) {
                if (cropperIng) {
                    var b = a.data("type");
                    switch (b) {
                        case "rote-left":
                            imgInfo.rotate -= 90, $("#J-update-img").cropper("rotate", -90);
                            break;
                        case "rote-right":
                            imgInfo.rotate += 90, $("#J-update-img").cropper("rotate", 90);
                            break;
                        case "scale-b":
                            $("#J-update-img").cropper("zoom", .1);
                            break;
                        case "scale-s":
                            $("#J-update-img").cropper("zoom", -.1)
                    }
                }
            }
        }, {
            key: "getCroppedCanvas",
            value: function() {
                if (cropperIng) {
                    var a = cropperTarget.cropper("getCroppedCanvas"),
                        b = a.toDataURL("image/jpeg");
                    this.callBack(b), this.destroy()
                }
            }
        }]), a
    }();