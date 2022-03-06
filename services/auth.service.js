const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret);
    console.log({ user, token });
    return { user, token };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.gmailEmail,
        pass: config.gmailPass,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: config.gmailEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Este es un nuevo correo', // Subject line
      text: 'Holita', // plain text body
      html: '<b>Holita 🔥</b>', // html body
    });

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
