import {createStorageIfNotExists} from "./Storage";

const ASSHOLES_STORAGE_KEY = 'assholes';
createStorageIfNotExists(ASSHOLES_STORAGE_KEY, [])

export class AssholesStorage {

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
