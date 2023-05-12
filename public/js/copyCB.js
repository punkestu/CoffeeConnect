function copyCB(link, key) {
    navigator.clipboard.writeText(window.location.host + link);
    const dropdown = new Dropdown($(`#dropdown${key}`)[0], $(`#dropdown${key}-btn`)[0]);
    const notif = $("#notif");
    notif.removeClass("hidden");
    notif.addClass("animate-fade");
    setTimeout(() => {
        notif.addClass("hidden");
    }, 1000);
    dropdown.hide();
}