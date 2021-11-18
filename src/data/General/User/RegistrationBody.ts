/**
 * Body used diuring user registration.
 */
export interface RegistrationBody {
    /** Username of the user, used for log in. */
    username: string;

    /** Password, used durng log in. */
    password: string;

    /** 
     * Mathing password, used to check if both password are the same.
     * Checked one time in frontend, and again in backend.
     */
    matchingPassword: string;

    /** Email of the user. */
    email: string;
}