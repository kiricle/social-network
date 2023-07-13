import prisma from '@/utils/db.server';

type User = {
    firstName: string;
    lastName: string;
    password: string;
    role: 'ADMIN' | 'USER';
    email: string;
};

type Post = {
    title: string;
    content: string;
    authorId: number;
};

type Like = {
    userId: number;
    postId: number;
};

function getUsers(): User[] {
    return [
        {
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            role: 'ADMIN',
            email: 'someEmail@gmail.com',
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            password: 'password',
            role: 'USER',
            email: 'someEmail123@gmail.com',
        },
    ];
}

function getPosts(): Post[] {
    return [
        {
            title: 'My first post',
            content: 'This is my first post',
            authorId: 1,
        },
        {
            title: 'My second post',
            content: 'This is my second post',
            authorId: 1,
        },
        {
            title: 'My first post',
            content: 'This is my first post',
            authorId: 2,
        },
    ];
}

async function seed() {
    await Promise.all(
        getUsers().map(async (user) => {
            return await prisma.user.create({
                data: user,
            });
        })
    );

    const user = await prisma.user.findFirst({
        where: {
            email: 'someEmail@gmail.com',
        },
    });

    await Promise.all(
        getPosts().map(async (post) => {
            return await prisma.post.create({
                data: post,
            });
        })
    );
}

seed()  
