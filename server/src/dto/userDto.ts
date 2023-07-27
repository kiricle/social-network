class UserDTO {
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: 'ADMIN' | 'USER';
    readonly createdAt: Date;

    constructor({ id, email, firstName, lastName, role, createdAt }) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
        this.role = role;
    }
}

export default UserDTO;
