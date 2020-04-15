function VM(props) {
    this.selections = props.selections;
    this.remove = (data) => {
        data.selected(false);
    };
}

export default {
    viewModel: VM,
    template: `
        <div class="selections" data-bind="foreach: selections">
            <div class="box">
                <span data-bind="text: label"></span>
                <span role="button" class="put-away" data-bind="click: $parent.remove">
                    &times;
                </span>
            </div>
        </div>
    `
};
