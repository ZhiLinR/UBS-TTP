//retrieve environment variables
require('dotenv').config({ path: ['.env.local', '.env'] });

module.exports = {
    FORUM_COLLECTION: process.env.FORUM_COLLECTION,
    FORUM_COMMENTS_COLLECTION: process.env.FORUM_COMMENTS_COLLECTION,
}