/*
Uso de reutas dinamicas -----> https://github.com/leifermendez/node-seed-api/blob/main/app/routes/index.js
*/
const epxress = require('express')
const router = epxress.Router()
const fs = require('fs')
const { winstonRouter } = require("../winston/winstonLoger")
const winston = require('../winston')

const pathRouter = `${__dirname}`

const removeExtension = (fileName) => {
	return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
	const fileSinExtension = removeExtension(file)
	const skipIndex = ['index'].includes(fileSinExtension)
	if (!skipIndex) {
		router.use(`/${fileSinExtension}`, require(`./${fileSinExtension}`))

	}
})

router.use((error, req, res, next) => {
	winston.error(error.message)
	res.status(500).send(error.message);
});

router.get('*', winstonRouter)

module.exports = router