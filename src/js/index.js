/* BEGIN TABs */
const TabItemSelector = '.nav-tabs-item';
const ContentItemSelector = '.tab-content-pane';

class TabsManager {
    constructor(navNode) {
        this.tabs = [];
        this.activeTab = null;

        this.initFromHtml(navNode);
        this.activateTab(this.tabs[0]);
    }

    initFromHtml(navNode) {
        const headers = navNode.querySelectorAll(TabItemSelector);
        const contents = navNode.querySelectorAll(ContentItemSelector);

        for (let i = 0; i < headers.length; i++) {
            this.registerTab(headers[i], contents[i]);
        }
    }

    registerTab(header, content) {
        const tab = new TabItem(header, content);
        tab.onActivate(() => this.activateTab(tab));
        this.tabs.push(tab);
    }

    activateTab(tabItem) {
        if (this.activeTab) {
            this.activeTab.setActive(false);
        }

        this.activeTab = tabItem;
        this.activeTab.setActive(true);
    }
}

const ActiveTabHeaderClass = 'nav-tabs-item__active';
const ActiveTabContentClass = 'tab-content-pane__active';

class TabItem {
    constructor(header, content) {
        this.header = header;
        this.content = content;
    }

    onActivate(action) {
        this.header.addEventListener('click', () => action(this));
    }

    setActive(value) {
        this.header.classList.toggle(ActiveTabHeaderClass, value);
        this.content.classList.toggle(ActiveTabContentClass, value);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let tabs = new TabsManager(document.querySelector('.tabs'));
});
/* END TABs  */


/* BEGIN dropdown */

document.addEventListener('click', (e) => {

    if (!e.target.matches('.dropdown-toggle')) {
        let dropdown = document.querySelectorAll('.dropdown');

        dropdown.forEach((menu) => {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    }
});


const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

dropdownToggle.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.target.parentElement.classList.toggle('show')
    });
});

const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        let self = e.target;
        let toggle = self.parentNode.parentNode.querySelector('.dropdown-toggle');
        const toggleText = toggle.innerText;
        toggle.innerText = self.innerText;
        self.innerText = toggleText;
    });
});

/* END dropdown */
