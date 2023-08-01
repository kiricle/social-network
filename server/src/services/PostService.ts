import PostDTO from '@/dto/PostDTO';
import prisma from '@/utils/db.server';

class PostService {
    async createPost({ title, content, authorId }: PostDTO) {
        const post = await prisma.post.create({
            data: {
                content: content,
                title: title,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            },
        });

        return post;
    }
}

export const postService = new PostService();
