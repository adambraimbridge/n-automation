const REGRESSION_TRANSPORT = process.env.REGRESSION_TRANSPORT;
const RECIPIENTS = process.env.REGRESSION_RECIPIENTS;

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(REGRESSION_TRANSPORT);
const logger = require('@financial-times/n-logger').default.logger;

module.exports = function sendEmails (err, output) {

	const options = {
		from: '"Signup Regression" <no-reply@ft.com>',
		to: RECIPIENTS,
		subject: `❗Regression tests failed ${new Date()}`,
		text: output.replace('[0;37m ','').replace('[41m ', '').replace('[42m ', '').replace('[44m ', '').replace('[45m ', '')
	};

	transporter.sendMail(options, function (emailError, data) {
		if (emailError) {
			return logger.info('Error sending emails', emailError);
		}
		logger.info('Regression test notification sent to: ', data);
	});
};