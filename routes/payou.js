const express = require('express');
const { body, validationResult, query } = require('express-validator');
const {
  buildInvoicePayload,
  buildRedirectUrl,
  requestPaymentRequisites,
  checkPaymentStatus,
  confirmPayment,
  verifyWebhookPayload,
  logger
} = require('../services/payouService');
const config = require('../config/payou');

const router = express.Router();

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({
    success: false,
    errors: errors.array().map(({ msg, param }) => ({ message: msg, field: param }))
  });
};

router.post(
  '/invoices',
  validate([
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('orderId').optional().isString().trim().isLength({ min: 1, max: 64 }).withMessage('orderId must be a string up to 64 chars'),
    body('userEmail').optional().isEmail().withMessage('userEmail must be a valid email'),
    body('userCode').optional().isString().trim().isLength({ max: 64 }).withMessage('userCode must be up to 64 chars'),
    body('comment').optional().isString().trim().isLength({ max: 255 }).withMessage('comment must be up to 255 chars'),
    body('system').optional().isString().trim().isLength({ max: 64 }).withMessage('system must be up to 64 chars'),
    body('fetchRequisites').optional().isBoolean().withMessage('fetchRequisites must be boolean')
  ]),
  async (req, res) => {
    try {
      const {
        amount,
        orderId,
        userEmail,
        userCode,
        comment,
        system,
        fetchRequisites = true
      } = req.body;

      const resolvedOrderId = orderId || `iban_${Date.now()}`;

      const payload = buildInvoicePayload({
        amount,
        orderId: resolvedOrderId,
        comment,
        userCode,
        userEmail,
        system
      });

      const redirectUrl = buildRedirectUrl(payload);

      const response = {
        success: true,
        invoice: {
          orderId: resolvedOrderId,
          amount: payload.summ,
          system: payload.sistems,
          redirectUrl,
          payload
        },
        requisites: null
      };

      if (fetchRequisites) {
        try {
          const requisites = await requestPaymentRequisites(payload);
          response.requisites = requisites;
        } catch (error) {
          logger.error('Failed to fetch Payou requisites', error.message);
          response.requisites = {
            status: 'error',
            message: error.message,
            fallback: config.iban ? { iban: config.iban } : null
          };
        }
      } else if (config.iban) {
        response.requisites = { iban: config.iban };
      }

      res.json(response);
    } catch (error) {
      logger.error('Invoice creation failed', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }
);

router.get(
  '/status/:orderId',
  validate([
    query('searchBy')
      .optional()
      .isIn(['internal', 'external'])
      .withMessage('searchBy must be internal or external')
  ]),
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { searchBy = 'internal' } = req.query;

      const status = await checkPaymentStatus({ orderId, searchBy });

      res.json({
        success: true,
        orderId,
        searchBy,
        status
      });
    } catch (error) {
      logger.error('Status check failed', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Status request failed'
      });
    }
  }
);

router.post(
  '/confirm',
  validate([
    body('orderId').isNumeric().withMessage('orderId must be numeric'),
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be greater than 0'),
    body('system').optional().isString().trim().isLength({ max: 64 }).withMessage('system must be up to 64 chars'),
    body('action').optional().isIn(['paid', 'cancelled']).withMessage('action must be paid or cancelled')
  ]),
  async (req, res) => {
    try {
      const { orderId, amount, system, action } = req.body;
      const payload = await confirmPayment({ orderId, amount, system, action });

      res.json({
        success: true,
        orderId,
        result: payload
      });
    } catch (error) {
      logger.error('Confirm request failed', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Confirm request failed'
      });
    }
  }
);

router.post('/webhook', async (req, res) => {
  try {
    const verification = verifyWebhookPayload(req.body);
    if (!verification.isValid) {
      logger.warn('Invalid webhook signature', {
        expected: verification.expectedSign,
        received: verification.receivedSign,
        orderId: req.body.MERCHANT_ORDER_ID
      });
      return res.status(400).send(`${req.body.MERCHANT_ORDER_ID || 'UNKNOWN'}|error`);
    }

    if (req.body.status !== 'success') {
      logger.warn('Webhook received non-success status', {
        orderId: req.body.MERCHANT_ORDER_ID,
        status: req.body.status
      });
      return res.status(202).send(`${req.body.MERCHANT_ORDER_ID}|accepted`);
    }

    logger.info('Payment success webhook', {
      orderId: req.body.MERCHANT_ORDER_ID,
      amount: req.body.AMOUNT,
      intId: req.body.intid
    });

    // TODO: Update order status in database here

    res.send(`${req.body.MERCHANT_ORDER_ID}|success`);
  } catch (error) {
    logger.error('Webhook processing failed', error);
    res.status(500).send('error');
  }
});

module.exports = router;


