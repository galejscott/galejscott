import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Welcome back, Scott</h1>
            <p>
                Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
            </p>
            <p>
                <a href="/posts/2" data-link>View recent posts</a>.
            </p>
        `;
    }
}