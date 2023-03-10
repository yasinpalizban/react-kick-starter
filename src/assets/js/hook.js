import $ from "jquery";

export function callSelect() {

    try {
        $(".js-select2").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });
    } catch (e) {

    }

}
