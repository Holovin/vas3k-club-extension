import {Page} from "./Page";
import {AssholesStorage} from "../storage/AssholesStorage";
import {PrivateCommentsStorage} from "../storage/PrivateCommentsStorage";

export class UserPage extends Page {
    constructor(url) {
        super(url);
        this.user = this.getUser();
    }

    modifyContent() {
        const block = document.createElement("div");
        block.classList.add('block');
        block.appendChild(this.createPrivateCommentWidget());
        block.appendChild(this.createAssholeButton());

        const parent = document.querySelector(".profile-statuses");
        parent.parentNode.insertBefore(block, parent.nextSibling);
    }

    createPrivateCommentWidget() {
        const widget = document.createElement('div');
        widget.style.overflow = 'hidden';
        widget.style.display = 'flex';
        widget.style.flexDirection = 'column';
        widget.style.alignItems = 'center';

        const header = document.createElement('h4');
        header.classList.add('doc');
        header.style.marginBlockStart = '0';
        header.innerHTML = 'Заметка';

        const textarea = document.createElement('textarea');
        textarea.rows = 3;
        textarea.style.width = '90%';
        textarea.style.marginBlockEnd = '2em';

        textarea.value = PrivateCommentsStorage.getComment(this.user || '');
        textarea.addEventListener('input', (text) => {
            const comment = text.target.value
            PrivateCommentsStorage.setComment(this.user, comment)
        })

        widget.appendChild(header);
        widget.appendChild(textarea);

        return widget;
    }

    createAssholeButton() {
        const isAdded = AssholesStorage.checkAsshole(this.getUser());
        const buttonLabel = !isAdded ? 'Добавить в мои мудаки' : 'Удалить из моих мудаков'

        const button = document.createElement("a");
        button.classList.add('user-tag');
        button.style.display = 'block';
        button.innerHTML = `🖕${buttonLabel}`;
        button.addEventListener("click", () => {
            if (!isAdded) {
                if (AssholesStorage.addAsshole(this.getUser())) {
                    alert('Добавлен!');
                }
            }

            // TODO
        })

        return button;
    }

    /**
     * @returns {string}
     */
     getUser() {
        return this.pathname.split('/').filter((a) => a).pop()
    }

    /**
     * @param {string} user
     * @returns {boolean}
     */
    isUserAsshole(user) {
        return AssholesStorage.getAssholes().includes(user)
    }
}
