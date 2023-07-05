export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
        });
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
    /* addItem(node, position) {
         switch (position) {
             case 'before':
                 this._containerSelector.prepend(node)
                 break;
             case 'after':
                 this._containerSelector.append(node);
                 break;
             default:
                 break;
         }
     }*/
}