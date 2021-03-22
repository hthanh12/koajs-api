const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const response = require("../utils/response");
const { error } = require("../utils/response");
const moment = require('moment')
import handlebars from 'handlebars'
import fs from 'fs'
import pdf from 'html-pdf'
import path from 'path'
import _ from 'lodash'

exports.create = async (ctx) => {
  try {
    let data = dataSample
    let font_bold_path = (path.join('file://', __dirname)).replace('controllers', 'templates/Arialbd.ttf')
    let font_itatlic_path = (path.join('file://', __dirname)).replace('controllers', 'templates/Arialita.ttf')
    let font_path = (path.join('file://', __dirname)).replace('controllers', 'templates/Arial.ttf')
    
    data.font_path = font_path
    data.font_bold_path = font_bold_path
    data.font_itatlic_path = font_itatlic_path
    let cv = await genPDF(dataSample)
    ctx.response.attachment(`Candidate-${_.startCase(dataSample)}-${moment().format('DDMMYY_HHmmss')}.pdf`)
    ctx.response.type = 'application/pdf'
    ctx.body = cv
  } catch (error) {
    return response.error(ctx, { error })
  }
};

async function genPDF(data) {
  let config = {
      "format": "A4",
      "footer": {
          "height": "20mm",
          "contents": {
              default: '<p style="text-align:end;font-size:x-small">{{page}}/{{pages}}</p>',
          }
      },
      "header": {
          "height": "10mm",
      },
      "border": {
          right: "0.5cm",
          left: "0.5cm",
          bottom: "1cm"
      }
  }
  let templateHtml = fs.readFileSync(__dirname.replace('controllers', 'templates/sample_html.html'), 'utf8')
  let template = handlebars.compile(templateHtml)
  let html = template(data)
  console.log(html)
  return new Promise((resolve, reject) => {
      pdf.create(html, config).toBuffer(function (err, buffer) {
          if (err) reject(err)
          else
              resolve(buffer)
      })
  })
}

let dataSample = {
  name : "thanh"
}