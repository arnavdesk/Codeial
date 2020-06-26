(function () {
    if (sm) {
        new Noty({
            theme: "relax",
            text: sm,
            type:"success",
            layout:"topRight",
            timeout:1500
        }).show();
    }

    if (em) {
        new Noty({
            theme: "relax",
            text: em,
            type:"error",
            layout:"topRight",
            timeout:1500
        }).show();
    }


})();

