import {Page} from "./Page";
import {AssholesStorage} from "../storage/AssholesStorage";
import {BlacklistStorage} from "../storage/BlacklistStorage";

export class OwnUserPage extends Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.addAssholesList()
    }

    createAssholesListEdit() {
        const widget = document.createElement("div")
        const header = "<h2 class='doc'>Мои мудаки</h2>";
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = AssholesStorage.getAssholesText()
        textArea.addEventListener("input", () => AssholesStorage.setAssholesText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    createBlacklistEdit() {
        const widget = document.createElement("div")
        const header = "<h2 class='doc'>Черный список страниц</h2>";
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = BlacklistStorage.getBlacklistText()
        textArea.addEventListener("input", () => BlacklistStorage.setBlacklistText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    addAssholesList() {
        const block = document.createElement("div");
        block.classList.add('block');
        block.appendChild(this.createAssholesListEdit());
        block.appendChild(this.createBlacklistEdit());

        const parent = document.querySelector(".profile-statuses");
        parent.parentNode.insertBefore(block, parent.nextSibling);
    }
}
