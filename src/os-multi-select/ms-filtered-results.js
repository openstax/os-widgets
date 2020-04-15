function VM(props) {
    Object.assign(this, props);
    const vm = this;

    this.results = ko.pureComputed(function () {
        return vm.options().filter(
            (opt) => opt.label.toLowerCase().includes(vm.filter().toLowerCase())
        );
    });
}

export default {
    viewModel: VM,
    template: `
    <div class="results" data-bind="foreach: results">
        <div class="result" data-bind="text: $data.label, click: $parent.onClick"></div>
    </div>
    `
};
