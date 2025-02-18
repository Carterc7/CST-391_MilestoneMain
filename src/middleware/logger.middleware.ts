import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const getProcessingTimeInMS = (time: [number, number]): string => {
  return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
};

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // generate unique id
  const id = uuidv4();

  // get timestamp
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    "-",
    now.getMonth() + 1,
    "-",
    now.getDate(),
    " ",
    now.getHours(),
    ":",
    now.getMinutes(),
    ":",
    now.getSeconds(),
  ].join("");

  // get api endpoint
  const { method, url } = req;

  // log start of execution process
  const start = process.hrtime();
  const startText = `START:${getProcessingTimeInMS(start)}`;
  const idText = `[${id}]`;
  const timeStampText = `[${timestamp}]`;

  // now that we have all components we want to log, show the entry
  console.log(`${idText}${timeStampText} ${method}:${url} ${startText}`);

  // trigger method once response is sent to client
  res.once("finish", () => {
    // log end of execution process
    const end = process.hrtime(start);
    const endText = `END:${getProcessingTimeInMS(end)}`;
    console.log(
      `${idText}${timeStampText} ${method}:${url} ${res.statusCode} ${endText}`
    );
  });

  // execute next middleware/event-handler
  next();
}
