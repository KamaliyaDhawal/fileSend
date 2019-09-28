const nodemailer = require('nodemailer');
const path = require('path');

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		// user: 'Apply@libertiescollege.ie',
		// pass: 'thiya9fo'
		user: 'devapptestdev@gmail.com',
		pass: 'Anil_217'
	},
	tls: {
		rejectUnauthorized: false
	}
});

const sendMail = (name, res) => {
	try {
		let attachments = [{ filename: name, path: path.join(process.cwd(), 'uploads', name)}];
		let mailOption = {
		    from: 'noreplay@test.com',
		    to : 'dhaval5522@gmail.com',
		    subject : 'test',
		    text : 'Please Find attach file('+name+') for latest file.',
		    attachments
		};

		transport.sendMail(mailOption, function(err, info) {
			if(err) {
				console.log('Error While Sending Database Backup Mail: ', err);
				res.status(403).send('Error While Sending Database Backup Mail');
			}
			if(info) {
				console.log('file '+name+' send succesfully at ', new Date());
				res.send('Thank you!');
			}
		});
	}catch(e) {
		console.log('Error while sending mail');
	}
}

module.exports = sendMail;