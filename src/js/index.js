//import svgxuse from 'vendor/svgxuse.min';
//import tab from 'components/tab';


/* BEGIN TABs https://codepen.io/kris-iris/pen/ZqBEPv?editors=1010 */
const TabItemSelector = '.pageNav__tabItem';
const ContentItemSelector = '.pageNav__contentItem';

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

const ActiveTabHeaderClass = 'pageNav__tabItem--active';
const ActiveTabContentClass = 'pageNav__contentItem--active';

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
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-toggle')) {
        let dropdownMenu = document.getElementsByClassName('dropdown-menu');

        for (let i = 0; i < dropdownMenu.length; i++) {
            let openDropdown = dropdownMenu[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

dropdownToggle.forEach(function (item) {
    item.onclick = function () {
        this.nextElementSibling.classList.toggle('show')
    };
});
/* END dropdown */
