function VM(props) {
    Object.assign(this, props);
    const vm = this;

    this.showInput = ko.observable(false);
    this.toggleInput = () => {
        this.filter('');
        this.showInput(!this.showInput());
        this.hasFocus(this.showInput());
    };
    this.hasFocus = ko.observable();
}

export default {
    viewModel: VM,
    template: `
    <div class="filter-button-or-input">
        <button type="button" class="btn medium filter-toggle"
            data-bind="hidden: showInput, click: toggleInput"
        >
            Filter
            <i class="slider-icon fas fa-sliders-h"></i>
        </button>
        <div class="filter-input" data-bind="visible: showInput">
            <input type="text" class="filter" data-bind="textInput: filter, hasFocus: hasFocus">
            <span class="clear-filter" role="button" data-bind="click: toggleInput">
                &times;
            </span>
        </div>
    </div>
    `
};
