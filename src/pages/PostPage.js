import {Page} from "./Page";
import {AssholesStorage} from "../storage/AssholesStorage";
import {ProtectedCommentsStorage} from "../storage/ProtectedCommentsStorage";

export class PostPage extends Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
        this.movePostCommentForm()
        this.addProtectCommentButtons()
        this.restoreComments()
    }

    hideAssholeComments() {
        for (const asshole of AssholesStorage.getAssholes()) {
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
        ProtectedCommentsStorage.addComment(this.pathname, commentId, this.getCommentText(commentId))
    }

    protectAllComments() {
        const comments = document.querySelectorAll('.comment')
        for (const comment of comments) {
            this.protectComment(comment.id)
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
        const commentText = ProtectedCommentsStorage.getComment(this.pathname, commentId)
        if (commentText) {
            deletedComment.innerHTML = commentText
        }
    }

    addProtectCommentButtons() {
        const replyElements = document.querySelectorAll('.comment-header-badges')
        console.log(replyElements)
        for (const replyElement of replyElements) {
            const button = this.createButton();
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
        const button = document.createElement("a")
        button.setAttribute("class", "protect-comment-button")
        button.setAttribute("title", "Сохранить коммент")
        button.style.cursor = 'pointer';
        button.innerText = "📥"
        return button;
    }

}
