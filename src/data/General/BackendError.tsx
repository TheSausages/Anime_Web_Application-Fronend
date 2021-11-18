/**
 * Error retuned from making backend request. 
 * Message is retrieved from the response, status is added from the message itself.
 */
export interface BackendError {
    /** The status from the request. */
    status: number;

    /** Error message recieved from backend. */
    message: string;
}