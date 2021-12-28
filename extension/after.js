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
            return new _pages_UserPage__WEBPACK_IMPORTED_MODULE_1__.UserPage(this.pathname)
        }

        if (this.isUserContentPageType()) {
            return new _pages_PostPage__WEBPACK_IMPORTED_MODULE_3__.PostPage(this.pathname)
        }
        if (this.isFeedPage()) {
            return new _pages_FeedPage__WEBPACK_IMPORTED_MODULE_5__.FeedPage(this.pathname)
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
        const contentTypes = ['battle', "question", "post", "idea"]
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
        this.hideAssholePosts()
        // hideVotesRatingsAvatars()
        this.addBlacklistButton()

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

    hideAssholePosts() {
        for (const asshole of _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            for (const assholeHref of document.querySelectorAll(`[href="/user/${asshole}/"]`)) {
                assholeHref
                    .parentElement
                    .parentElement
                    .remove()
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
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Мои мудаки</h2>"
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
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Черный список страниц</h2>"
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.getBlacklistText()
        textArea.addEventListener("input", () => _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.setBlacklistText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    addAssholesList() {
        const profileInfo = document.querySelector('.profile-intro')
        profileInfo.appendChild( this.createAssholesListEdit())
        profileInfo.appendChild( this.createBlacklistEdit())
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
            const selector = `.comment-header-author-name[href="/user/${asshole}/"]`
            const nodesWithAsshole = document.querySelectorAll(selector)
            for (const assholeNode of nodesWithAsshole) {
                assholeNode
                    .parentElement
                    .parentElement
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }
    movePostCommentForm() {
        const postCommentForm = document.querySelector('#post-comments-form')
        const commentsList = document.querySelector('.post-comments-list')
        const postCommentsRules = document.querySelector('.post-comments-rules')
        const parent = commentsList.parentElement
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
            deletedComment.innerHTML = commentText
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
        button.setAttribute("class", "fas fa-cloud-download-alt")
        button.style.cursor = 'pointer';
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
        this.addAssholeButton()
        this.addPrivateCommentWidget()
    }

    addPrivateCommentWidget() {
        const widget = document.createElement("div")
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Приватные комментарии</h2>"
        const textarea = document.createElement("textarea")
        textarea.value = _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.getComment(this.user || "")
        textarea.addEventListener("input", (text) => {
            const comment = text.target.value
            _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.setComment(this.user, comment)
        })
        widget.innerHTML = header
        widget.appendChild(textarea)
        document.querySelector(".profile-statuses").appendChild(widget)
    }

    addAssholeButton() {
        const parser = new DOMParser();
        const assholeBtnStr = `<a class="profile-status clickable"><span class="profile-status-icon">🖕</span> <span class="profile-status-status">Добавить в мои мудаки</span></a>`
        const assholeBtn = parser.parseFromString(assholeBtnStr, 'text/html').querySelector("a");
        assholeBtn.addEventListener("click", () => {
            _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.addAsshole(this.getUser())
        })
        document.querySelector(".profile-statuses").appendChild(assholeBtn)
        if (this.isUserAsshole(this.getUser())) {
            console.log("the user is an asshole!")
        }
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
(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(ASSHOLES_STORAGE_KEY)

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
            return;
        }
        assholes.push(asshole);
        localStorage.setItem(ASSHOLES_STORAGE_KEY, assholes.join(','));
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

;(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(PROTECTED_COMMENTS_STORAGE_KEY, [])

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

        if (!this.getStorage()[pageId]) {
            localStorage[pageId] = JSON.stringify({}, null, 2)
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEVPLG1EQUFtRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDSzs7QUFFL0MsOERBQWtCO0FBQ2xCLHdCQUF3QixxREFBVztBQUNuQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvUGFnZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL0ZlZWRQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL093blVzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvUG9zdFBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvVXNlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1Byb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0VXNlcn0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5pbXBvcnQge1VzZXJQYWdlfSBmcm9tIFwiLi9wYWdlcy9Vc2VyUGFnZVwiO1xuaW1wb3J0IHtPd25Vc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvT3duVXNlclBhZ2VcIjtcbmltcG9ydCB7UG9zdFBhZ2V9IGZyb20gXCIuL3BhZ2VzL1Bvc3RQYWdlXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCIuL3BhZ2VzL1BhZ2VcIjtcbmltcG9ydCB7RmVlZFBhZ2V9IGZyb20gXCIuL3BhZ2VzL0ZlZWRQYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWdlRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhZ2VUeXBlID0gdGhpcy5nZXRQYWdlVHlwZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UGFnZX1cbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyUGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgaWYgKGdldFVzZXIoKSA9PT0gdGhpcy5nZXRXaG9BbUkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3duVXNlclBhZ2UodGhpcy5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1VzZXJDb250ZW50UGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3N0UGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRmVlZFBhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmVlZFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSAnYWxsJyB8fCB0aGlzLnBhdGhuYW1lID09PSAnLydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJDb250ZW50UGFnZVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlcyA9IFsnYmF0dGxlJywgXCJxdWVzdGlvblwiLCBcInBvc3RcIiwgXCJpZGVhXCJdXG4gICAgICAgIHJldHVybiBjb250ZW50VHlwZXMuaW5jbHVkZXModGhpcy5wYWdlVHlwZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJQYWdlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR5cGUgPT09IFwidXNlclwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRQYWdlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aG5hbWVcbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuZmlsdGVyKGEgPT4gYSlbMF1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFdob0FtSSgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1yaWdodD5hLmF2YXRhclwiKVxuICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuZmlsdGVyKGEgPT4gYSlcbiAgICAgICAgICAgIC5wb3AoKVxuICAgIH1cbn0iLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKCkge1xuICAgIGNvbnN0IGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycyA9IFtcbiAgICAgICAgJy51cHZvdGUnLFxuICAgICAgICAnLnVwdm90ZS12b3RlZCcsXG4gICAgICAgICcudXB2b3RlLXR5cGUtaW5saW5lJyxcbiAgICAgICAgJy5jb21tZW50LXJhdGluZycsXG4gICAgICAgICcuZmVlZC1wb3N0LWNvbW1lbnRzLXVucmVhZCdcbiAgICBdXG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycykge1xuICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgYXZhdGFyIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyPmltZ1wiKSkge1xuICAgICAgICBhdmF0YXIuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly9pLnZhczNrLmNsdWIvdi5wbmdcIilcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludEV4dGVuc2lvbkluZm8oKSB7XG4gICAgY29uc29sZS5pbmZvIChcItCS0YHQtdC8INCx0L7Rj9GC0YzRgdGPISDQktCw0YHRgtGA0LjQui3Ri9C60YHRgtGN0L3RiNGL0L0gdjEuMC4wXCIpXG4gICAgY29uc29sZS5sb2coYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8pKG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgIFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8gICBcXFxcICAqIHxcbiAgICAgICAgICBfX19fX19fXyAgICAgLyAgICAvXFxcXF9fL1xuICBfICAgICAgLyAgICAgICAgXFxcXCAgIC8gICAgL1xuIC8gXFxcXCAgICAvICBfX19fICAgIFxcXFxfLyAgICAvXG4vL1xcXFwgXFxcXCAgLyAgLyAgICBcXFxcICAgICAgICAgL1xuViAgXFxcXCBcXFxcLyAgLyAgICAgIFxcXFwgICAgICAgL1xuICAgIFxcXFxfX18vICAgICAgICBcXFxcX19fX18vXG4gICAgYClcbn1cblxuXG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgRmVlZFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQmxhY2tsaXN0ZWRQb3N0cygpXG4gICAgICAgIHRoaXMuaGlkZUFzc2hvbGVQb3N0cygpXG4gICAgICAgIC8vIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKClcbiAgICAgICAgdGhpcy5hZGRCbGFja2xpc3RCdXR0b24oKVxuXG4gICAgfVxuXG4gICAgYWRkQmxhY2tsaXN0QnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmVlZC1wb3N0LWZvb3RlclwiKVxuICAgICAgICBwb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZUlkID0gcG9zdC5xdWVyeVNlbGVjdG9yKFwiYS5mZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgICAgICAgICAuc2xpY2UoMSwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIvXCIpXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwi8J+ZiFwiXG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQodC70YPRiNCw0LnRgtC1LCDQsCDQvdGDINC10LPQviDQvdCw0YXQtdGAIVwiKVxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJmZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEJsYWNrbGlzdFN0b3JhZ2UuYWRkUGFnZShwYWdlSWQpXG4gICAgICAgICAgICAgICAgcG9zdC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcG9zdC5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGlkZUFzc2hvbGVQb3N0cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlIG9mIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGVIcmVmIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtocmVmPVwiL3VzZXIvJHthc3Nob2xlfS9cIl1gKSkge1xuICAgICAgICAgICAgICAgIGFzc2hvbGVIcmVmXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUJsYWNrbGlzdGVkUG9zdHMoKSB7XG4gICAgICAgIGNvbnN0IHJlZnMgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdCgpXG4gICAgICAgIGZvciAoY29uc3QgcmVmIG9mIHJlZnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdG9waWMgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgYVtocmVmKj1cIiR7cmVmfVwiXWApKSB7XG4gICAgICAgICAgICAgICAgdG9waWNcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtCbGFja2xpc3RTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBPd25Vc2VyUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmFkZEFzc2hvbGVzTGlzdCgpXG4gICAgfVxuXG4gICAgY3JlYXRlQXNzaG9sZXNMaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCc0L7QuCDQvNGD0LTQsNC60Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFzc2hvbGVzU3RvcmFnZS5zZXRBc3Nob2xlc1RleHQodGV4dEFyZWEudmFsdWUpKVxuICAgICAgICB3aWRnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBoZWFkZXIpXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0QXJlYSlcbiAgICAgICAgcmV0dXJuIHdpZGdldFxuICAgIH1cblxuICAgIGNyZWF0ZUJsYWNrbGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7Qp9C10YDQvdGL0Lkg0YHQv9C40YHQvtC6INGB0YLRgNCw0L3QuNGGPC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0QXJlYS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3RUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEJsYWNrbGlzdFN0b3JhZ2Uuc2V0QmxhY2tsaXN0VGV4dCh0ZXh0QXJlYS52YWx1ZSkpXG4gICAgICAgIHdpZGdldC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGhlYWRlcilcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRBcmVhKVxuICAgICAgICByZXR1cm4gd2lkZ2V0XG4gICAgfVxuXG4gICAgYWRkQXNzaG9sZXNMaXN0KCkge1xuICAgICAgICBjb25zdCBwcm9maWxlSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlLWludHJvJylcbiAgICAgICAgcHJvZmlsZUluZm8uYXBwZW5kQ2hpbGQoIHRoaXMuY3JlYXRlQXNzaG9sZXNMaXN0RWRpdCgpKVxuICAgICAgICBwcm9maWxlSW5mby5hcHBlbmRDaGlsZCggdGhpcy5jcmVhdGVCbGFja2xpc3RFZGl0KCkpXG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGF0aG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RoaW5nIGlzIGhhcHBlbmVkLCBpdCdzIGFuIHVuc3BlY2lmaWVkIHBhZ2VcIilcbiAgICB9XG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1Byb3RlY3RlZENvbW1lbnRzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3N0UGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICBzdXBlcih1cmwpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUFzc2hvbGVDb21tZW50cygpXG4gICAgICAgIHRoaXMubW92ZVBvc3RDb21tZW50Rm9ybSgpXG4gICAgICAgIHRoaXMuYWRkUHJvdGVjdENvbW1lbnRCdXR0b25zKClcbiAgICAgICAgdGhpcy5hZGRQcm90ZWN0QWxsQ29tbWVudEJ1dHRvbigpXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbW1lbnRzKClcbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZUNvbW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYC5jb21tZW50LWhlYWRlci1hdXRob3ItbmFtZVtocmVmPVwiL3VzZXIvJHthc3Nob2xlfS9cIl1gXG4gICAgICAgICAgICBjb25zdCBub2Rlc1dpdGhBc3Nob2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaG9sZU5vZGUgb2Ygbm9kZXNXaXRoQXNzaG9sZSkge1xuICAgICAgICAgICAgICAgIGFzc2hvbGVOb2RlXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1vdmVQb3N0Q29tbWVudEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IHBvc3RDb21tZW50Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3N0LWNvbW1lbnRzLWZvcm0nKVxuICAgICAgICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1jb21tZW50cy1saXN0JylcbiAgICAgICAgY29uc3QgcG9zdENvbW1lbnRzUnVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1jb21tZW50cy1ydWxlcycpXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGNvbW1lbnRzTGlzdC5wYXJlbnRFbGVtZW50XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocG9zdENvbW1lbnRGb3JtLCBjb21tZW50c0xpc3QpXG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocG9zdENvbW1lbnRzUnVsZXMsIGNvbW1lbnRzTGlzdClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21tZW50VGV4dChjb21tZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbW1lbnRJZH0gLnRleHQtYm9keS10eXBlLWNvbW1lbnRgKS5pbm5lckhUTUxcbiAgICB9XG5cbiAgICAvL3NhdmVzIHRoZSBjb21tZW50IHRvIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICovXG4gICAgcHJvdGVjdENvbW1lbnQoY29tbWVudElkKSB7XG4gICAgICAgIFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5hZGRDb21tZW50KHRoaXMucGF0aG5hbWUsIGNvbW1lbnRJZCwgdGhpcy5nZXRDb21tZW50VGV4dChjb21tZW50SWQpKVxuICAgIH1cblxuICAgIHByb3RlY3RBbGxDb21tZW50cygpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRleHQtYm9keS10eXBlLWNvbW1lbnRcIilcbiAgICAgICAgZm9yIChjb25zdCBjb21tZW50IG9mIGNvbW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3RlY3RDb21tZW50KGNvbW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbW1lbnRzKCkge1xuICAgICAgICBjb25zdCBkZWxldGVkQ29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbW1lbnQtdGV4dC1kZWxldGVkXCIpXG4gICAgICAgIGZvciAoY29uc3QgZGVsZXRlZENvbW1lbnQgb2YgZGVsZXRlZENvbW1lbnRzKSB7XG4gICAgICAgICAgIHRoaXMucmVzdG9yZUNvbW1lbnQoZGVsZXRlZENvbW1lbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZGVsZXRlZENvbW1lbnRcbiAgICAgKi9cbiAgICByZXN0b3JlQ29tbWVudChkZWxldGVkQ29tbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50SWQgPSBkZWxldGVkQ29tbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZFxuICAgICAgICBjb25zdCBjb21tZW50VGV4dCA9IFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50KHRoaXMucGF0aG5hbWUsIGNvbW1lbnRJZClcbiAgICAgICAgaWYgKGNvbW1lbnRUZXh0KSB7XG4gICAgICAgICAgICBkZWxldGVkQ29tbWVudC5pbm5lckhUTUwgPSBjb21tZW50VGV4dFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUHJvdGVjdEFsbENvbW1lbnRCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKClcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwi0JfQsNGJ0LjRgtC40YLRjCDQstGB0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQuCDQvtGCINGD0LTQsNC70LXQvdC40Y9cIilcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm90ZWN0QWxsQ29tbWVudHMoKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1hY3Rpb25zLWxpbmUnKS5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgfVxuXG4gICAgYWRkUHJvdGVjdENvbW1lbnRCdXR0b25zKCkge1xuICAgICAgICBjb25zdCByZXBseUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtaGVhZGVyLWJhZGdlcycpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGx5RWxlbWVudHMpXG4gICAgICAgIGZvciAoY29uc3QgcmVwbHlFbGVtZW50IG9mIHJlcGx5RWxlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKCk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQl9Cw0YnQuNGC0LjRgtGMINC60L7QvNC80LXQvdGCINC+0YIg0YPQtNCw0LvQtdC90LjRj1wiKVxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhYWFcIiwgY29tbWVudElkKVxuICAgICAgICAgICAgICAgIHNlbGYucHJvdGVjdENvbW1lbnQoY29tbWVudElkKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVwbHlFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIilcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmFzIGZhLWNsb3VkLWRvd25sb2FkLWFsdFwiKVxuICAgICAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1ByaXZhdGVDb21tZW50c1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuZ2V0VXNlcigpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZUJ1dHRvbigpXG4gICAgICAgIHRoaXMuYWRkUHJpdmF0ZUNvbW1lbnRXaWRnZXQoKVxuICAgIH1cblxuICAgIGFkZFByaXZhdGVDb21tZW50V2lkZ2V0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0J/RgNC40LLQsNGC0L3Ri9C1INC60L7QvNC80LXQvdGC0LDRgNC40Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50KHRoaXMudXNlciB8fCBcIlwiKVxuICAgICAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSB0ZXh0LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5zZXRDb21tZW50KHRoaXMudXNlciwgY29tbWVudClcbiAgICAgICAgfSlcbiAgICAgICAgd2lkZ2V0LmlubmVySFRNTCA9IGhlYWRlclxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dGFyZWEpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKS5hcHBlbmRDaGlsZCh3aWRnZXQpXG4gICAgfVxuXG4gICAgYWRkQXNzaG9sZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBjb25zdCBhc3Nob2xlQnRuU3RyID0gYDxhIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMgY2xpY2thYmxlXCI+PHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1pY29uXCI+8J+WlTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1zdGF0dXNcIj7QlNC+0LHQsNCy0LjRgtGMINCyINC80L7QuCDQvNGD0LTQsNC60Lg8L3NwYW4+PC9hPmBcbiAgICAgICAgY29uc3QgYXNzaG9sZUJ0biA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoYXNzaG9sZUJ0blN0ciwgJ3RleHQvaHRtbCcpLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xuICAgICAgICBhc3Nob2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Nob2xlc1N0b3JhZ2UuYWRkQXNzaG9sZSh0aGlzLmdldFVzZXIoKSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpLmFwcGVuZENoaWxkKGFzc2hvbGVCdG4pXG4gICAgICAgIGlmICh0aGlzLmlzVXNlckFzc2hvbGUodGhpcy5nZXRVc2VyKCkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB1c2VyIGlzIGFuIGFzc2hvbGUhXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckFzc2hvbGUodXNlcikge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkuaW5jbHVkZXModXNlcilcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHN9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgQVNTSE9MRVNfU1RPUkFHRV9LRVkgPSAnYXNzaG9sZXMnO1xuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKEFTU0hPTEVTX1NUT1JBR0VfS0VZKVxuXG5leHBvcnQgY2xhc3MgQXNzaG9sZXNTdG9yYWdlIHtcblxuICAgIHN0YXRpYyBnZXRBc3Nob2xlc1RleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEFzc2hvbGVzKCkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZXNUZXh0XG4gICAgICovXG4gICAgc3RhdGljIHNldEFzc2hvbGVzVGV4dChhc3Nob2xlc1RleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVksIGFzc2hvbGVzVGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRBc3Nob2xlKGFzc2hvbGUpIHtcbiAgICAgICAgY29uc3QgYXNzaG9sZXMgPSB0aGlzLmdldEFzc2hvbGVzKCk7XG4gICAgICAgIGlmIChhc3Nob2xlcy5pbmNsdWRlcyhhc3Nob2xlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFzc2hvbGVzLnB1c2goYXNzaG9sZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlcy5qb2luKCcsJykpO1xuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBCTEFDS0xJU1RfU1RPUkFHRV9LRVkgPSAnYmxhY2tsaXN0JztcblxuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgW10pXG5cbmV4cG9ydCBjbGFzcyBCbGFja2xpc3RTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEJsYWNrbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRCbGFja2xpc3RUZXh0KHRleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgc3RhdGljIGFkZFBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRCbGFja2xpc3QoKTtcbiAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMocGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2gocGFnZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgbGlzdCk7XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBSSVZBVEVfQ09NTUVOVFNfS0VZID0gJ3ByaXZhdGUtY29tbWVudHMnO1xuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJJVkFURV9DT01NRU5UU19LRVksIHt9KVxuXG5leHBvcnQgY2xhc3MgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50XG4gICAgICovXG4gICAgc3RhdGljIHNldENvbW1lbnQodXNlciwgY29tbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC4uLmNvbW1lbnRzLFxuICAgICAgICAgICAgW3VzZXJdOiBjb21tZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudCh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb21tZW50ID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpXG4gICAgICAgIGlmICghdXNlckNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHRQcml2YXRlQ29tbWVudHNPYmogPSAgdGhpcy5nZXRDb21tZW50cygpXG4gICAgICAgIHJldHVybiB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqW3VzZXJdIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZKSB8fCBcInt9XCIpIHx8IHt9XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSA9IFwicHJvdGVjdGVkQ29tbWVudHNcIlxuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCBbXSlcblxuZXhwb3J0IGNsYXNzIFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZSB7XG4gICAgc3RhdGljIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh7fSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZVN0b3JhZ2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfd3JpdGVTdG9yYWdlKHBhZ2VJZCwgcGFnZVN0b3JhZ2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZU9iaiA9IFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5nZXRTdG9yYWdlKClcbiAgICAgICAgY29uc3QgbmV3U3RvcmFnZU9iaiA9IHtcbiAgICAgICAgICAgIC4uLnN0b3JhZ2VPYmosXG4gICAgICAgICAgICBbcGFnZUlkXTogcGFnZVN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2VPYmosIG51bGwsIDIpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQ29tbWVudChwYWdlSWQsIGNvbW1lbnRJZCwgY29tbWVudFRleHQpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0pIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVtwYWdlSWRdID0gSlNPTi5zdHJpbmdpZnkoe30sIG51bGwsIDIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHBhZ2VTdG9yYWdlW2NvbW1lbnRJZF0gPSBjb21tZW50VGV4dFxuICAgICAgICB0aGlzLl93cml0ZVN0b3JhZ2UocGFnZUlkLCBwYWdlU3RvcmFnZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnQocGFnZUlkLCBjb21tZW50SWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHJldHVybiBwYWdlU3RvcmFnZVtjb21tZW50SWRdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWxsQ29tbWVudHMocGFnZUlkKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSB8fCB7fVxuICAgICAgICByZXR1cm4gcGFnZVN0b3JhZ2VcbiAgICB9XG5cbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKGtleSwgaW5pdFZhbHVlPXt9KSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoaW5pdFZhbHVlKSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQYWdlRmFjdG9yeX0gZnJvbSBcIi4vUGFnZUZhY3RvcnlcIjtcbmltcG9ydCB7cHJpbnRFeHRlbnNpb25JbmZvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxucHJpbnRFeHRlbnNpb25JbmZvKClcbmNvbnN0IHBhZ2VGYWN0b3J5ID0gbmV3IFBhZ2VGYWN0b3J5KGxvY2F0aW9uLnBhdGhuYW1lKVxuY29uc3QgcGFnZSA9IHBhZ2VGYWN0b3J5LmNyZWF0ZSgpXG5wYWdlLm1vZGlmeUNvbnRlbnQoKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==