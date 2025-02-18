import { OkPacket } from "mysql";
import {execute} from '../services/mysql.connector'
import {Record} from './records.model';
import {recordQueries} from './records.queries';

export const readRecords = async () => {
    return execute<Record[]>(recordQueries.readRecords, []);
};

export const createRecord = async (record: Record) => {
    return execute<OkPacket>(recordQueries.createRecord,
        [record.recordTitle, record.artist, record.description, record.videoUrl, record.imageUrl, record.favorite]);
};

export const updateRecord = async (record: Record) => {
    return execute<OkPacket>(recordQueries.updateRecord,
        [record.recordTitle, record.artist, record.description, record.videoUrl, record.imageUrl, record.favorite, record.recordId]);
};

export const deleteRecord = async (recordId: number) => {
    return execute<OkPacket>(recordQueries.deleteRecord, [recordId]);
};



