import {getUser} from "./functions";
import {UserPage} from "./pages/UserPage";
import {OwnUserPage} from "./pages/OwnUserPage";
import {PostPage} from "./pages/PostPage";
import {Page} from "./pages/Page";
import {FeedPage} from "./pages/FeedPage";

export class PageFactory {
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
            if (getUser() === this.getWhoAmI()) {
                return new OwnUserPage(this.pathname);
            }

            return new UserPage(this.pathname);
        }

        if (this.isUserContentPageType()) {
            return new PostPage(this.pathname);
        }

        if (this.isFeedPage()) {
            return new FeedPage(this.pathname);
        }

        return new Page(this.pathname)
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
