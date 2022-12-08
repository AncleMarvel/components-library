class Tabs {
    constructor(selectors) {
        this.selectors = selectors;
        this.btns = Array.from(document.querySelectorAll(selectors.btns));
        this.bodies = Array.from(document.querySelectorAll(selectors.bodies));

        this._initEvents();
    }

    _getBodyById(id) {
        if (this.bodies.length <= 0) {
            console.warn("Failed to get body: no tabs bodies");
            return;
        }

        const filterResult = this.bodies.filter(body => body.dataset[this.selectors.data.tabBodyId] === id);

        return filterResult.length > 0 ? filterResult[0] : null;
    }

    _hideAllBodies() {
        if (this.bodies.length <= 0) {
            console.warn("Failed to get body: no tabs bodies");
            return;
        }

        this.bodies.forEach(body => {
            if (!body.classList.contains(this.selectors.hideClass)) {
                body.classList.add(this.selectors.hideClass)
            }
        });
    }

    _deactivateAllBtns() {
        if (this.btns.length <= 0) {
            console.warn("Failed to _initEvents: no tabs buttons");
            return;
        }

        this.btns.forEach(btn => {
            btn.dataset[this.selectors.data.activeBtn] = false;
        });
    }

    _activateBtn(btn) {
        btn.dataset[this.selectors.data.activeBtn] = true;
    }

    _showBody(body) {
        body.classList.remove(this.selectors.hideClass);
    }

    _initEvents() {
        if (this.btns.length <= 0) {
            console.warn("Failed to _initEvents: no tabs buttons");
            return;
        }

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset[this.selectors.data.tabId];
                const body = this._getBodyById(tabId);
                this._hideAllBodies();
                this._showBody(body);
                this._deactivateAllBtns();
                this._activateBtn(btn);
            });
        });
    }
}

const selectors = {
    btns: "[data-tab-id]",
    bodies: "[data-tab-body-id]",
    data: {
        tabId: 'tabId',
        tabBodyId: 'tabBodyId',
        activeBtn: 'active'
    },
    hideClass: 'none'
}

const tabs = new Tabs(selectors);