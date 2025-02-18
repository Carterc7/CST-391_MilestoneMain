import {Request, RequestHandler, Response} from 'express';
import {Record} from './records.model';
import * as RecordDao from './records.dao';
import { OkPacket } from 'mysql';

export const readRecords: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Always fetch all records
        const records = await RecordDao.readRecords();

        res.status(200).json(records); // Return the records in JSON format
    } catch (error) {
        console.error('[Records.controller][readRecords][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching records',
        });
    }
};


export const createRecord: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Assuming req.body contains the updated Record model
        const recordData: Record = req.body;

        // Create a record in the database
        const okPacket: OkPacket = await RecordDao.createRecord(recordData);

        // Log the request body and the created record's OkPacket
        console.log('Request body: ', req.body);
        console.log('Record created: ', okPacket);

        // Send response back with the created record details
        res.status(200).json({
            message: 'Record created successfully',
            recordId: okPacket.insertId,
            recordData: recordData,
        });
    } catch (error) {
        console.error('[Records.controller][createRecord][Error]', error);
        res.status(500).json({
            message: 'There was an error while creating the record',
        });
    }
};

export const updateRecord: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Assuming req.body contains the updated Record model
        const recordData = req.body; // Matching the Record model
        console.log('Request body: ', req.body);

        // Update the record in the database
        const okPacket: OkPacket = await RecordDao.updateRecord(recordData);

        // Log the updated record's OkPacket
        console.log('Record updated: ', okPacket);

        // Send response back with the updated record details
        res.status(200).json({
            message: 'Record updated successfully',
            updatedRecord: okPacket,
        });
    } catch (error) {
        console.error('[Records.controller][updateRecord][Error]', error);
        res.status(500).json({
            message: 'There was an error while updating the record',
        });
    }
};


export const deleteRecord: RequestHandler = async (req: Request, res: Response) => {
    try {
        const recordId = parseInt(req.params.recordId as string);
        console.log('Record ID:', recordId);

        if (!Number.isNaN(recordId)) {
            const response = await RecordDao.deleteRecord(recordId);
            res.status(200).json({
                message: 'Record deleted successfully',
                response: response,
            });
        } else {
            throw new Error('Integer expected for recordId');
        }
    } catch (error) {
        console.error('[Records.controller][deleteRecord][Error]', error);
        res.status(500).json({
            message: 'There was an error while deleting the record',
        });
    }
};




