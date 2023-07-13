class UserDto {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly role: 'ADMIN' | 'USER',
    ) {}
}

export default UserDto;