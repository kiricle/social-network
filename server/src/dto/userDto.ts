class UserDTO {
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: 'ADMIN' | 'USER';

    constructor({ id, email, firstName, lastName, role }) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}

export default UserDTO;
