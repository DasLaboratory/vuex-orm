export default class Uid {
    /**
     * Count to create a unique id.
     */
    private static count;
    /**
     * Prefix string to be used for the id.
     */
    private static prefix;
    /**
     * Generate an UUID.
     */
    static make(): string;
    /**
     * Reset the count to 0.
     */
    static reset(): void;
}
