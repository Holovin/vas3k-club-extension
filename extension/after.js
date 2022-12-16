/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PageFactory.js":
/*!****************************!*\
  !*** ./src/PageFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageFactory": () => (/* binding */ PageFactory)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _pages_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/UserPage */ "./src/pages/UserPage.js");
/* harmony import */ var _pages_OwnUserPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/OwnUserPage */ "./src/pages/OwnUserPage.js");
/* harmony import */ var _pages_PostPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/PostPage */ "./src/pages/PostPage.js");
/* harmony import */ var _pages_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/Page */ "./src/pages/Page.js");
/* harmony import */ var _pages_FeedPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/FeedPage */ "./src/pages/FeedPage.js");







class PageFactory {
    constructor(pathname) {
        /**
         * @type {string}
         */
        this.pathname = pathname;

        /**
         * @type {string}
         */
        this.pageType = this.getPageType()
    }

    /**
     *
     * @returns {Page}
     */
    create() {
        if (this.isUserPageType()) {
            if ((0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUser)() === this.getWhoAmI()) {
                return new _pages_OwnUserPage__WEBPACK_IMPORTED_MODULE_2__.OwnUserPage(this.pathname);
            }

            return new _pages_UserPage__WEBPACK_IMPORTED_MODULE_1__.UserPage(this.pathname);
        }

        if (this.isUserContentPageType()) {
            return new _pages_PostPage__WEBPACK_IMPORTED_MODULE_3__.PostPage(this.pathname);
        }

        if (this.isFeedPage()) {
            return new _pages_FeedPage__WEBPACK_IMPORTED_MODULE_5__.FeedPage(this.pathname);
        }

        return new _pages_Page__WEBPACK_IMPORTED_MODULE_4__.Page(this.pathname)
    }

    /**
     * @returns {boolean}
     */
    isFeedPage() {
        return this.pageType === 'all' || this.pathname === '/'
    }

    /**
     * @returns {boolean}
     */
    isUserContentPageType() {
        const contentTypes = [ "post", "question", "link",  "idea", "battle", "event", "project", "guide", "thread"]
        return contentTypes.includes(this.pageType)
    }

    /**
     * @returns {boolean}
     */
    isUserPageType() {
        return this.pageType === "user"
    }

    /**
     * @returns {string}
     */
    getPageType() {
        return this.pathname
            .split('/')
            .filter(a => a)[0]
    }

    /**
     * @returns {string}
     */
    getWhoAmI() {
        return document.querySelector(".menu-right>a.avatar")
            .getAttribute("href")
            .split('/')
            .filter(a => a)
            .pop()
    }
}


/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUser": () => (/* binding */ getUser),
/* harmony export */   "hideVotesRatingsAvatars": () => (/* binding */ hideVotesRatingsAvatars),
/* harmony export */   "printExtensionInfo": () => (/* binding */ printExtensionInfo)
/* harmony export */ });
/**
 * @returns {string}
 */
function getUser() {
    return document.location.pathname.split('/').filter((a) => a).pop()
}

function hideVotesRatingsAvatars() {
    const distractedElementsSelectors = [
        '.upvote',
        '.upvote-voted',
        '.upvote-type-inline',
        '.comment-rating',
        '.feed-post-comments-unread'
    ]

    for (const selector of distractedElementsSelectors) {
        for (const el of document.querySelectorAll(selector)) {
            el.remove()
        }
    }
    for (const avatar of document.querySelectorAll(".avatar>img")) {
        avatar.setAttribute("src", "https://i.vas3k.club/v.png")
    }
}

function printExtensionInfo() {
    console.info ("Всем бояться! Вастрик-ыкстэншын v1.0.0")
    console.log(`
                           (o)(o)
                          /     \\
                         /       |
                        /   \\  * |
          ________     /    /\\__/
  _      /        \\   /    /
 / \\    /  ____    \\_/    /
//\\ \\  /  /    \\         /
V  \\ \\/  /      \\       /
    \\___/        \\_____/
    `)
}




/***/ }),

/***/ "./src/pages/FeedPage.js":
/*!*******************************!*\
  !*** ./src/pages/FeedPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeedPage": () => (/* binding */ FeedPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/BlacklistStorage */ "./src/storage/BlacklistStorage.js");




class FeedPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.hideBlacklistedPosts()
        this.modifyAssholePosts()
        // hideVotesRatingsAvatars()
        // this.addBlacklistButton()
    }

    addBlacklistButton() {
        const posts = document.querySelectorAll(".feed-post-footer")
        posts.forEach(post => {
            const pageId = post.querySelector("a.feed-post-comments")
                .getAttribute("href")
                .split("/")
                .slice(1, -1)
                .join("/")
            const button = document.createElement("a")
            button.innerText = "🙈"
            button.setAttribute("title", "Слушайте, а ну его нахер!")
            button.classList.add("feed-post-comments")
            button.addEventListener("click", () => {
                _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.addPage(pageId)
                post.parentElement.remove()
            })
            post.appendChild(button)
        })
    }

    modifyAssholePosts() {
        for (const asshole of _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            for (const node of document.querySelectorAll(`[href="/user/${asshole}/"]`)) {
                node.style.border = '4px solid #8e4c17';
            }
        }
    }

    hideBlacklistedPosts() {
        const refs = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.getBlacklist()
        for (const ref of refs) {
            for (const topic of document.querySelectorAll(`a[href*="${ref}"]`)) {
                topic
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }


}


/***/ }),

/***/ "./src/pages/OwnUserPage.js":
/*!**********************************!*\
  !*** ./src/pages/OwnUserPage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OwnUserPage": () => (/* binding */ OwnUserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/BlacklistStorage */ "./src/storage/BlacklistStorage.js");




class OwnUserPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
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
        textArea.value = _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholesText()
        textArea.addEventListener("input", () => _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.setAssholesText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    createBlacklistEdit() {
        const widget = document.createElement("div")
        const header = "<h2 class='doc'>Черный список страниц</h2>";
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.getBlacklistText()
        textArea.addEventListener("input", () => _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.setBlacklistText(textArea.value))
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


/***/ }),

/***/ "./src/pages/Page.js":
/*!***************************!*\
  !*** ./src/pages/Page.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Page": () => (/* binding */ Page)
/* harmony export */ });
class Page {
    constructor(pathname) {
        if (!pathname) {
            throw new Error('pathname is required');
        }
        this.pathname = pathname;
    }

    modifyContent() {
        console.log("Nothing is happened, it's an unspecified page")
    }
}

/***/ }),

/***/ "./src/pages/PostPage.js":
/*!*******************************!*\
  !*** ./src/pages/PostPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostPage": () => (/* binding */ PostPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/ProtectedCommentsStorage */ "./src/storage/ProtectedCommentsStorage.js");




class PostPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
        this.movePostCommentForm()
        this.addProtectCommentButtons()
        this.addProtectAllCommentButton()
        this.restoreComments()
    }

    hideAssholeComments() {
        for (const asshole of _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            const selectorName = `.comment-header-author-name[href="/user/${asshole}/"]`;
            const nodesName = document.querySelectorAll(selectorName);
            for (const node of nodesName) {
                node.innerHTML += '⚠️';
                node.style.color = '#8e4c17';
            }

            const selectorImgSide = `.comment-side-avatar[href="/user/${asshole}/"]`;
            const selectorImg = `.reply-avatar[href="/user/${asshole}/"]`;
            const nodesImg = [
                ...document.querySelectorAll(selectorImgSide),
                ...document.querySelectorAll(selectorImg),
            ];
            for (const node of nodesImg) {
                node.style.border = '4px solid #8e4c17';
            }
        }
    }

    movePostCommentForm() {
        const postCommentForm = document.querySelector('#post-comments-form')
        const commentsList = document.querySelector('.post-comments-list')
        const postCommentsRules = document.querySelector('.post-comments-rules')
        const parent = commentsList.parentElement
        if (!parent || !postCommentForm || !commentsList || !postCommentsRules) {
            return
        }
        parent.insertBefore(postCommentForm, commentsList)
        parent.insertBefore(postCommentsRules, commentsList)
    }

    /**
     * @param {string} commentId
     * @returns {string}
     */
    getCommentText(commentId) {
        return document.querySelector(`#${commentId} .text-body-type-comment`).innerHTML
    }

    //saves the comment to the local storage
    /**
     *
     * @param {string} commentId
     */
    protectComment(commentId) {
        _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.ProtectedCommentsStorage.addComment(this.pathname, commentId, this.getCommentText(commentId))
    }

    protectAllComments() {
        const comments = document.querySelectorAll(".text-body-type-comment")
        for (const comment of comments) {
            this.protectComment(comment.parentElement.parentElement.id)
        }
    }

    restoreComments() {
        const deletedComments = document.querySelectorAll(".comment-text-deleted")
        for (const deletedComment of deletedComments) {
           this.restoreComment(deletedComment)
        }
    }

    /**
     *
     * @param {Element} deletedComment
     */
    restoreComment(deletedComment) {
        const commentId = deletedComment.parentElement.parentElement.parentElement.id
        const commentText = _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.ProtectedCommentsStorage.getComment(this.pathname, commentId)
        if (commentText) {
            deletedComment.innerHTML = commentText //TODO надо бы санитизировать это, а то ведь опасно
        }
    }

    addProtectAllCommentButton() {
        const button = this.createButton()
        button.setAttribute("title", "Защитить все комментарии от удаления")
        button.addEventListener('click', () => {
            this.protectAllComments()
        })
        document.querySelector('.post-actions-line').appendChild(button)
    }

    addProtectCommentButtons() {
        const replyElements = document.querySelectorAll('.comment-header-badges')
        console.log(replyElements)
        for (const replyElement of replyElements) {
            const button = this.createButton();
            button.setAttribute("title", "Защитить коммент от удаления")
            const self = this
            button.addEventListener("click", function(evt) {
                const commentId = this.parentElement.parentElement.parentElement.id
                console.log("blaaa", commentId)
                self.protectComment(commentId)

            })
            replyElement.appendChild(button)
        }
    }

    createButton() {
        const button = document.createElement("i")
        button.setAttribute("class", "fas fa-cloud-download-alt");
        button.style.cursor = 'pointer';
        button.style.opacity = '0'; // TODO
        return button;
    }

}


/***/ }),

/***/ "./src/pages/UserPage.js":
/*!*******************************!*\
  !*** ./src/pages/UserPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPage": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/PrivateCommentsStorage */ "./src/storage/PrivateCommentsStorage.js");




class UserPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
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

        textarea.value = _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.getComment(this.user || '');
        textarea.addEventListener('input', (text) => {
            const comment = text.target.value
            _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.setComment(this.user, comment)
        })

        widget.appendChild(header);
        widget.appendChild(textarea);

        return widget;
    }

    createAssholeButton() {
        const isAdded = _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.checkAsshole(this.getUser());
        const buttonLabel = !isAdded ? 'Добавить в мои мудаки' : 'Удалить из моих мудаков'

        const button = document.createElement("a");
        button.classList.add('user-tag');
        button.style.display = 'block';
        button.innerHTML = `🖕${buttonLabel}`;
        button.addEventListener("click", () => {
            if (!isAdded) {
                if (_storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.addAsshole(this.getUser())) {
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
        return _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes().includes(user)
    }
}


/***/ }),

/***/ "./src/storage/AssholesStorage.js":
/*!****************************************!*\
  !*** ./src/storage/AssholesStorage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssholesStorage": () => (/* binding */ AssholesStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const ASSHOLES_STORAGE_KEY = 'assholes';
(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(ASSHOLES_STORAGE_KEY, [])

class AssholesStorage {

    static getAssholesText() {
        return localStorage.getItem(ASSHOLES_STORAGE_KEY);
    }

    /**
     *
     * @returns {string[]}
     */
    static getAssholes() {
        return AssholesStorage.getAssholesText().split(',') || [];
    }

    static checkAsshole(username) {
        return AssholesStorage.getAssholes().find(i => i === username);
    }

    /**
     *
     * @param {string} assholesText
     */
    static setAssholesText(assholesText) {
        localStorage.setItem(ASSHOLES_STORAGE_KEY, assholesText);
    }

    /**
     *
     * @param {string} asshole
     */
    static addAsshole(asshole) {
        const assholes = this.getAssholes();
        if (assholes.includes(asshole)) {
            return false;
        }

        assholes.push(asshole);
        localStorage.setItem(ASSHOLES_STORAGE_KEY, assholes.join(','));

        return true;
    }
}


/***/ }),

/***/ "./src/storage/BlacklistStorage.js":
/*!*****************************************!*\
  !*** ./src/storage/BlacklistStorage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlacklistStorage": () => (/* binding */ BlacklistStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const BLACKLIST_STORAGE_KEY = 'blacklist';

(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(BLACKLIST_STORAGE_KEY, [])

class BlacklistStorage {
    static getBlacklistText() {
        return localStorage.getItem(BLACKLIST_STORAGE_KEY);
    }

    /**
     *
     * @returns {string[]}
     */
    static getBlacklist() {
        return BlacklistStorage.getBlacklistText().split(',') || [];
    }

    /**
     *
     * @param {string} text
     */
    static setBlacklistText(text) {
        localStorage.setItem(BLACKLIST_STORAGE_KEY, text);
    }

    /**
     *
     * @param {string} page
     */
    static addPage(page) {
        const list = this.getBlacklist();
        if (list.includes(page)) {
            return;
        }
        list.push(page);
        localStorage.setItem(BLACKLIST_STORAGE_KEY, list);
    }
}

/***/ }),

/***/ "./src/storage/PrivateCommentsStorage.js":
/*!***********************************************!*\
  !*** ./src/storage/PrivateCommentsStorage.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateCommentsStorage": () => (/* binding */ PrivateCommentsStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const PRIVATE_COMMENTS_KEY = 'private-comments';

(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(PRIVATE_COMMENTS_KEY, {})

class PrivateCommentsStorage {
    /**
     *
     * @param {string} user
     * @param {string} comment
     */
    static setComment(user, comment) {
        const comments = PrivateCommentsStorage.getComments();
        localStorage.setItem(PRIVATE_COMMENTS_KEY, JSON.stringify({
            ...comments,
            [user]: comment
        }));
    }

    /**
     *
     * @param {string} user
     * @returns {string}
     */
    static getComment(user) {
        const userComment = PrivateCommentsStorage.getComments()
        if (!userComment) {
            return "";
        }
        const textPrivateCommentsObj =  this.getComments()
        return textPrivateCommentsObj[user] || "";
    }

    /**
     * @returns {Object}
     */
    static getComments() {
        return JSON.parse(localStorage.getItem(PRIVATE_COMMENTS_KEY) || "{}") || {}
    }
}

/***/ }),

/***/ "./src/storage/ProtectedCommentsStorage.js":
/*!*************************************************!*\
  !*** ./src/storage/ProtectedCommentsStorage.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProtectedCommentsStorage": () => (/* binding */ ProtectedCommentsStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const PROTECTED_COMMENTS_STORAGE_KEY = "protectedComments"

;(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(PROTECTED_COMMENTS_STORAGE_KEY, {})

class ProtectedCommentsStorage {
    static getStorage() {
        if (!localStorage.getItem(PROTECTED_COMMENTS_STORAGE_KEY)) {
            localStorage.setItem(PROTECTED_COMMENTS_STORAGE_KEY, JSON.stringify({}))
        }
        return JSON.parse(localStorage.getItem(PROTECTED_COMMENTS_STORAGE_KEY))
    }

    /**
     *
     * @param {string} pageId
     * @param {string} pageStorage
     * @private
     */
    static _writeStorage(pageId, pageStorage) {
        const storageObj = ProtectedCommentsStorage.getStorage()
        const newStorageObj = {
            ...storageObj,
            [pageId]: pageStorage
        }
        localStorage.setItem(PROTECTED_COMMENTS_STORAGE_KEY, JSON.stringify(newStorageObj, null, 2))
    }

    /**
     *
     * @param {string} pageId
     * @param {string} commentId
     * @param {string} commentText
     */
    static addComment(pageId, commentId, commentText) {
        const pageStorage = this.getStorage()[pageId] || {}
        pageStorage[commentId] = commentText
        this._writeStorage(pageId, pageStorage)
    }

    /**
     *
     * @param {string} pageId
     * @param {string} commentId
     * @returns {string|undefined}
     */
    static getComment(pageId, commentId) {
        const pageStorage = this.getStorage()[pageId] || {}
        return pageStorage[commentId]
    }

    /**
     *
     * @param {string} pageId
     * @returns {Object}
     */
    static getAllComments(pageId) {
        const pageStorage = this.getStorage()[pageId] || {}
        return pageStorage
    }

}

/***/ }),

/***/ "./src/storage/Storage.js":
/*!********************************!*\
  !*** ./src/storage/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStorageIfNotExists": () => (/* binding */ createStorageIfNotExists)
/* harmony export */ });
function createStorageIfNotExists(key, initValue={}) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(initValue));
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PageFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageFactory */ "./src/PageFactory.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");



(0,_functions__WEBPACK_IMPORTED_MODULE_1__.printExtensionInfo)()
const pageFactory = new _PageFactory__WEBPACK_IMPORTED_MODULE_0__.PageFactory(location.pathname)
const page = pageFactory.create()
page.modifyContent()



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLDJFQUEyRTtBQUMzRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Q21EOztBQUVuRDs7QUFFQSxtRUFBd0IsbUNBQW1DOztBQUVwRDtBQUNQO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM5RE8sbURBQW1EO0FBQzFEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNLOztBQUUvQyw4REFBa0I7QUFDbEIsd0JBQXdCLHFEQUFXO0FBQ25DO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9QYWdlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvRmVlZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvT3duVXNlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Qb3N0UGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Qcml2YXRlQ29tbWVudHNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRVc2VyfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7VXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL1VzZXJQYWdlXCI7XG5pbXBvcnQge093blVzZXJQYWdlfSBmcm9tIFwiLi9wYWdlcy9Pd25Vc2VyUGFnZVwiO1xuaW1wb3J0IHtQb3N0UGFnZX0gZnJvbSBcIi4vcGFnZXMvUG9zdFBhZ2VcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcIi4vcGFnZXMvUGFnZVwiO1xuaW1wb3J0IHtGZWVkUGFnZX0gZnJvbSBcIi4vcGFnZXMvRmVlZFBhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBhZ2VGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGFnZVR5cGUgPSB0aGlzLmdldFBhZ2VUeXBlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQYWdlfVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyUGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgaWYgKGdldFVzZXIoKSA9PT0gdGhpcy5nZXRXaG9BbUkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3duVXNlclBhZ2UodGhpcy5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgVXNlclBhZ2UodGhpcy5wYXRobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1VzZXJDb250ZW50UGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3N0UGFnZSh0aGlzLnBhdGhuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRmVlZFBhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUGFnZSh0aGlzLnBhdGhuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmVlZFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSAnYWxsJyB8fCB0aGlzLnBhdGhuYW1lID09PSAnLydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJDb250ZW50UGFnZVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlcyA9IFsgXCJwb3N0XCIsIFwicXVlc3Rpb25cIiwgXCJsaW5rXCIsICBcImlkZWFcIiwgXCJiYXR0bGVcIiwgXCJldmVudFwiLCBcInByb2plY3RcIiwgXCJndWlkZVwiLCBcInRocmVhZFwiXVxuICAgICAgICByZXR1cm4gY29udGVudFR5cGVzLmluY2x1ZGVzKHRoaXMucGFnZVR5cGUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyUGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSBcInVzZXJcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0UGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpWzBdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRXaG9BbUkoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtcmlnaHQ+YS5hdmF0YXJcIilcbiAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpXG4gICAgICAgICAgICAucG9wKClcbiAgICB9XG59XG4iLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKCkge1xuICAgIGNvbnN0IGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycyA9IFtcbiAgICAgICAgJy51cHZvdGUnLFxuICAgICAgICAnLnVwdm90ZS12b3RlZCcsXG4gICAgICAgICcudXB2b3RlLXR5cGUtaW5saW5lJyxcbiAgICAgICAgJy5jb21tZW50LXJhdGluZycsXG4gICAgICAgICcuZmVlZC1wb3N0LWNvbW1lbnRzLXVucmVhZCdcbiAgICBdXG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycykge1xuICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgYXZhdGFyIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyPmltZ1wiKSkge1xuICAgICAgICBhdmF0YXIuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly9pLnZhczNrLmNsdWIvdi5wbmdcIilcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludEV4dGVuc2lvbkluZm8oKSB7XG4gICAgY29uc29sZS5pbmZvIChcItCS0YHQtdC8INCx0L7Rj9GC0YzRgdGPISDQktCw0YHRgtGA0LjQui3Ri9C60YHRgtGN0L3RiNGL0L0gdjEuMC4wXCIpXG4gICAgY29uc29sZS5sb2coYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8pKG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgIFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8gICBcXFxcICAqIHxcbiAgICAgICAgICBfX19fX19fXyAgICAgLyAgICAvXFxcXF9fL1xuICBfICAgICAgLyAgICAgICAgXFxcXCAgIC8gICAgL1xuIC8gXFxcXCAgICAvICBfX19fICAgIFxcXFxfLyAgICAvXG4vL1xcXFwgXFxcXCAgLyAgLyAgICBcXFxcICAgICAgICAgL1xuViAgXFxcXCBcXFxcLyAgLyAgICAgIFxcXFwgICAgICAgL1xuICAgIFxcXFxfX18vICAgICAgICBcXFxcX19fX18vXG4gICAgYClcbn1cblxuXG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgRmVlZFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQmxhY2tsaXN0ZWRQb3N0cygpXG4gICAgICAgIHRoaXMubW9kaWZ5QXNzaG9sZVBvc3RzKClcbiAgICAgICAgLy8gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKVxuICAgICAgICAvLyB0aGlzLmFkZEJsYWNrbGlzdEJ1dHRvbigpXG4gICAgfVxuXG4gICAgYWRkQmxhY2tsaXN0QnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmVlZC1wb3N0LWZvb3RlclwiKVxuICAgICAgICBwb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZUlkID0gcG9zdC5xdWVyeVNlbGVjdG9yKFwiYS5mZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgICAgICAgICAuc2xpY2UoMSwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIvXCIpXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwi8J+ZiFwiXG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQodC70YPRiNCw0LnRgtC1LCDQsCDQvdGDINC10LPQviDQvdCw0YXQtdGAIVwiKVxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJmZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEJsYWNrbGlzdFN0b3JhZ2UuYWRkUGFnZShwYWdlSWQpXG4gICAgICAgICAgICAgICAgcG9zdC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcG9zdC5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbW9kaWZ5QXNzaG9sZVBvc3RzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYCkpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmJvcmRlciA9ICc0cHggc29saWQgIzhlNGMxNyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQmxhY2tsaXN0ZWRQb3N0cygpIHtcbiAgICAgICAgY29uc3QgcmVmcyA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0KClcbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b3BpYyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWYqPVwiJHtyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgICAgICB0b3BpY1xuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgT3duVXNlclBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlc0xpc3QoKVxuICAgIH1cblxuICAgIGNyZWF0ZUFzc2hvbGVzTGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J2RvYyc+0JzQvtC4INC80YPQtNCw0LrQuDwvaDI+XCI7XG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFzc2hvbGVzU3RvcmFnZS5zZXRBc3Nob2xlc1RleHQodGV4dEFyZWEudmFsdWUpKVxuICAgICAgICB3aWRnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBoZWFkZXIpXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0QXJlYSlcbiAgICAgICAgcmV0dXJuIHdpZGdldFxuICAgIH1cblxuICAgIGNyZWF0ZUJsYWNrbGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J2RvYyc+0KfQtdGA0L3Ri9C5INGB0L/QuNGB0L7QuiDRgdGC0YDQsNC90LjRhjwvaDI+XCI7XG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQmxhY2tsaXN0U3RvcmFnZS5zZXRCbGFja2xpc3RUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlc0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYmxvY2snKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUJsYWNrbGlzdEVkaXQoKSk7XG5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpO1xuICAgICAgICBwYXJlbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYmxvY2ssIHBhcmVudC5uZXh0U2libGluZyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGF0aG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RoaW5nIGlzIGhhcHBlbmVkLCBpdCdzIGFuIHVuc3BlY2lmaWVkIHBhZ2VcIilcbiAgICB9XG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1Byb3RlY3RlZENvbW1lbnRzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3N0UGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICBzdXBlcih1cmwpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUFzc2hvbGVDb21tZW50cygpXG4gICAgICAgIHRoaXMubW92ZVBvc3RDb21tZW50Rm9ybSgpXG4gICAgICAgIHRoaXMuYWRkUHJvdGVjdENvbW1lbnRCdXR0b25zKClcbiAgICAgICAgdGhpcy5hZGRQcm90ZWN0QWxsQ29tbWVudEJ1dHRvbigpXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbW1lbnRzKClcbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZUNvbW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yTmFtZSA9IGAuY29tbWVudC1oZWFkZXItYXV0aG9yLW5hbWVbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYDtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JOYW1lKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlc05hbWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLmlubmVySFRNTCArPSAn4pqg77iPJztcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNvbG9yID0gJyM4ZTRjMTcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvckltZ1NpZGUgPSBgLmNvbW1lbnQtc2lkZS1hdmF0YXJbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ySW1nID0gYC5yZXBseS1hdmF0YXJbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYDtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzSW1nID0gW1xuICAgICAgICAgICAgICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JJbWdTaWRlKSxcbiAgICAgICAgICAgICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ySW1nKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXNJbWcpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmJvcmRlciA9ICc0cHggc29saWQgIzhlNGMxNyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlUG9zdENvbW1lbnRGb3JtKCkge1xuICAgICAgICBjb25zdCBwb3N0Q29tbWVudEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9zdC1jb21tZW50cy1mb3JtJylcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtbGlzdCcpXG4gICAgICAgIGNvbnN0IHBvc3RDb21tZW50c1J1bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtcnVsZXMnKVxuICAgICAgICBjb25zdCBwYXJlbnQgPSBjb21tZW50c0xpc3QucGFyZW50RWxlbWVudFxuICAgICAgICBpZiAoIXBhcmVudCB8fCAhcG9zdENvbW1lbnRGb3JtIHx8ICFjb21tZW50c0xpc3QgfHwgIXBvc3RDb21tZW50c1J1bGVzKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50Rm9ybSwgY29tbWVudHNMaXN0KVxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50c1J1bGVzLCBjb21tZW50c0xpc3QpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb21tZW50SWR9IC50ZXh0LWJvZHktdHlwZS1jb21tZW50YCkuaW5uZXJIVE1MXG4gICAgfVxuXG4gICAgLy9zYXZlcyB0aGUgY29tbWVudCB0byB0aGUgbG9jYWwgc3RvcmFnZVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqL1xuICAgIHByb3RlY3RDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuYWRkQ29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQsIHRoaXMuZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSlcbiAgICB9XG5cbiAgICBwcm90ZWN0QWxsQ29tbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0LWJvZHktdHlwZS1jb21tZW50XCIpXG4gICAgICAgIGZvciAoY29uc3QgY29tbWVudCBvZiBjb21tZW50cykge1xuICAgICAgICAgICAgdGhpcy5wcm90ZWN0Q29tbWVudChjb21tZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVDb21tZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZENvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb21tZW50LXRleHQtZGVsZXRlZFwiKVxuICAgICAgICBmb3IgKGNvbnN0IGRlbGV0ZWRDb21tZW50IG9mIGRlbGV0ZWRDb21tZW50cykge1xuICAgICAgICAgICB0aGlzLnJlc3RvcmVDb21tZW50KGRlbGV0ZWRDb21tZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGRlbGV0ZWRDb21tZW50XG4gICAgICovXG4gICAgcmVzdG9yZUNvbW1lbnQoZGVsZXRlZENvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudElkID0gZGVsZXRlZENvbW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWRcbiAgICAgICAgY29uc3QgY29tbWVudFRleHQgPSBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQpXG4gICAgICAgIGlmIChjb21tZW50VGV4dCkge1xuICAgICAgICAgICAgZGVsZXRlZENvbW1lbnQuaW5uZXJIVE1MID0gY29tbWVudFRleHQgLy9UT0RPINC90LDQtNC+INCx0Ysg0YHQsNC90LjRgtC40LfQuNGA0L7QstCw0YLRjCDRjdGC0L4sINCwINGC0L4g0LLQtdC00Ywg0L7Qv9Cw0YHQvdC+XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQcm90ZWN0QWxsQ29tbWVudEJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKVxuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQl9Cw0YnQuNGC0LjRgtGMINCy0YHQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC4INC+0YIg0YPQtNCw0LvQtdC90LjRj1wiKVxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3RlY3RBbGxDb21tZW50cygpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWFjdGlvbnMtbGluZScpLmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICB9XG5cbiAgICBhZGRQcm90ZWN0Q29tbWVudEJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IHJlcGx5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1oZWFkZXItYmFkZ2VzJylcbiAgICAgICAgY29uc29sZS5sb2cocmVwbHlFbGVtZW50cylcbiAgICAgICAgZm9yIChjb25zdCByZXBseUVsZW1lbnQgb2YgcmVwbHlFbGVtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCX0LDRidC40YLQuNGC0Ywg0LrQvtC80LzQtdC90YIg0L7RgiDRg9C00LDQu9C10L3QuNGPXCIpXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50SWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJibGFhYVwiLCBjb21tZW50SWQpXG4gICAgICAgICAgICAgICAgc2VsZi5wcm90ZWN0Q29tbWVudChjb21tZW50SWQpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXBseUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKVxuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYXMgZmEtY2xvdWQtZG93bmxvYWQtYWx0XCIpO1xuICAgICAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBidXR0b24uc3R5bGUub3BhY2l0eSA9ICcwJzsgLy8gVE9ET1xuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1ByaXZhdGVDb21tZW50c1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuZ2V0VXNlcigpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYmxvY2snKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcml2YXRlQ29tbWVudFdpZGdldCgpKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVBc3Nob2xlQnV0dG9uKCkpO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKTtcbiAgICAgICAgcGFyZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJsb2NrLCBwYXJlbnQubmV4dFNpYmxpbmcpO1xuICAgIH1cblxuICAgIGNyZWF0ZVByaXZhdGVDb21tZW50V2lkZ2V0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2lkZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHdpZGdldC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB3aWRnZXQuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xuICAgICAgICB3aWRnZXQuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdkb2MnKTtcbiAgICAgICAgaGVhZGVyLnN0eWxlLm1hcmdpbkJsb2NrU3RhcnQgPSAnMCc7XG4gICAgICAgIGhlYWRlci5pbm5lckhUTUwgPSAn0JfQsNC80LXRgtC60LAnO1xuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgdGV4dGFyZWEucm93cyA9IDM7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLndpZHRoID0gJzkwJSc7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLm1hcmdpbkJsb2NrRW5kID0gJzJlbSc7XG5cbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnQodGhpcy51c2VyIHx8ICcnKTtcbiAgICAgICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAodGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IHRleHQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBQcml2YXRlQ29tbWVudHNTdG9yYWdlLnNldENvbW1lbnQodGhpcy51c2VyLCBjb21tZW50KVxuICAgICAgICB9KVxuXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfVxuXG4gICAgY3JlYXRlQXNzaG9sZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgaXNBZGRlZCA9IEFzc2hvbGVzU3RvcmFnZS5jaGVja0Fzc2hvbGUodGhpcy5nZXRVc2VyKCkpO1xuICAgICAgICBjb25zdCBidXR0b25MYWJlbCA9ICFpc0FkZGVkID8gJ9CU0L7QsdCw0LLQuNGC0Ywg0LIg0LzQvtC4INC80YPQtNCw0LrQuCcgOiAn0KPQtNCw0LvQuNGC0Ywg0LjQtyDQvNC+0LjRhSDQvNGD0LTQsNC60L7QsidcblxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGFnJyk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGDwn5aVJHtidXR0b25MYWJlbH1gO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNBZGRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChBc3Nob2xlc1N0b3JhZ2UuYWRkQXNzaG9sZSh0aGlzLmdldFVzZXIoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9CU0L7QsdCw0LLQu9C10L0hJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckFzc2hvbGUodXNlcikge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkuaW5jbHVkZXModXNlcilcbiAgICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBBU1NIT0xFU19TVE9SQUdFX0tFWSA9ICdhc3Nob2xlcyc7XG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoQVNTSE9MRVNfU1RPUkFHRV9LRVksIFtdKVxuXG5leHBvcnQgY2xhc3MgQXNzaG9sZXNTdG9yYWdlIHtcblxuICAgIHN0YXRpYyBnZXRBc3Nob2xlc1RleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEFzc2hvbGVzKCkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgc3RhdGljIGNoZWNrQXNzaG9sZSh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkuZmluZChpID0+IGkgPT09IHVzZXJuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlc1RleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QXNzaG9sZXNUZXh0KGFzc2hvbGVzVGV4dCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXNUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlXG4gICAgICovXG4gICAgc3RhdGljIGFkZEFzc2hvbGUoYXNzaG9sZSkge1xuICAgICAgICBjb25zdCBhc3Nob2xlcyA9IHRoaXMuZ2V0QXNzaG9sZXMoKTtcbiAgICAgICAgaWYgKGFzc2hvbGVzLmluY2x1ZGVzKGFzc2hvbGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBhc3Nob2xlcy5wdXNoKGFzc2hvbGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXMuam9pbignLCcpKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBCTEFDS0xJU1RfU1RPUkFHRV9LRVkgPSAnYmxhY2tsaXN0JztcblxuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgW10pXG5cbmV4cG9ydCBjbGFzcyBCbGFja2xpc3RTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEJsYWNrbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRCbGFja2xpc3RUZXh0KHRleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgc3RhdGljIGFkZFBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRCbGFja2xpc3QoKTtcbiAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMocGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2gocGFnZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgbGlzdCk7XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBSSVZBVEVfQ09NTUVOVFNfS0VZID0gJ3ByaXZhdGUtY29tbWVudHMnO1xuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJJVkFURV9DT01NRU5UU19LRVksIHt9KVxuXG5leHBvcnQgY2xhc3MgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50XG4gICAgICovXG4gICAgc3RhdGljIHNldENvbW1lbnQodXNlciwgY29tbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC4uLmNvbW1lbnRzLFxuICAgICAgICAgICAgW3VzZXJdOiBjb21tZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudCh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb21tZW50ID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpXG4gICAgICAgIGlmICghdXNlckNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHRQcml2YXRlQ29tbWVudHNPYmogPSAgdGhpcy5nZXRDb21tZW50cygpXG4gICAgICAgIHJldHVybiB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqW3VzZXJdIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZKSB8fCBcInt9XCIpIHx8IHt9XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSA9IFwicHJvdGVjdGVkQ29tbWVudHNcIlxuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCB7fSlcblxuZXhwb3J0IGNsYXNzIFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZSB7XG4gICAgc3RhdGljIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh7fSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZVN0b3JhZ2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfd3JpdGVTdG9yYWdlKHBhZ2VJZCwgcGFnZVN0b3JhZ2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZU9iaiA9IFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5nZXRTdG9yYWdlKClcbiAgICAgICAgY29uc3QgbmV3U3RvcmFnZU9iaiA9IHtcbiAgICAgICAgICAgIC4uLnN0b3JhZ2VPYmosXG4gICAgICAgICAgICBbcGFnZUlkXTogcGFnZVN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2VPYmosIG51bGwsIDIpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQ29tbWVudChwYWdlSWQsIGNvbW1lbnRJZCwgY29tbWVudFRleHQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHBhZ2VTdG9yYWdlW2NvbW1lbnRJZF0gPSBjb21tZW50VGV4dFxuICAgICAgICB0aGlzLl93cml0ZVN0b3JhZ2UocGFnZUlkLCBwYWdlU3RvcmFnZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnQocGFnZUlkLCBjb21tZW50SWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHJldHVybiBwYWdlU3RvcmFnZVtjb21tZW50SWRdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWxsQ29tbWVudHMocGFnZUlkKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSB8fCB7fVxuICAgICAgICByZXR1cm4gcGFnZVN0b3JhZ2VcbiAgICB9XG5cbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKGtleSwgaW5pdFZhbHVlPXt9KSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoaW5pdFZhbHVlKSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQYWdlRmFjdG9yeX0gZnJvbSBcIi4vUGFnZUZhY3RvcnlcIjtcbmltcG9ydCB7cHJpbnRFeHRlbnNpb25JbmZvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxucHJpbnRFeHRlbnNpb25JbmZvKClcbmNvbnN0IHBhZ2VGYWN0b3J5ID0gbmV3IFBhZ2VGYWN0b3J5KGxvY2F0aW9uLnBhdGhuYW1lKVxuY29uc3QgcGFnZSA9IHBhZ2VGYWN0b3J5LmNyZWF0ZSgpXG5wYWdlLm1vZGlmeUNvbnRlbnQoKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==