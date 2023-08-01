class PostDTO {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly updatedAt: Date;
    readonly createdAt: Date;
    readonly authorId: number;

    constructor({ id, title, content, updatedAt, authorId, createdAt }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.authorId = authorId;
    }
}

export default PostDTO;
