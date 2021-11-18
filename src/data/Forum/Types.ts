/** What statutes can the thread have. */
export const ThreadStatusArray = ["Open", "Closed"]
/** Type of thread status. Created from {@link ThreadStatusArray} values. */
export type ThreadStatus = typeof ThreadStatusArray[number]

/** How important can a Tag be. */
export const TagImportanceArray = ["Low", "Medium", "High", "Admin"]
/** Type of tag importance. Created from {@link TagImportance} values. */
export type TagImportance = typeof TagImportanceArray[number]