import type { Response } from 'express';
/**
 * Generates an invoice PDF and pipes it to an Express response.
 * @param {Object} order - The dynamic order object containing user and item details.
 * @param {Object} res - The Express response object.
 */
export declare const createInvoice: (order: any, res: Response) => void;
//# sourceMappingURL=pdf.service.d.ts.map