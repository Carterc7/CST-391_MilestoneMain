import { Router } from 'express';
import * as RecordsController from './records.controller';

const router = Router();

// Route for fetching records (GET)
router.route('/records').get(RecordsController.readRecords);

// Route for creating a record (POST)
router.route('/records').post(RecordsController.createRecord);

// Route for updating a record (PUT)
router.route('/records').put(RecordsController.updateRecord);

// Route for deleting a record (DELETE)
router.route('/records/:recordId').delete(RecordsController.deleteRecord);

export default router;
