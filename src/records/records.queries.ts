export const recordQueries = {
    readRecords: `
    SELECT recordId as recordId, recordTitle AS recordTitle, artist AS artist, description AS description, videoUrl AS videoUrl, imageUrl AS imageUrl, favorite AS favorite FROM \`CST-391_Milestone\`.records`,
    createRecord: `
    INSERT INTO RECORDS(recordTitle, artist, description, videoUrl, imageUrl, favorite) VALUES (?, ?, ?, ?, ?, ?)`,
    updateRecord: `
    UPDATE \`CST-391_Milestone\`.records SET recordTitle = ?, artist = ?, description = ?, videoUrl = ?, imageUrl = ?, favorite = ? WHERE recordId = ?`,
    deleteRecord: `
    DELETE FROM \`CST-391_Milestone\`.records WHERE recordId = ?`,
}