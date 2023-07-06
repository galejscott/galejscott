import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Post View");
    }

    async getHtml() {
        console.log(this.params.id);
        return `
            <h1>Post View</h1>
            <p>
                Your are now viewing post #${this.postId}.
            </p>
        `;
    }
}